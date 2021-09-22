import React, { useState } from 'react';

import FormInput from "../../FormInput/FormInput";
import Button from "../../Button/Button";

const SignIn = () => {
  const [userData, setUserData] = useState({email: '', password: ''});
  const {email, password} = userData;

  const handleChange = ({target}) => {
    const {value, name} = target;
    setUserData({...userData, [name]: value})
  }

  return (
    <div className="signin form _block">
      <h2 className="form__title">Sign In</h2>
      <form action="" className="signin__form">
        <FormInput name="email" value={email} type="email" required handleChange={handleChange} label="Email"/>
        <FormInput name="password" value={password} type="password" required handleChange={handleChange}
                   label="Password"/>
        <Button type="submit" children={"Sign In"}/>
        <div className="form__subtitle">
          Don’t have an account?
          <a href="#">Sign Up.</a>
        </div>
      </form>
    </div>
  )
}

export default SignIn;
