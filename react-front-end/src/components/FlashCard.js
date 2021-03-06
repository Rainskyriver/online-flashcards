// import { render } from 'react-dom'
import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { useSpring, animated as a }from 'react-spring';
import '../styles/FlashCard.css';

import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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

const FlashCard = forwardRef((props, ref) => {
  const [flipped, set] = useState(false)
  const { question, image, hint, answer, resources, hotkeyFlip } = props;
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  useImperativeHandle(ref, () => ({

    getAlert() {
      alert("getAlert from Child");
    },
    handleFlip() {
      set(state => !state);
      if (expanded) {
        setExpanded(!expanded);
      }
    }
  }));
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

  useEffect(() => {
    set(hotkeyFlip)
  }, [hotkeyFlip])

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
        <CardContent style={{ alignSelf: 'center', display: "flex", alignItems: "center", height: "inherit"}}>
          <Typography
            variant="h5"
            color="textSecondary"
            align="center"
            component="p"

          >
            {question}
          </Typography>
        </CardContent>

        <CardActions
          style={{ justifyContent: "flex-end", marginTop: "auto" }}
          disableSpacing
        >
          <Typography align="right" variant="subtitle2" component="p">
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
          <CardContent style={{ padding: 0 }}>
            <Typography paragraph>{hint}</Typography>
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
        <CardContent style={{ alignSelf: 'center', display: "flex", alignItems: "center", height: "inherit"}}>
          <Typography
            variant="h5"
            color="textSecondary"
            align="center"
            component="p"
          >
            {answer}
          </Typography>
        </CardContent>

        <CardActions
          style={{ justifyContent: "flex-end", marginTop: "auto" }}
          disableSpacing
        >
          <Typography align="right" variant="subtitle2" component="p">
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
        <Collapse style={{ minHeight: null}}in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{ padding: 0 }}>
          Link to:<a href={resources}> {resources}</a>
          </CardContent>
        </Collapse>
      </a.div>
    </Card>
  )
});

export default FlashCard
