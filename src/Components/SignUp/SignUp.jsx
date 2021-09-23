import React, { useState } from 'react';

import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [repeatPassword, setRepeatPassword] = useState('');
  const {username, email, password} = userData;

  const handleChange = ({target}) => {
    const {value, name} = target;
    setUserData({...userData, [name]: value})
  }

  const handleRepeatPassword = ({target}) => {
    const {value} = target;
    setRepeatPassword(value);
  }

  return (
    <div className="signup form _block">
      <h2 className="form__title">Create new account</h2>
      <form action="" className="signup__form">
        <FormInput name="username" value={username} type="text" required handleChange={handleChange} label="Username"/>
        <FormInput name="email" value={email} type="email" required handleChange={handleChange} label="Email"/>
        <FormInput name="password" value={password} type="password" required handleChange={handleChange}
                   label="Password"/>
        <FormInput name="repeat password" value={repeatPassword} type="password" required handleChange={handleRepeatPassword}
                   label="Repeat Password"/>
        <Button type="submit" children={"Create"}/>
        <div className="form__subtitle">
          Already have an account?
          <Link to={'/sign-in'}>Sign In.</Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp;
