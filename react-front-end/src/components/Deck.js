import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import "../styles/Deck.css";
import axios from "axios";

export default function Deck(props) {
  const { title, description, image, tags, id, deck_id } = props;
  const handleSubmit = () => {
    window.location.href=`/study/${deck_id}`;
  };
  const handleEdit = () => {
    window.location.href=`/decks/${deck_id}/edit`;
  }
  const handleDelete = () => {

  }
  return (
    <Card className="root" style={{ borderRadius: "18px" }}>
        <div className="cover">
          <div onClick={handleSubmit} className="deck-image">
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
              <Button onClick={handleEdit} >Edit</Button>
              <Button onClick={handleDelete} >Delete</Button>
              </Typography>
            </CardActions>
          </div>
        </div>
    </Card>
  );
}
