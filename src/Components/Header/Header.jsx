import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logOut, setUser } from "../../Reducer/store.actions";
import userAvatar from '../../assets/user.png';
import initialState from "../../initialState/initialState";

import './Header.scss';

const Header = ({user, logOut, setUser}) => {

  const history = useHistory();

  if (!user.username) {
    const activeUser = JSON.parse(sessionStorage.getItem('user')) || initialState.user;
    setUser(activeUser);
  } else {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  const onLogOut = () => {
    logOut();
    history.push("/");
  }

  const headerAuth =
    <div className="header__auth auth">
      <Link to='/sign-in'>
        <div className="auth__sign-in auth__element">
          Sign In
        </div>
      </Link>
      <Link to='/sign-up'>
        <div className="auth__sign-up auth__element">
          Sign Up
        </div>
      </Link>
    </div>

  const headerUser = user.username &&
    <div className='header__loggedin'>
      <div className="header__newpost">
        <Link to='/new-article'>Create article</Link>
      </div>
      <Link to='/profile'>
        <div className="header__user">
          <div className='header__username'>{user.username}</div>
          <div className='header__avatar'><img src={user.image || userAvatar} alt="user"/></div>
        </div>
      </Link>
      <div className="log-out">
        <button type="button" onClick={onLogOut} className="log-out__button">Log Out</button>
      </div>
    </div>

  return (
    <header className="header">
      <div className="header__title">
        <Link to='/'>
          <h3>Realworld Blog</h3>
        </Link>
      </div>
      {user.username ? headerUser : headerAuth}
    </header>
  );
};

const mapDispatchTOProps = {logOut, setUser};

const mapStateToProps = ({user}) => ({user});

export default connect(mapStateToProps, mapDispatchTOProps)(Header);

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    token: PropTypes.string,
  }).isRequired,
  logOut: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
}
