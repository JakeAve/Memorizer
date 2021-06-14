import React from "react";
import List from "@material-ui/core/List";
import "./ScriptsList.css";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { Link } from "react-router-dom";

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

const ScriptsList = (props) => {
  const { scripts, selected } = props;

  const scriptsList = scripts.map((script) => {
    const { _id } = script;
    return <ListItemLink key={_id} {...{ ...script, selected }} />;
  });

  return <List className="scripts-list">{scriptsList}</List>;
};

export default ScriptsList;
