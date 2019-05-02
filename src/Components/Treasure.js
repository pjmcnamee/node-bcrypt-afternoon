import React from 'react';
import AddTreasure from './AddTreasure';

export default function Treasure(props) {
  console.log('DO I EVEN GET HIT?')
  console.log(222222222222222222, props.addMyTreasure)
  const treasure = props.treasure.map((item, index) => {
    return <img src={item.image_url} key={index} alt="" />;
  });
  return (
    <div>
      {props.addMyTreasure ? <AddTreasure addMyTreasure={props.addMyTreasure}/> : null}
      {treasure}
    </div>
  );
}
