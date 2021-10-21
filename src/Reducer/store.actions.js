import initialState from "../initialState/initialState";
import actionTypes from "./actionTypes";

export const setUser = user => {
  console.log(user)
  if (!user.username) {
   user = JSON.parse(sessionStorage.getItem('user')) || initialState.user;
  } else {
    sessionStorage.setItem('user', JSON.stringify(user));
  }
  return {
    type: actionTypes.SET_USER,
    payload: user
  }
};

export const setApiErrors = errors => ({
  type: actionTypes.SET_ERRORS,
  payload: errors
});

export const setArticles = articles => ({
  type: actionTypes.SET_ARTICLES,
  payload: articles
});

export const setPostsTotal = total => ({
  type: actionTypes.SET_TOTAL,
  payload: total
})

export const logOut = () => dispatch => {
  sessionStorage.removeItem('user')
  dispatch(setArticles(initialState.articles))
  dispatch(setPostsTotal(initialState.postsTotal))
  dispatch(setUser(initialState.user))
};




