import React, { useState } from "react";
import { Form } from "react-final-form";
import { Paper, Grid, Button, CssBaseline, TextField } from "@material-ui/core";
import Deck from "./Deck";
import '../styles/Deck.css';

const onSubmit = async values => {
  // const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  // await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};
const validate = values => {
  const errors = {};
  if (!values.title) {
    errors.title = "Required";
  }
  if (!values.description) {
    errors.description = "Please describe the Deck";
  }
  return errors;
};

export default function DeckForm() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    image: "",
    tags: ""
  });

  const handleChange = (e, userInput) => {
    setInput({ ...input, [userInput]: e.target.value });
  };

  return (
    <div className="new-deck">
      <CssBaseline />

      <div className="deck-display">
        <Deck
          title={input.title}
          description={input.description}
          image={input.image}
          tags={input.tags}
        />
      </div>

      <div className="deck-form">
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, submitting, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <Paper style={{ padding: 16 }}>
                <div>
                  <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        name="title"
                        value={input.title}
                        onChange={e => handleChange(e, "title")}
                        multiline
                        label="Title"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        required
                        name="description"
                        value={input.description}
                        onChange={e => handleChange(e, "description")}
                        multiline
                        label="Description"
                      />
                    </Grid>
                  </Grid>
                </div>
                <div>
                  <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="image"
                        value={input.image}
                        onChange={e => handleChange(e, "image")}
                        multiline
                        label="Image-URL"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="tags"
                        value={input.tags}
                        onChange={e => handleChange(e, "tags")}
                        multiline
                        label="Tags"
                      />
                    </Grid>
                  </Grid>
                </div>
              </Paper>
            </form>
          )}
        />
      </div>
    </div>
  );
}
