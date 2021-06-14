import { IconButton } from "@material-ui/core";
import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useUser } from "../contexts/user";

const Logout = () => {
  const { logout } = useUser();

  return (
    <IconButton edge="end" onClick={logout} color="inherit" aria-label="logout">
      <ExitToAppIcon />
    </IconButton>
  );
};

export default Logout;
