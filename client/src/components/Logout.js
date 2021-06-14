import { IconButton } from "@material-ui/core";
import React from "react";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import logoutUser from "../actions/logoutUser";
import { useUser } from "../contexts/user";

const Logout = () => {
  const { setUser } = useUser();
  const onClick = async () => {
    await logoutUser();
    setUser(null);
  };

  return (
    <IconButton
      edge="end"
      onClick={onClick}
      color="inherit"
      aria-label="logout"
    >
      <ExitToAppIcon />
    </IconButton>
  );
};

export default Logout;
