import React, { useState } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { withRouter, Redirect } from 'react-router-dom';

import { errorMessage } from '../../utils/utils'
import BlogApi from "../../blogApi/BlogApi";

import { setUser } from "../../Reducer/store.actions";

import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";

import './SignUp.scss';

const {userSignUp} = new BlogApi();

const SignUp = ({dispatch, history, user: {username}}) => {
  const [serverError, setServerError] = useState(false);

  const {register, control, handleSubmit, watch, formState: {errors}} = useForm();

  const onSubmit = ({username, email, password}) => {
    console.log(username, email, password)
    userSignUp(username, email, password)
      .then(res => res.data.user)
      .then(user => {
        if (user) {
          dispatch(setUser(user));
          sessionStorage.setItem('user', JSON.stringify(user));
          history.push('/');
        }
      })
      .catch(err => {
        setServerError(err.response.data.errors)
      });
  }

  if (username) {
    return <Redirect to="/articles" />
  }

  return (
    <div className="signup form _block">
      <h2 className="form__title">Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='signup__form'>
        <div className="controller">
          <Controller
            className="controller"
            name="username"
            control={control}
            rules={{required: true, minLength: 3, maxLength: 20}}
            render={({field}) =>
              <FormInput {...field}
                         value={watch("username")}
                         label="Username"
                         error={errors.username || serverError.username}
              />
            }
          />
          {errors.username && errorMessage(errors.username.type, 'username', 3, 20)}
          {serverError.username && <span className="form__error">Username has already been taken</span>}
        </div>
        <div className="controller">
          <Controller
            className="controller"
            name="email"
            control={control}
            rules={{required: true, pattern: /.+@.+\..+/i}}
            render={({field}) =>
              <FormInput {...field}
                         value={watch("email")}
                         label="Email"
                         error={errors.email || serverError.email}
              />
            }
          />
          {errors.email && errorMessage(errors.email.type, 'Email')}
          {serverError.email && <span className="form__error">Email has already been taken</span>}

        </div>
        <div className="controller">
          <Controller
            className="controller"
            name="password"
            control={control}
            rules={{required: true, minLength: 6, maxLength: 40}}
            render={({field}) =>
              <FormInput {...field}
                         type="password"
                         value={watch("password")}
                         label="Password"
                         error={errors.password}
              />
            }
          />
          {errors.password && errorMessage(errors.password.type, 'password', 6, 40)}
        </div>
        <div className="controller">
          <Controller
            className="controller"
            name="repeatPassword"
            control={control}
            rules={{
              required: true,
              validate: value => value === watch("password") || 'error'
            }}
            render={({field}) =>
              <FormInput {...field}
                         type="password"
                         value={watch("repeatPassword")}
                         label="Repeat your Password"
                         error={errors.repeatPassword}
              />
            }
          />
          {errors.repeatPassword && errorMessage(errors.repeatPassword.type, 'password')}
        </div>
        <div className="delimiter"/>
        <div className={`controller checkbox`}>
          <input
            type="checkbox"
            id="checkbox"
            {...register("checkbox", {required: true})}
          />
          <label className={`${errors.checkbox ? 'error' : ''}`} htmlFor="checkbox">
            I agree to the processing of my personal information
          </label>
        </div>
        <Button type="submit" children={"Create"}/>
        <div className="form__subtitle">
          Already have an account?
          <Link to={'/sign-in'}>Sign In.</Link>
        </div>
      </form>
    </div>
  )
}

const mapStateToProps = ({user}) => ({user})

export default connect(mapStateToProps)(withRouter(SignUp));
