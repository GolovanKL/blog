import axios from "axios";

function getToken() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return user.token || null
}

export default class BlogApi {

  apiBase1 = 'https://jm-blog-project.herokuapp.com/api/';
  apiBase2 = 'https://realworld-api.herokuapp.com/api/';
  apiBase3 = 'https://api.realworld.io/api/';
  apiBase4 = 'https://conduit.productionready.io/api/';
  apiBase5 = 'https://conduit-api-realworld.herokuapp.com/api/';
  apiBase = this.apiBase4;

  getAllArticles = (currentPage) => {
    return axios(`${this.apiBase}articles/?limit=10&offset=${currentPage * 5 - 5}`,
      {
        headers: {
          'authorization': `Token ${getToken()}`
        }
      })
      .then(res => res.data)
  }

  getOneArticle = (slug) => {
    return axios(`${this.apiBase}articles/${slug}`)
  }

  favoriteArticle = (slug) => {
    return axios.post(`${this.apiBase}articles/${slug}/favorite/`)
  }

  unFavoriteArticle = (slug) => {
    return axios.delete(`${this.apiBase}articles/${slug}/favorite/`)
  }

  userSignIn = (email, password) => {
    return axios.post(`${this.apiBase}users/login/`, {
      "user": {
        "email": email,
        "password": password
      }
    })
  }

  userSignUp = (username, email, password) => {
    return axios.post(`${this.apiBase}users/`, {
      "user": {
        "username": username,
        "email": email,
        "password": password
      }
    })
  }

  editProfile = (username, email, password, url) => {
    return axios.put(`${this.apiBase}user/`, {
      "user": {
        "email": email,
        "username": username,
        "password": password,
        "image": url,
      }
    }, {
      headers: {
        'Authorization': `Token ${getToken()}`
      }
    })
  }

  makeNewArticle = (title, description, text) => {
    const data = {
      article: {
        title: "How to train your dragon",
        description: "Ever wonder how?",
        body: "You have to believe",
        tagList: []
      }
    }

    return axios.post(`${this.apiBase}articles`, data, {
      headers: {
        'Authorization': `Token ${getToken()}`,
        'content-type': 'application/json;charset=UTF-8'
      }
    })
  }
}