import axios from "axios";
import initialState from "../initialState/initialState";
import actionTypes from "./actionTypes";

const apiBase = 'https://conduit.productionready.io/api/';

const getToken = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  console.log("Token", user)
  return user ? user.token : null;
}

const authHeader = {
  headers: {
    "authorization": `Token ${getToken()}`
  }
}

export const setUser = user => {
  // sessionStorage.setItem('user', JSON.stringify(user));
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

export const logOut = () => (dispatch) => {
  sessionStorage.removeItem('user')
  dispatch(setArticles(initialState.articles))
  dispatch(setPostsTotal(initialState.postsTotal))
  dispatch(setUser(initialState.user))
};

export const getAllArticles = (currentPage) => (dispatch) => {
  return axios(`${apiBase}articles/?limit=5&offset=${currentPage * 5 - 5}`, authHeader)
    .then(res => res.data)
    .then(res => {
      dispatch(setArticles(res.articles));
      dispatch(setPostsTotal(res.articlesCount));
    })
}

export const userSignIn = (email, password) => (dispatch) => {
  return axios.post(`${apiBase}users/login`, {
    "user": {
      "email": email,
      "password": password
    }
  })
    .then(res => res.data.user)
    .then(user => dispatch(setUser(user)))
}

export const favoriteArticle = (slug) => (dispatch) => {
  return axios.post(`${this.apiBase}articles/${slug}/favorite`,null, authHeader)
    .then(res => console.log(res))
    .catch(err => console.dir(err))
}