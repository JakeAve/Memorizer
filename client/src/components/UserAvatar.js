import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Avatar from '@material-ui/core/Avatar';
import { useUser } from '../contexts/user';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

export default function LetterAvatars() {
  const classes = useStyles();

  const { user } = useUser();

  return (
    <div className={classes.root}>
      <Avatar className={classes.orange}>
        {user ? user.firstName.charAt(0) : ''}
      </Avatar>
    </div>
  );
}
