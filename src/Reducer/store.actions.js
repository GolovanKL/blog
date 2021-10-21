import axios from "axios";
import initialState from "../initialState/initialState";
import actionTypes from "./actionTypes";

const apiBase = 'https://jm-blog-project.herokuapp.com/api/';
// apiBase2 = 'https://conduit-api-realworld.herokuapp.com/api/';
// apiBase4 = 'https://conduit.productionready.io/api/';

const getToken = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return user ? user.token : null;
}

const authHeader = {
  headers: {
    "authorization": `Token ${getToken()}`
  }
}

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

export const getAllArticles = currentPage => dispatch => {
  return axios(`${apiBase}articles/?limit=5&offset=${currentPage * 5 - 5}`, authHeader)
    .then(res => res.data)
    .then(data => {
      console.log('getAllArticles:',data)
      dispatch(setArticles(data.articles));
      dispatch(setPostsTotal(data.articlesCount));
    })
}

export const userSignIn = (email, password) => dispatch => {
  return axios.post(`${apiBase}users/login`, {user: {email, password}})
    .then(res => res.data.user)
    .then(user => dispatch(setUser(user)))
}

export const  userSignUp = (username, email, password) => dispatch => {
  return axios.post(`${apiBase}users`, {user: {username, email, password}})
    .then(res => res.data.user)
    .then(user => {
      if (user) dispatch(setUser(user))
    })
}

export const editProfile = (username, email, password, url) => dispatch => {
  return axios.put(`${apiBase}user`, {user: {email, username, password, image: url}}, authHeader)
    .then(res => res.data.user)
    .then(user => {
      if (user) dispatch(setUser(user))
    })
    .then(() => dispatch(getAllArticles(1)))
    .catch(err => console.dir(err));

}

export const makeNewArticle = (title, description, text, tagList) => () => {
  return axios.post(`${apiBase}articles`,
    {article: {title, description, body: text, tagList: [...tagList]}},authHeader)
    .catch(err => console.dir(err))
}

export const getOneArticle = slug => () => axios(`${apiBase}articles/${slug}`);

export const deleteArticle = slug => () => {
  return axios.delete(`${apiBase}articles/${slug}/`, authHeader)
    .catch(err => console.dir(err))
}

export const favoriteArticle = slug => () => {
  return axios.post(`${apiBase}articles/${slug}/favorite`,null, authHeader)
    .catch(err => console.dir(err))
}

export const unFavoriteArticle = slug => () => {
  return axios.delete(`${apiBase}articles/${slug}/favorite`, authHeader)
    .catch(err => console.dir(err))
}

