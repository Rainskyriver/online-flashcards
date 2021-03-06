// import { render } from 'react-dom'
import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { useSpring, animated as a }from 'react-spring';
import '../../../../../styles/FlashCard.css';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const SecondCard = forwardRef((props, ref) => {
  const {  back, onSelect, id, selectCard, flip, uid} = props;
  const [flipped, set] = useState(flip)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  const handleFlip = () => {
    set(state => !state);
  };
  // useEffect(() => {
  //   if (flip) {
  //     handleFlip();
  //   }
  // }, [])
  const handleZIndex = () => {
    if (flipped) {
      return 0;
    } else {
      return 1;
    }
  };

  return (
    <Card className="root">
      <a.div
        onClick={ () => {
          handleFlip()
          selectCard(id, uid);
        }}
        className="c front"
        style={{
          background: 'rgb(29,229,253)',
          background: 'linear-gradient(157deg, rgba(29,229,253,1) 0%, rgba(69,82,252,1) 100%)',
          zIndex: `${handleZIndex()}`,
          opacity: opacity.interpolate(o => 1 - o),
          transform
        }}
      >
      </a.div>

      <a.div
        className="c back"
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`)
        }}
      >
        <CardContent>
          {back}
        </CardContent>
      </a.div>
    </Card>
  )
});

export default SecondCard
