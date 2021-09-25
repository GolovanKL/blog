import actionTypes from "./actionTypes";

export const setUser = user => ({
  type: actionTypes.SET_USER,
  payload: user
});

export const setApiErrors = errors => ({
  type: actionTypes.SET_ERRORS,
  payload: errors
});

export const setArticles = articles => ({
  type: actionTypes.SET_ARTICLES,
  payload: articles
});

export const logOut = () => ({
  type: actionTypes.LOG_OUT,
})