import "./WordContent.css";
import React, { useMemo } from "react";
import { Typography } from "@material-ui/core";

const show = (e) => {
  e.target.classList.toggle("hidden");
};

const WordContent = (props) => {
  const { content, words: wordPercentage } = props;

  const wordContent = useMemo(() => {
    const words = content
      .split(/\s+|\r+|\n+/)
      .map((value) => ({ value, hidden: false }));

    const numberOfWordsToHide =
      words.length - Math.round(words.length * wordPercentage * 0.01);

    let hiddenWords = 0;
    while (hiddenWords < numberOfWordsToHide) {
      const randIndex = Math.floor(Math.random() * words.length);
      words[randIndex] = { ...words[randIndex], hidden: true };
      hiddenWords = words.filter(({ hidden }) => Boolean(hidden)).length;
    }

    const result = words.map(({ value, hidden }, index) => (
      <React.Fragment key={index}>
        <span onClick={show} className={hidden ? "hidden" : ""}>
          {value}
        </span>
        &nbsp;
      </React.Fragment>
    ));

    return result;
  }, [wordPercentage, content]);

  return <Typography className="word-content">{wordContent}</Typography>;
};

export default WordContent;
