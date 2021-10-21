import axios from "axios";
import { setArticles, setPostsTotal, setUser } from "./store.actions";

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

export const getAllArticles = currentPage => dispatch => {
  return axios(`${apiBase}articles/?limit=5&offset=${currentPage * 5 - 5}`, authHeader)
    .then(res => res.data)
    .then(data => {
      console.log('getAllArticles:',data)
      dispatch(setArticles(data.articles));
      dispatch(setPostsTotal(data.articlesCount));
    })
}

export const makeNewArticle = (title, description, body, tagList) => () => {
  return axios.post(`${apiBase}articles`,
    {article: {title, description, body, tagList: [...tagList]}},authHeader)
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