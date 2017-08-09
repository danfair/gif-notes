import React from 'react';
import PropTypes from 'prop-types';

const Gif = ({ activeGifIndex, gifObject, gifId }) => {
  let gifClassName = '';
  let bgStyle = {};

  if (activeGifIndex === gifId) {
    gifClassName = 'active-gif';
    bgStyle = { backgroundImage: `url(${gifObject.images.downsized_medium.url})` };
  } else if (activeGifIndex - 1 === gifId || activeGifIndex + 1 === gifId) {
    gifClassName = 'prev-gif';
    bgStyle = { backgroundImage: `url(${gifObject.images.downsized_medium.url})` };
  }

  if (activeGifIndex <= gifId + 1) {
    return (
      <div style={bgStyle} className={`gif-rotator__gif gif ${gifClassName}`} />
    );
  }

  return null;
};

Gif.propTypes = {
  activeGifIndex: PropTypes.number.isRequired,
  gifObject: PropTypes.object.isRequired,  // eslint-disable-line react/forbid-prop-types
  gifId: PropTypes.number.isRequired,
};

export default Gif;
