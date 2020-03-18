import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import "../styles/Deck.css";

export default function Deck(props) {
  const { title, description, image, tags } = props;

  console.log(props);
  return (
    <Card className="root">
      <div className="cover">
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            component="p"
          >
            Title
            {title}
          </Typography>
        </CardContent>

        <CardActions
          style={{ justifyContent: "flex-start", marginTop: "auto" }}
          disableSpacing
        >
          <Typography multiline align="right" variant="subtitle2" component="p">
            Description
            {description}
          </Typography>
        </CardActions>
      </div>
    </Card>
  );
}
