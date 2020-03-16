import React from 'react';
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { Paper, Grid, Button, CssBaseline } from '@material-ui/core';

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};
const validate = values => {
  const errors = {};
  if (!values.question) {
    errors.question = 'Required';
  }
  return errors;
};

export default function CardForm() {
  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <CssBaseline />

      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    required
                    name="question"
                    component={TextField}
                    multiline
                    type="text"
                    label="Question"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="image"
                    component={TextField}
                    multiline
                    label="Image-URL"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name="notes"
                    component={TextField}
                    multiline
                    label="Notes"
                  />
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Flip
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}