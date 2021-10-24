import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { connect } from 'react-redux';

import { errorMessage } from '../../utils/utils'

import { userSignIn } from "../../Reducer/api.actions";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";

const SignIn = ({userSignIn, user}) => {
  const [serverError, setServerError] = useState(null);

  const {control, handleSubmit, watch, formState: {errors}} = useForm();

  const onSubmit = ({email, password}) => {
    userSignIn(email, password)
      .catch(err => setServerError(err.response.data.errors))
  }

  if (user.token) {
    console.log(JSON.parse(sessionStorage.getItem('user')));
    return <Redirect to="/"/>
  }

  return (
    <div className="signin form _block">
      <h2 className="form__title">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="signin__form">
        <div className="controller">
          <Controller
            className="controller"
            name="email"
            control={control}
            rules={{required: "Enter your Email", pattern: /.+@.+\..+/i}}
            render={({field}) =>
              <FormInput {...field} value={watch("email")} label="Email" error={errors.email || serverError}/>
            }
          />
          {errors.email && errorMessage(errors.email.type, 'Email')}
        </div>
        <div className="controller">
          <Controller
            name="password"
            control={control}
            rules={{required: "Enter your password", minLength: 6, maxLength: 40}}
            render={({field}) =>
              <FormInput {...field} type="password" value={watch("password")} label="Password" error={errors.password || serverError}/>
            }
          />
          {errors.password && errorMessage(errors.password.type, 'password', 6, 40)}
          {serverError && <span className="form__error">Email or password is invalid.</span>}
        </div>
        <Button type="submit" children={"Sign In"}/>
        <div className="form__subtitle">
          Don’t have an account?
          <Link to={'/sign-up'}>Sign Up.</Link>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = ({user}) => ({user});

const mapDispatchToProps = {userSignIn}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
