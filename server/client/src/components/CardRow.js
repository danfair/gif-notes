import React from 'react';

const CardRow = ({cards}) => {
  return (
    <section className="card-row">
      <div className="container">
        {cards && cards.map((card, index) => {
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

export default CardRow;