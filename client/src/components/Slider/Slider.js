import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

function valuetext(value) {
  return `${value}%`;
}

export default function WordSlider(props) {
  const { words, setWords } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom align="center">
        Percentage
      </Typography>
      <Slider
        defaultValue={100}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={10}
        value={words}
        onChange={(e, val) => setWords(val)}
        marks
        min={0}
        max={100}
      />
    </div>
  );
}
