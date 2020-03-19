import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import "../styles/Deck.css";
import axios from 'axios'

export default function Deck(props) {
  const { title, description, image, tags, id, deck_id } = props;
  const handleSubmit = () => {
    const formRef = document.getElementsByClassName('study_form')[id]
    if (formRef) {
      formRef.submit()
    }
  }
  return (
    <Card className="root">
      <form className='study_form' action={`/study/${deck_id}`} method='GET'>
        <div onClick={handleSubmit} className="cover">
          <img
            src={image}
            alt={title}
            className="deck-image"
          ></img>

          <div>
            <CardActions style={{ marginTop: "auto" }} disableSpacing>
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                component="p"
              >
                Title:
                {title}
              </Typography>
            </CardActions>

            <CardActions style={{ marginTop: "auto" }} disableSpacing>
              <Typography
                align="right"
                variant="subtitle2"
                component="p"
              >
                Description:
                {description}
              </Typography>
            </CardActions>

            <CardActions
              style={{ justifyContent: "flex-start", marginTop: "auto" }}
              disableSpacing
            >
              <Typography
                align="right"
                variant="subtitle2"
                component="p"
              >
                Tags:
                {tags}
              </Typography>
            </CardActions>
          </div>
        </div>
      </form>
    </Card>
  );
}
