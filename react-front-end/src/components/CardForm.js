import React, { useState, useRef } from "react";
import { Form } from "react-final-form";
import { Paper, Grid, Button, CssBaseline, TextField } from "@material-ui/core";

import { useSpring, animated as a } from "react-spring";
import "../styles/CardForm.css";

import FlashCard from "./FlashCard";

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

export default function CardForm(props) {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });
  const flashCardRef = useRef();
  const [input, setInput] = useState({
    question: props.question ? props.question : "",
    image: props.image ? props.image :  "",
    hint: props.hint ? props.hint : "",
    answer: props.answer ? props.answer : "",
    resources: props.resources ? props.resources : ""
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
  const handleChange = (e, userInput) => {
    const id = props.id
    setInput({ ...input, [userInput]: e.target.value });
    props.giveCardData(id, input)
  };

  const topVal = props.id * 300
  return (
    <div>

      <div className="cardFormContainer" style={{ alignItems: 'flex-between', position: 'relative', top: topVal}}>
      <FlashCard
        ref={flashCardRef}
        question={input.question}
        image={input.image}
        hint={input.hint}
        answer={input.answer}
        resources={input.resources}
        />
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit, submitting, values }) => (
            <div>
              <a.div
                className="f fr"
                style={{
                  zIndex: `${handleZIndex()}`,
                  opacity: opacity.interpolate(o => 1 - o),
                  transform
                }}
              >
                <form onSubmit={handleSubmit} noValidate>
                  <Paper style={{ padding: 3 }}>
                    <Grid container alignItems="flex-start" spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          required
                          name="question"
                          value={input.question}
                          onChange={e => handleChange(e, "question")}
                          multiline
                          type="text"
                          label="Question"
                        />
                      </Grid>
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
                          name="hint"
                          value={input.hint}
                          onChange={e => handleChange(e, "hint")}
                          multiline
                          label="Hint"
                        />
                      </Grid>
                      <Grid item style={{ marginTop: 16 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleFlip();
                            flashCardRef.current.handleFlip()}}
                        >
                          Flip
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </form>
              </a.div>

              <a.div
                className="f ba"
                style={{
                  opacity,
                  transform: transform.interpolate(t => `${t} rotateX(180deg)`)
                }}
              >
                <form onSubmit={handleSubmit} noValidate>
                  <Paper style={{ padding: 16 }}>
                    <Grid container alignItems="flex-start" spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          required
                          name="answer"
                          value={input.answer}
                          onChange={e => handleChange(e, "answer")}
                          multiline
                          type="text"
                          label="Answer"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          name="resources"
                          value={input.resources}
                          onChange={e => handleChange(e, "resources")}
                          multiline
                          label="Resources"
                        />
                      </Grid>
                      <Grid item style={{ marginTop: 16 }}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            handleFlip()
                            flashCardRef.current.handleFlip()}}
                        >
                          Flip
                        </Button>
                      </Grid>
                    </Grid>
                  </Paper>
                </form>
              </a.div>
            </div>
          )}
        />
      </div>
    </div>
  );
}
