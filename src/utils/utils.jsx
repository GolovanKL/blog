import React from "react";

export const errorMessage = (type, name, minLength, maxLength) => {
  switch (type) {
    case 'required':
      return <span className="form__error">Enter your {name}.</span>
    case 'minLength':
      return <span className="form__error">Your {name} needs to be at least {minLength} characters.</span>
    case 'maxLength':
      return <span className="form__error">Your {name} needs to be no more than {maxLength} characters.</span>
    case 'pattern':
      return <span className="form__error">Enter valid Email address</span>
    case 'validate':
      return <span className="form__error">Passwords must match</span>
    default:
      return null
  }
}

const getToken = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return user ? user.token : null;
}

export const makeAuthHeader = () => ({
  headers: {
    "authorization": `Token ${getToken()}`
  }
})