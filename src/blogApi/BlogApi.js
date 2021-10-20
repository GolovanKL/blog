import axios from "axios";

export default class BlogApi {

  apiBase1 = 'https://jm-blog-project.herokuapp.com/api/';
  apiBase2 = 'https://conduit-api-realworld.herokuapp.com/api/';
  apiBase4 = 'https://conduit.productionready.io/api/';
  apiBase = this.apiBase4;

  getToken = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log("Token", user)
    return user ? user.token : null;
  }

  authHeader = {
    headers: {
      "authorization": `Token ${this.getToken()}`
    }
  }

  getAllArticles = (currentPage) => {
    return axios(`${this.apiBase}articles/?limit=5&offset=${currentPage * 5 - 5}`, this.authHeader)
      .then(res => res.data)
  }

  getOneArticle = (slug) => {
    return axios(`${this.apiBase}articles/${slug}`)
  }

  favoriteArticle = (slug) => {
    return axios.post(`${this.apiBase}articles/${slug}/favorite`,null, this.authHeader)
      .catch(err => console.dir(err))
  }

  unFavoriteArticle = (slug) => {
    return axios.delete(`${this.apiBase}articles/${slug}/favorite`, this.authHeader)
      .catch(err => console.dir(err))
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
    const data = { email, username, password, image: url};

    return axios.put(`${this.apiBase}user`, data, this.authHeader)
  }

  makeNewArticle = (title, description, text, tagList) => {
    const data = {
      article: {title, description, body: text, tagList: [...tagList]}
    }
    return axios.post(`${this.apiBase}articles`, data, this.authHeader)
  }

  deleteArticle = (slug) => {
    return axios.delete(`${this.apiBase}articles/${slug}/`, this.authHeader)
      .catch(err => console.dir(err))
  }

}

