import { Grid } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import ScriptsList from '../../components/ScriptsList/ScriptsList';
import { useUser } from '../../contexts/user';
import Memorizer from '../../components/Memorizer/Memorizer';
import getScripts from '../../actions/getScripts';
import NewScriptForm from '../../components/NewScriptForm/NewScriptForm';

const Home = (props) => {
  const { user, accessToken } = useUser();
  const [scripts, setScripts] = useState([]);
  const [newContent, setNewContent] = useState('');

  let scriptId = props.match.params.scriptId;
  const isOnNewPage = props.match.path === '/new';

  const fetchScripts = useCallback(() => {
    if (user && accessToken)
      getScripts(accessToken)
        .then(({ success, data }) => {
          if (success) setScripts(data);
        })
        .catch(() => {
          setScripts([]);
        });
  }, [user, accessToken]);

  useEffect(() => {
    fetchScripts();
  }, [fetchScripts]);

  let selectedScript;
  if (scripts.length && scriptId)
    selectedScript = scripts.find(({ _id }) => _id === scriptId);
  if (scripts.length && !scriptId) {
    scriptId = scripts[0]._id;
    selectedScript = scripts[0];
  }

  return (
    <Grid container>
      <Grid item xs={3}>
        <ScriptsList
          scripts={scripts}
          selected={scriptId}
          newContent={newContent}
        />
      </Grid>
      <Grid item xs={9}>
        {isOnNewPage ? (
          <NewScriptForm
            setNewContent={setNewContent}
            fetchScripts={fetchScripts}
          />
        ) : (
          <Memorizer script={selectedScript} fetchScripts={fetchScripts} />
        )}
      </Grid>
    </Grid>
  );
};

export default Home;
