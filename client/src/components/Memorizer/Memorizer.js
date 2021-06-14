import { Grid, Typography, Card, Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import WordSlider from "../Slider/Slider";
import WordContent from "../WordContent/WordContent";
import MemorizedButton from "../MemorizedButton";

const Memorizer = (props) => {
  const [words, setWords] = useState(100);
  const [isMemorized, setIsMemorized] = useState(false);

  useEffect(() => {
    setWords(100);
  }, [props.script?.content]);

  useEffect(() => {
    if (props.script?.memorized) setIsMemorized(props.script.memorized);
  }, [props.script?.memorized]);

  if (!props.script) return <Typography>Nothing to memorize here</Typography>;

  const toggleMemorized = () => {};

  const { content = "Nothing Added", lastPracticed } = props.script;

  return (
    <Box mt={3} m={5}>
      <Grid container spacing={3}>
        <Grid item xs={12} container justify="center">
          <Card variant="outlined">
            <Box p={5}>
              <WordContent content={content} words={words} />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} container justify="center">
          <WordSlider words={words} setWords={setWords} />
        </Grid>
        <Grid item xs={12} container justify="center">
          <MemorizedButton checked={isMemorized} onChange={toggleMemorized} />
        </Grid>
        <Grid item xs={12} container justify="center">
          <Typography variant="caption">
            Last practiced:{" "}
            {lastPracticed ? new Date(lastPracticed).toDateString() : "Never"}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Memorizer;
