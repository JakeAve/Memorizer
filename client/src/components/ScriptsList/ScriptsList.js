import React from 'react';
import List from '@material-ui/core/List';
import './ScriptsList.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';

const ListItemLink = (props) => {
  const { _id, content, memorized, lastPracticed, selected } = props;
  <ListItemText primary="Spam" />;
  return (
    <ListItem
      button
      component={Link}
      to={`/item/${_id}`}
      selected={_id === selected}
    >
      <ListItemIcon>
        {memorized ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
      </ListItemIcon>
      <ListItemText
        primary={content.slice(0, 50)}
        secondary={new Date(lastPracticed).toDateString()}
      />
    </ListItem>
  );
};

const NewContent = (props) => {
  const { newContent } = props;
  return (
    <ListItem button selected>
      <ListItemIcon>
        <CheckBoxOutlineBlankIcon />
      </ListItemIcon>
      <ListItemText
        primary={newContent.slice(0, 50)}
        secondary={new Date().toDateString()}
      />
    </ListItem>
  );
};

const ScriptsList = (props) => {
  const { scripts, selected, newContent } = props;

  const scriptsList = scripts.map((script) => {
    const { _id } = script;
    const _selected = newContent ? null : selected;
    return <ListItemLink key={_id} {...{ ...script, selected: _selected }} />;
  });

  return (
    <Box borderRight={1} borderColor="grey.500">
      <List className="scripts-list">
        {newContent ? <NewContent newContent={newContent} /> : ''}
        {scriptsList.length ? (
          scriptsList
        ) : (
          <ListItem>
            <ListItemText primary="No scripts added" />
          </ListItem>
        )}
      </List>
    </Box>
  );
};

export default ScriptsList;
