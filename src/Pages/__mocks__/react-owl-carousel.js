import React from 'react';
import PropTypes from 'prop-types';

const OwlCarousel = ({ children }) => <div>{children}</div>;

OwlCarousel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default OwlCarousel;
