import React, { Component } from 'react';

class CardRow extends Component {
  render() {
    console.log(this.props.cards);
    return (
      <section className="card-row">
        <div className="container">
          {this.props.cards && this.props.cards.map((card, index) => {
            let icon = require(`../img/${card.icon}.svg`);
            return <div className="card-row__card" key={index}>
              <div style={{backgroundImage: `url(${icon})`}} className="card-row__card-icon"></div>
              <h2 className="card-row__card-title">{card.title}</h2>
              <p className="card-row__card-description">{card.description}</p>
            </div>
          })}
        </div>
      </section>
    );
  }
}

export default CardRow;