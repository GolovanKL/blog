import axios from "axios";

export default class BlogApi {

  apiBase1 = 'https://conduit.productionready.io/api/';
  apiBase2 = 'https://realworld-temp-api.herokuapp.com/api/';
  apiBase3 = 'https://api.realworld.io/api/';
  apiBase = this.apiBase2;


  getAllArticles = (currentPage) => {
    return axios(`${this.apiBase}articles?limit=5&offset=${currentPage * 5 - 5}`)
      .then(res => res.data)
  }

  getOneArticle = (slug) => {
    return axios(`${this.apiBase}articles/${slug}`)
  }

  favoriteArticle = (slug) => {
    return axios.post(`${this.apiBase}articles/${slug}/favorite`)
  }

  unFavoriteArticle = (slug) => {
    return axios.delete(`${this.apiBase}articles/${slug}/favorite`)
  }

  userSignIn = (email, password) => {
    return axios.post(`${this.apiBase}users/login`, {
      "user": {
        "email": email,
        "password": password
      }
    })
  }

  userSignUp = (username, email, password) => {
    return axios.post(`${this.apiBase}users`, {
      "user": {
        "username": username,
        "email": email,
        "password": password
      }
    })
  }

  editProfile = (username, email, password, url) => {
    return axios.put(`${this.apiBase}user`, {
      "user":{
        "email": email,
        "username": username,
        "password": password,
        "image": url
      }
    })
  }

  makeNewArticle = (title, description, text) => {
    return axios.post(`${this.apiBase}articles`, {
      "article": {
        "title": title,
        "description": description,
        "body": text,
      }
    })
  }
}