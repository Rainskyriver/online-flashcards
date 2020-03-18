import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";
import "../styles/Deck.css";

export default function Deck(props) {
  const { title, description, image, tags } = props;

  console.log(props);
  return (
    <Card className="root">
      <div className="cover">
        <img
          src="https://external-preview.redd.it/m946jqmcLv5lwf5LBsNwjILkX6h76K3PM3JNPd20zFY.png?auto=webp&s=329081a64c646ed24826cedd743d9046463d562c"
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
              multiline
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
              multiline
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
    </Card>
  );
}
