import "./Home.css";
import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ScriptsList from "../../components/ScriptsList/ScriptsList";
import { useUser } from "../../contexts/user";
import Memorizer from "../../components/Memorizer/Memorizer";
import getScripts from "../../actions/getScripts";

const Home = (props) => {
  const { user, accessToken } = useUser();
  const scriptId = props.match.params.scriptId;
  const [scripts, setScripts] = useState([]);

  useEffect(() => {
    getScripts(accessToken)
      .then(({ success, data }) => {
        if (success) setScripts(data);
      })
      .catch(() => {
        setScripts([]);
      });
  }, []);

  if (user) {
    let selectedScript;
    if (scripts.length && scriptId)
      selectedScript = scripts.find(({ _id }) => _id === scriptId);
    if (scripts.length && !scriptId) selectedScript = scripts[0];

    return (
      <Grid container>
        <Grid item>
          <ScriptsList scripts={scripts} />
        </Grid>
        <Grid item>
          <Memorizer script={selectedScript} />
        </Grid>
      </Grid>
    );
  } else return <Redirect to="/login" />;
};

export default Home;
