import React from 'react';
import PropTypes from 'prop-types';

const postImages = ({ images }) => {
  return <div>구현중ㅎㅎ</div>;
};

postImages.prototype = {
  images: PropTypes.arrayOf(PropTypes.object),
};

export default postImages;
