import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { logOut, setUser } from "../../Reducer/store.actions";
import userAvatar from '../../assets/user.png'

import './Header.scss';

const Header = ({user, logOut, history, setUser}) => {

  if (!user.username) {
    console.log('Header: no user in store');
    setUser(user);
  }

  const onLogOut = () => {
    logOut();
    history.push("/");
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

  const headerUser = user.username &&
    <div className='header__loggedin'>
      <div className="header__newpost">
        <Link to={'/new-article'}>Create article</Link>
      </div>
      <Link to={'/profile'}>
        <div className="header__user">
          <div className='header__username'>{user.username}</div>
          <div className='header__avatar'><img src={user.image || userAvatar} alt="user"/></div>
        </div>
      </Link>
      <div className="log-out">
        <button onClick={onLogOut} className="log-out__button">Log Out</button>
      </div>
    </div>

  return (
    <header className="header">
      <div className="header__title">
        <Link to={'/'}>
          <h3>Realworld Blog</h3>
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

export default connect(mapStateToProps, mapDispatchTOProps)(withRouter(Header));
