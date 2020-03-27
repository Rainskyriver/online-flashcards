// import { render } from 'react-dom'
import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { useSpring, animated as a }from 'react-spring';
import '../../../../../styles/FlashCard.css';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const FirstCard = forwardRef((props, ref) => {
  const {  image_url, front, id, selectCard, selectedCards,uid,flip, setSelectedCards } = props;
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
  // const cardRef = useRef(); 
  // useImperativeHandle(ref, () => ({
  //   handleFlip: () => {
  //     cardRef.current.handleFlip();
  //   }
  // }));
  const handleZIndex = () => {
    if (flipped) {
      return 0;
    } else {
      return 1;
    }
  };
  const content = () => {
    if (image_url) {
      return (
        // <img style={{
        //   fontSize: '25px',
        //   height: 'auto',
        //   borderRadius: '8px',
        //   width: '25vw',
        //   height: '30vh',
        //   alignSelf: 'flex-start',
        //   }} src={image_url}/>
          <div style={{
            background: {image_url}
          }}>

          </div>
      )
    } else {
      return (
      <p>{front}</p>
      )
    }
  }
  return (
    <Card className="root" >
      <a.div
        onClick={() => {
          handleFlip() 
          selectCard(id, uid)
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
          backgroundImage: image_url ? `url(${image_url})` : null,
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`)
        }}
      >
        <CardContent style={{ alignSelf: 'center', display: "flex", alignItems: "center", height: "inherit"}}>
          {content()}
        </CardContent>
      </a.div>
    </Card>
  )
});

export default FirstCard
