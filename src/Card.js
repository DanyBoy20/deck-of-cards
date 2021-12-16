import React, { Component } from 'react';
import "./Card.css";

class Card extends React.Component {
  constructor(props) {
    super(props);
    // transform: translate(10px, 20px) rotate(20deg);
    let angle = Math.random() * 90 - 45; // rotamos
    let xPos = Math.random() * 40 - 20; // desplazamos eje x
    let yPos = Math.random() * 40 - 20; // desplazamos eje y
    // this se refiera a la carta actual, _transform es la propiedad que se aplicara a style (guion bajo para que no se confunda con la propiedad transform)
    this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`;
  }
  render() {     
    return (
        <img 
          style={{ transform: this._transform }}
          className="Card" 
          src={this.props.image} 
          alt={this.props.name} 
        />
    );
  }
}
 
export default Card;