import React from 'react';
import {
  Grid,
  TextField,
  Button,
  Container,
  Typography,
  Box,
} from '@material-ui/core';
import addScript from '../../actions/addScript';
import { useAlert } from '../../contexts/alerts';
import { useUser } from '../../contexts/user';

const NewScriptForm = (props) => {
  const { setNewContent, fetchScripts } = props;
  const alert = useAlert();
  const { accessToken } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target.closest('form');
    const formData = new FormData(form);
    const payload = {};
    for (const [field, value] of formData) payload[field] = value;
    const { success } = await addScript(payload, accessToken);
    if (success) {
      alert('success', 'Success', 3000);
      form.querySelector('textarea').value = '';
      setNewContent('');
      fetchScripts();
    } else alert('error', 'Something went wrong', 3000);
  };

  const updateNewContent = (e) => {
    setNewContent(e.target.value);
  };

  return (
    <Box mt={5}>
      <Container maxWidth="sm">
        <form onSubmit={onSubmit}>
          <Grid container>
            <Typography variant="h5">Enter new script</Typography>
            <TextField
              label="Title"
              name="title"
              margin="normal"
              id="title"
              fullWidth
            />
            <TextField
              multiline
              rows={8}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="content"
              label="New Script"
              name="content"
              autoFocus
              onChange={updateNewContent}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              Add
            </Button>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default NewScriptForm;
