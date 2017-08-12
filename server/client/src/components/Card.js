import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ card, index }) => {
  const icon = require(`../img/${card.icon}.svg`); // eslint-disable-line import/no-dynamic-require, global-require

  return (
    <div className="card-row__card" key={index}>
      <div style={{ backgroundImage: `url(${icon})` }} className="card-row__card-icon" />
      <h2 className="card-row__card-title">{card.title}</h2>
      <p className="card-row__card-description">{card.description}</p>
    </div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
