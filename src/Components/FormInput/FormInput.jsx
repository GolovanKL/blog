import React from 'react';
import PropTypes from 'prop-types';

import './FormInput.scss';

const FormInput = React.forwardRef((props, ref) => {
  const {label, value, error} = props;
  const inputValue = typeof value === 'string' ? value : '';

  return (
    <div className="group">
      <input className={`${error ? 'error' : ''} form-input`} {...props} value={inputValue} ref={ref}/>
      {label ?
        <label className={`${value ? 'shrink' : ''} form-input-label`}>{label}</label>
        : null
      }
    </div>
  );
});

export default FormInput;

FormInput.defaultProps = {
  label: '',
  value: '',
  error: ''
};

FormInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({})])
}