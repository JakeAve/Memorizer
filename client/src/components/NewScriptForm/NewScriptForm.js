import React from "react";
import { Grid, TextField, Button, Container } from "@material-ui/core";
import addScript from "../../actions/addScript";
import { useAlert } from "../../contexts/alerts";
import { useUser } from "../../contexts/user";

const NewScriptForm = () => {
  const alert = useAlert();
  const { accessToken } = useUser();

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target.closest("form");
    const formData = new FormData(form);
    const payload = {};
    for (const [field, value] of formData) payload[field] = value;
    const { success } = await addScript(payload, accessToken);
    if (success) alert("success", "Success", 3000);
    else alert("error", "Something went wrong", 3000);
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <TextField
            multiline
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="content"
            label="New Script"
            name="content"
            autoFocus
          />
          <Button type="submit" fullWidth variant="contained" color="primary">
            Add
          </Button>
        </Grid>
      </form>
    </Container>
  );
};

export default NewScriptForm;
