import React from 'react';
import Card from './Card';
import PropTypes from 'prop-types';

const CardRow = ({ cards }) => {
  return (
    <section className="card-row">
      <div className="container">
        {cards && cards.map((card, index) => {
          return (<Card
            key={index}
            card={card}
          />);
        })}
      </div>
    </section>
  );
};

CardRow.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CardRow;
