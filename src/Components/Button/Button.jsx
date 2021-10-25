import React from 'react';
import PropTypes from 'prop-types';

import './Button.scss'

function Button({children, ...props}) {
  return (
    <button className={`custom-button`}
            {...props}>
      {children}
    </button>
  );
}

export default Button;

Button.propTypes = {
  children: PropTypes.string.isRequired
}