import { Grid, Typography, Card, Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import WordSlider from "../Slider/Slider";
import WordContent from "../WordContent/WordContent";
import MemorizedButton from "../MemorizedButton";
import performScriptAction, {
  scriptActions,
} from "../../actions/performScriptAction";
import { useUser } from "../../contexts/user";

const Memorizer = (props) => {
  const { script = {}, fetchScripts } = props;
  const {
    memorized = true,
    content = "😬",
    lastPracticed = new Date(),
    _id = "",
  } = script;
  const [words, setWords] = useState(100);
  const [isMemorized, setIsMemorized] = useState(memorized);
  const { accessToken } = useUser();

  useEffect(() => {
    setWords(100);
  }, [props.script?.content]);

  useEffect(() => {
    setIsMemorized(memorized);
    // eslint-disable-next-line
  }, [_id]);

  const toggleMemorized = async () => {
    if (!isMemorized) {
      setIsMemorized(true);
      await performScriptAction(accessToken, scriptActions.memorize, _id);
    }
    if (isMemorized) {
      setIsMemorized(false);
      await performScriptAction(accessToken, scriptActions.forget, _id);
    }
    fetchScripts();
  };

  const practiceScript = async () => {
    await performScriptAction(accessToken, scriptActions.practice, _id);
    fetchScripts();
  };

  const relativeDate = () => {
    const rd = new Intl.RelativeTimeFormat("en", {
      style: "long",
      numeric: "auto",
    });
    const days = (new Date(lastPracticed) - Date.now()) / (1000 * 3600 * 24);
    const daysAgo = rd.format(Math.round(days), "days");
    return daysAgo;
  };

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
          <Typography variant="caption">Practiced {relativeDate()}</Typography>
        </Grid>
        <Grid item xs={12} container justify="center">
          <Button variant="contained" color="primary" onClick={practiceScript}>
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
