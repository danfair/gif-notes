import React from 'react';

const Gif = ({activeGifIndex, gifObject, gifId}) => {

  let iframeClassName = '';
  let bgStyle = {};

  if (activeGifIndex === gifId) {
    iframeClassName = 'active-gif';
    bgStyle = {backgroundImage: `url(${gifObject.images.downsized_medium.url})`};
  } else if (activeGifIndex - 1 === gifId || activeGifIndex + 1 === gifId) {
    iframeClassName = 'prev-gif';
    bgStyle = {backgroundImage: `url(${gifObject.images.downsized_medium.url})`};
  }
  
  if (activeGifIndex <= gifId + 1) {
    return (
      <div style={bgStyle} className={`gif-rotator__gif gif ${iframeClassName}`}></div>
    );
  } else {
    return null;
  }
}

export default Gif;