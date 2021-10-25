import axios from "axios";
import { setArticles, setPostsTotal, setUser } from "./store.actions";
import {makeAuthHeader} from "../utils/utils";

const apiBase = 'https://jm-blog-project.herokuapp.com/api/';
// apiBase = 'https://conduit-api-realworld.herokuapp.com/api/';
// apiBase = 'https://conduit.productionready.io/api/';

export const userSignIn = (email, password) => dispatch => axios.post(`${apiBase}users/login`, {user: {email, password}})
    .then(res => res.data.user)
    .then(user => dispatch(setUser(user)))

export const  userSignUp = (username, email, password) => dispatch => axios.post(`${apiBase}users`, {user: {username, email, password}})
    .then(res => res.data.user)
    .then(user => {
      if (user) dispatch(setUser(user))
    })

export const getAllArticles = currentPage => dispatch => axios(`${apiBase}articles/?limit=5&offset=${currentPage * 5 - 5}`, makeAuthHeader())
  .then(res => res.data)
  .then(data => {
    dispatch(setArticles(data.articles));
    dispatch(setPostsTotal(data.articlesCount));
  })

export const editProfile = (username, email, password, image) => dispatch => axios.put(`${apiBase}user`, {user: {email, username, password, image}}, makeAuthHeader())
    .then(res => res.data.user)
    .then(user => {
      if (user) dispatch(setUser(user))
    })
    .then(() => dispatch(getAllArticles(1)))
    .catch(err => console.dir(err))

export const makeNewArticle = (title, description, body, tagList) => () => axios.post(`${apiBase}articles`,
    {article: {title, description, body, tagList: [...tagList]}}, makeAuthHeader())
    .catch(err => console.dir(err))

export const getOneArticle = slug => () => axios(`${apiBase}articles/${slug}`);

export const deleteArticle = slug => () => axios.delete(`${apiBase}articles/${slug}/`, makeAuthHeader())
    .catch(err => console.dir(err))

export const editArticle = (slug, title, description, body, tagList) => () => axios.put(`${apiBase}articles/${slug}/`,
    {slug, article: {title, description, body, tagList: [...tagList]}}, makeAuthHeader())
    .catch(err => console.dir(err))

export const favoriteArticle = slug => () => axios.post(`${apiBase}articles/${slug}/favorite`,null, makeAuthHeader())
    .catch(err => console.dir(err))

export const unFavoriteArticle = slug => () => axios.delete(`${apiBase}articles/${slug}/favorite`, makeAuthHeader())
    .catch(err => console.dir(err))