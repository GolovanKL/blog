import axios from "axios";

export default class BlogApi {

  apiBase = 'https://conduit.productionready.io/api/';
  apiBase2 = 'https://realworld-temp-api.herokuapp.com/api/';
  apiBase3 = 'https://api.realworld.io/api/'

  getArticles = (currentPage) => {
    return axios(`${this.apiBase3}articles?limit=5&offset=${currentPage * 5 - 5}`)
      .then(res => res.data)
  }

  userSignIn = (email, password) => {
    return axios.post(`${this.apiBase3}users/login`, {
      "user": {
        "email": email,
        "password": password
      }
    })
  }

  userSignUp = (username, email, password) => {
    return axios.post(`${this.apiBase3}users`, {
      "user":{
        "username": username,
        "email": email,
        "password": password
      }
    })
  }

}