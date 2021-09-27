import React from 'react';
import { Link, withRouter } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { connect } from 'react-redux';
import axios from "axios";

import { errorMessage } from '../utils/utils'

import { setUser } from "../../Reducer/store.actions";
import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";

const SignIn = ({setUser, history}) => {

  const {control, handleSubmit, watch, formState: {errors}} = useForm();

  const onSubmit = ({email, password}) => {
    axios.post('https://conduit.productionready.io/api/users/login', {
      "user": {
        "email": email,
        "password": password
      }
    })
      .then(res => {
          console.log(res.data.user);
          setUser(res.data.user);
          sessionStorage.setItem('user', JSON.stringify(res.data.user));
          history.push('/');
        }
      )
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
              <FormInput {...field} value={watch("email")} label="Email" error={errors.email}/>
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
              <FormInput {...field} type="password" value={watch("password")} label="Password" error={errors.password}/>
            }
          />
          {errors.password && errorMessage(errors.password.type, 'password', 6, 40)}
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

const mapDispatchToProps = {setUser};

export default connect(null, mapDispatchToProps)(withRouter(SignIn));
