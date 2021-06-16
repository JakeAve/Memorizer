import { Grid, Typography, Card, Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import WordSlider from "../Slider/Slider";
import WordContent from "../WordContent/WordContent";
import MemorizedButton from "../MemorizedButton";

const Memorizer = (props) => {
  const { script = {} } = props;
  const [words, setWords] = useState(100);
  const [isMemorized, setIsMemorized] = useState(false);

  useEffect(() => {
    setWords(100);
  }, [props.script?.content]);

  useEffect(() => {
    if (props.script?.memorized) setIsMemorized(props.script.memorized);
  }, [props.script?.memorized]);

  const toggleMemorized = () => {};

  const { content = "😬", lastPracticed = new Date() } = script;

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
        <Grid item xs={12} container justify="center">
          <Button variant="contained" color="primary">
            Practice Today
          </Button>
        </Grid>
        <Grid item xs={12} container justify="flex-end">
          <Box mt={5} mx={2}>
            <Button variant="contained" color="default">
              Edit
            </Button>
          </Box>
          <Box mt={5} mx={2}>
            <Button variant="contained" color="secondary">
              Delete
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Memorizer;
