import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
import "./Deck.css";
const API_BASE_URL = "https://deckofcardsapi.com/api/deck";


class Deck extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deck: null, drawn: [] } // estados iniciales de deck y drawn
    this.getCard = this.getCard.bind(this);
  }
  async componentDidMount(){
    let deck = await axios.get(`${API_BASE_URL}/new/shuffle/`);
    this.setState( {deck: deck.data} );
  }
  async getCard(){
    let id = this.state.deck.deck_id;
    try {
      let cardURL = `${API_BASE_URL}/${id}/draw`
      // hacer un request a la API
      let cardRes = await axios.get(cardURL);
      if(!cardRes.data.success){
        throw new Error("No cards remaining")
      }
      console.log(cardRes.data);
      // asignar estado (setState) usando la informacion de la tarjeta de la API
      let card = cardRes.data.cards[0]; // obtenemos la carta      
      // actualizamos el estado del arreglo drawn con un callback ( this.setState(st => ( {drawn: [...st.drawn, card]} ) ) )
      this.setState(st => ({
        drawn: [ /* nuevo arreglo dawn */
          ...st.drawn, /* que contendra todo lo que el arreglo drawn anterior contenia (usamos operador spread: ...st.drawn)  */
          {
            /* propiedades y valores para el nuevo arreglo drwan */
            id: card.code,
            image: card.image,
            name: `${card.value} of ${card.suit}`
          }
        ]
      }));      
    } catch (error) {
      alert(error);      
    }    
  }
  
  render() { 
    const cards = this.state.drawn.map(c => (
      <Card key={c.id} name={c.name} image={c.image} />
    ));
    return (
      <div className='Deck'>
        <h1 className='Deck-title'>CARDS DECK</h1>
        <button className='Deck-btn' onClick={this.getCard}>
          Get Card!
        </button>
        <div className='Deck-cardarea'>{cards}</div>
      </div>
    );
  }
}
 
export default Deck;