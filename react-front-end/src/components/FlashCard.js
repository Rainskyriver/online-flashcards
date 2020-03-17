// import { render } from 'react-dom'
import React, { useState } from "react";
import { useSpring, animated as a } from "react-spring";
import "../styles/FlashCard.css";

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Autocomplete from "@material-ui/lab/Autocomplete";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  }
}));

const footerStyles = makeStyles(() => ({
  expand: {
    marginLeft: "auto",
  }
}))

export default function FlashCard(props) {
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = event => {
    event.stopPropagation();
    setExpanded(!expanded);
  };

  const handleFlip = () => {
    set(state => !state);
    if (expanded) {
      setExpanded(!expanded);
    }
  };
  const handleZIndex = () => {
    if (flipped) {
      return 0;
    } else {
      return 1;
    }
  };

  // const {
  //   question,
  //   image,
  //   hint,
  //   answer,
  //   resources
  // } = props;

  return (
    <Card className="root" onClick={handleFlip}>
      <a.div
        className="c front"
        style={{
          zIndex: `${handleZIndex()}`,
          opacity: opacity.interpolate(o => 1 - o),
          transform
        }}
      >
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            component="p"
          >
            QUESTION?!
          </Typography>
        </CardContent>

        <CardActions style={{justifyContent: "flex-end", marginTop: "auto"}} disableSpacing>
          <Typography
            align="right"
            variant="subtitle2"
            component="p"
          >
            Hint
          </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            edge="end"
            display="inline"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{padding: 0}}>
            <Typography paragraph>
              HERE IS YOUR BLOODY HINT!!! Hopefully it helped, don't worry about
              the yelling!
            </Typography>
          </CardContent>
        </Collapse>
      </a.div>

      <a.div
        className="c back"
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`)
        }}
      >
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            component="p"
          >
            ANSWER!
          </Typography>
        </CardContent>


        <CardActions style={{justifyContent: "flex-end", marginTop: "auto"}} disableSpacing>
          <Typography
            align="right"
            variant="subtitle2"
            component="p"
          >
            Resource
          </Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
            edge="end"
            display="inline"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{padding: 0}}>
            <Typography paragraph>
              HERE IS A RESOURCE FOR THIS ANSWER!!! www.somethinghelpful.com
            </Typography>
          </CardContent>
        </Collapse>
      </a.div>
    </Card>
  );
}
