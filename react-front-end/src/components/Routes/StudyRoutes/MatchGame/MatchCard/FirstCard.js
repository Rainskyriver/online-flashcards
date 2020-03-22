// import { render } from 'react-dom'
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useSpring, animated as a }from 'react-spring';
import '../../../../../styles/FlashCard.css';

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
  const {  image_url } = props;
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
          <img style={{size: '50px'}} src={'https://images-na.ssl-images-amazon.com/images/I/51-TrKw%2BYtL._AC_SX355_.jpg'}/>
        </CardContent>
      </a.div>

      <a.div
        className="c back"
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`)
        }}
      >
        <CardContent>
          <img style={{height: 'auto'}} src={image_url}/>
        </CardContent>
      </a.div>
    </Card>
  )
});

export default FlashCard
