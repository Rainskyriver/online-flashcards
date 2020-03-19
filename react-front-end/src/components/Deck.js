import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import "../styles/Deck.css";
import axios from "axios";

export default function Deck(props) {
  const { title, description, image, tags, id, deck_id } = props;
  const handleSubmit = () => {
    const formRef = document.getElementsByClassName("study_form")[id];
    if (formRef) {
      formRef.submit();
    }
  };
  return (
    <Card className="root" style={{ borderRadius: "18px" }}>
      <form className="study_form" action={`/study/${deck_id}`} method="GET">
        <div onClick={handleSubmit} className="cover">
          <div className="deck-image">
            <img src={image} alt={title}></img>
          </div>
          <div className="deck-info">
            <CardActions disableSpacing>
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                component="p"
                style={{ textAlign: "left" }}
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
                style={{ textAlign: "left" }}
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
                style={{ textAlign: "left" }}
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
