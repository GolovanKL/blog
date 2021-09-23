import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

const MyComponent = () => {

  return (
    <header className="header">
      <div className="header__title">
        <h6>Realworld Blog</h6>
      </div>
      <div className="header__auth auth">
        <div className="auth__sign-in auth__element">
          <Link to={'/sign-in'}>Sign In</Link>
          </div>
        <div className="auth__sign-up auth__element">
          <Link to={'/sign-up'}>Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default MyComponent;
