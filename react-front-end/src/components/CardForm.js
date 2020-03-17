import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { TextField } from "final-form-material-ui";
import { Paper, Grid, Button, CssBaseline } from "@material-ui/core";

import { useSpring, animated as a } from "react-spring";
import "../styles/CardForm.css";

const onSubmit = async values => {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const validate = values => {
  const errors = {};
  if (!values.question) {
    errors.question = "Required";
  }
  if (!values.answer) {
    errors.answer = "Required";
  }
  return errors;
};

export default function CardForm() {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

  const handleFlip = () => {
    set(state => !state);
  };
  const handleZIndex = () => {
    if (flipped) {
      return 0;
    } else {
      return 1;
    }
  };

  return (
    <div style={{ padding: 16, maxWidth: 750 }}>
      <CssBaseline />

      <Form
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, submitting, values }) => (
          <div>
            <a.div
              className="c front"
              style={{ zIndex: `${handleZIndex()}`, opacity: opacity.interpolate(o => 1 - o), transform }}
            >
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
                        name="hint"
                        component={TextField}
                        multiline
                        label="Hint"
                      />
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFlip}
                      >
                        Flip
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </form>
            </a.div>

            <a.div
              className="c back"
              style={{
                opacity,
                transform: transform.interpolate(t => `${t} rotateX(180deg)`)
              }}
            >
              <form onSubmit={handleSubmit} noValidate>
                <Paper style={{ padding: 16 }}>
                  <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        required
                        name="answer"
                        component={TextField}
                        multiline
                        type="text"
                        label="Answer"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        name="resource"
                        component={TextField}
                        multiline
                        label="Resource"
                      />
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFlip}
                      >
                        Flip
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
                {/* <pre>{JSON.stringify(values, 0, 2)}</pre> */}
              </form>
            </a.div>
            
          </div>
        )}
      />
    </div>
  );
}
