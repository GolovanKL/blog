import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logOut, setUser } from "../../Reducer/store.actions";
import userAvatar from '../../assets/user.png'

import './Header.scss';

const Header = ({user, logOut, setUser}) => {

  if (!user.username) {
    // console.log(JSON.parse(sessionStorage.getItem('user')))
    sessionStorage.getItem('user') && setUser(JSON.parse(sessionStorage.getItem('user')));
  }

  const headerAuth =
    <div className="header__auth auth">
      <Link to={'/sign-in'}>
        <div className="auth__sign-in auth__element">
          Sign In
        </div>
      </Link>
      <Link to={'/sign-up'}>
        <div className="auth__sign-up auth__element">
          Sign Up
        </div>
      </Link>
    </div>

  const headerUser =
    <div className='header__loggedin'>
      <div className="header__newpost">
        <Link to={'/new-article'}>Create article</Link>
      </div>
      <div className="header__user">
        <div className='header__username'>{user.username}</div>
        <div className='header__avatar'><img src={user.image || userAvatar} alt="user"/></div>
      </div>
      <div className="log-out">
        <button onClick={logOut} className="log-out__button">Log Out</button>
      </div>
    </div>

  return (
    <header className="header">
      <div className="header__title">
        <Link to={'/'}>
          <h6>Realworld Blog</h6>
        </Link>
      </div>
      {user.username ? headerUser : headerAuth}
    </header>
  );
};

const mapDispatchTOProps = {logOut, setUser};

const mapStateToProps = ({user}) => ({
  user,
});

export default connect(mapStateToProps, mapDispatchTOProps)(Header);
