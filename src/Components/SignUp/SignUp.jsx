import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { withRouter } from 'react-router-dom';

import { errorMessage } from '../utils/utils'
import BlogApi from "../blogApi/BlogApi";

import { setUser } from "../../Reducer/store.actions";

import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";

import './SignUp.scss';

const SignUp = ({setUser, history}) => {
  const {userSignUp} = new BlogApi();

  const {register, control, handleSubmit, watch, formState: {errors}} = useForm();

  // const [apiErrors, setApiErrors] = useState({});

  const onSubmit = ({username, email, password}) => {
    console.log(username, email, password)
    userSignUp(username, email, password)
      .then(res => res.data.user)
      .then(user => {
        if (user) {
          setUser(user)
          sessionStorage.setItem('user', JSON.stringify(user));
          history.push('/');
        }
      })
      .catch(error => console.dir(error))
    // .then(errors => setApiErrors(errors))
  }

  return (
    <div className="signup form _block">
      <h2 className="form__title">Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="signup__form">
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
                         error={errors.username}
              />
            }
          />
          {errors.username && errorMessage(errors.username.type, 'username', 3, 20)}
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
                         error={errors.email}
              />
            }
          />
          {errors.email && errorMessage(errors.email.type, 'Email')}
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

const mapDispatchToProps = {setUser}

export default connect(null, mapDispatchToProps)(withRouter(SignUp));
