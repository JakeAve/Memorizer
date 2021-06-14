import "./WordContent.css";
import React, { useMemo } from "react";
import { Typography } from "@material-ui/core";

const WordContent = (props) => {
  const { content, words: wordPercentage } = props;

  const wordContent = useMemo(() => {
    const words = content.split(" ").map((value) => ({ value, hidden: false }));

    const numberOfWordsToHide =
      words.length - Math.round(words.length * wordPercentage * 0.01);

    let hiddenWords = 0;
    while (hiddenWords < numberOfWordsToHide) {
      const randIndex = Math.floor(Math.random() * words.length);
      words[randIndex] = { ...words[randIndex], hidden: true };
      hiddenWords = words.filter(({ hidden }) => Boolean(hidden)).length;
    }

    const result = words.map(({ value, hidden }, index) => (
      <span key={index} className={hidden ? "hidden" : ""}>
        {value}&nbsp;
      </span>
    ));

    return result;
  }, [wordPercentage, content]);

  return <Typography>{wordContent}</Typography>;
};

export default WordContent;
