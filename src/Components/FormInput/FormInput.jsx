import React from 'react';

import './FormInput.scss';

const FormInput = React.forwardRef((props, ref) => {
  const {label, value, error} = props;

  const inputValue = typeof value === 'string' ? value : '';

  return (
    <div className="group">
      <input className={`${error ? 'error' : ''} form-input`} {...props} value={inputValue}  ref={ref}/>
      {label ?
        <label className={`${value ? 'shrink' : ''} form-input-label`}>{label}</label>
        : null
      }
    </div>
  );
});

export default FormInput;