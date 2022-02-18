import { Grid, Typography, Card, Box, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import WordSlider from '../Slider/Slider';
import WordContent from '../WordContent/WordContent';
import MemorizedButton from '../MemorizedButton';
import performScriptAction, {
  scriptActions,
} from '../../actions/performScriptAction';
import { useUser } from '../../contexts/user';
import { useAlert } from '../../contexts/alerts';
import deleteScript from '../../actions/deleteScript';
import { useHistory } from 'react-router';

const Memorizer = (props) => {
  const { script = {}, fetchScripts } = props;
  const {
    memorized = true,
    content = 'No script selected 😬',
    lastPracticed = new Date(),
    _id = '',
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
    const rd = new Intl.RelativeTimeFormat('en', {
      style: 'long',
      numeric: 'auto',
    });
    const days = (new Date(lastPracticed) - Date.now()) / (1000 * 3600 * 24);
    const daysAgo = rd.format(Math.round(days), 'days');
    return daysAgo;
  };

  const alert = useAlert();
  const history = useHistory();

  const deleteCurrentScript = async () => {
    const { success } = await deleteScript(_id, accessToken);
    if (success) {
      alert('success', 'The script was deleted successfully', 3000);
      history.push('/');
    } else alert('error', 'An unexpected error occured.');
  };

  if (!_id)
    return (
      <Box mt={7} m={5}>
        <Typography variant="h5" align="center">
          No script selected
        </Typography>
      </Box>
    );

  return (
    <Box mt={3} m={5}>
      <Grid container spacing={3}>
        <Grid item xs={12} container justifyContent="center">
          <Card variant="outlined">
            <Box p={5}>
              <WordContent content={content} words={words} />
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <WordSlider words={words} setWords={setWords} />
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <MemorizedButton checked={isMemorized} onChange={toggleMemorized} />
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Typography variant="caption">Practiced {relativeDate()}</Typography>
        </Grid>
        <Grid item xs={12} container justifyContent="center">
          <Button variant="contained" color="primary" onClick={practiceScript}>
            Practice Today
          </Button>
        </Grid>
        <Grid item xs={12} container justifyContent="flex-end">
          <Box mt={5} mx={2}>
            <Button variant="contained" color="default">
              Edit
            </Button>
          </Box>
          <Box mt={5} mx={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={deleteCurrentScript}
            >
              Delete
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Memorizer;
