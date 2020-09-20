import React from 'react';
import PropTypes from 'prop-types';

export default function LoadingIndicator({ size }) {
  return (
    <div style={{fontSize: size}}>
      <span
        alt="Loading..."
        style={{width: size, height: size}}
        className='loading-spinner'
      />
    </div>
  );
}

LoadingIndicator.propTypes = {
  size: PropTypes.number,
};

LoadingIndicator.defaultProps = {
  size: 30,
};
