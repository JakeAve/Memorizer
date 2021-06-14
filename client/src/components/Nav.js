import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Logout from "./Logout";
import UserAvatar from "./UserAvatar";
import AddNew from "./AddNew";
import { useUser } from "../contexts/user";
import { Link as DomLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
  },
}));

export default function Nav() {
  const classes = useStyles();
  const { user } = useUser();
  const Icons = () => (
    <>
      <AddNew /> <UserAvatar /> <Logout />
    </>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <DomLink to="/" className={classes.link}>
              Memorizer
            </DomLink>
          </Typography>
          {user ? <Icons /> : ""}
        </Toolbar>
      </AppBar>
    </div>
  );
}
