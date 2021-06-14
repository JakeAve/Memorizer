import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import WordSlider from "../Slider/Slider";
import WordContent from "../WordContent/WordContent";

const Memorizer = (props) => {
  const [words, setWords] = useState(100);

  useEffect(() => {
    setWords(100);
  }, [props.script?.content]);

  if (!props.script) return <Typography>Nothing to memorize here</Typography>;

  const {
    _id,
    content = "Nothing Added",
    memorized,
    lastPracticed,
  } = props.script;
  return (
    <Grid>
      <Grid item>
        <WordContent content={content} words={words} />
      </Grid>
      <Grid item>
        <WordSlider words={words} setWords={setWords} />
      </Grid>
    </Grid>
  );
};

export default Memorizer;
