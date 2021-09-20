import React from 'react';

import './Header.css';

const MyComponent = () => {

  return (
    <header className="header">
      <div className="header__title">
        <h6>Realworld Blog</h6>
      </div>
      <div className="header__auth auth">
        <div className="auth__sign-in auth__element">Sign In</div>
        <div className="auth__sign-up auth__element">Sign Up</div>
      </div>
    </header>
  );
};

export default MyComponent;
