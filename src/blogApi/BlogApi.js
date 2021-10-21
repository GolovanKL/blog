import axios from "axios";

export default class BlogApi {

  apiBase1 = 'https://jm-blog-project.herokuapp.com/api/';
  apiBase2 = 'https://conduit-api-realworld.herokuapp.com/api/';
  apiBase4 = 'https://conduit.productionready.io/api/';
  apiBase = this.apiBase1;

  getToken = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
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

  userSignIn = (email, password) =>
    axios.post(`${this.apiBase}users/login`, {user: {email, password}});


  userSignUp = (username, email, password) =>
    axios.post(`${this.apiBase}users`, {user: {username, email, password}});


  editProfile = (username, email, password, url) =>
     axios.put(`${this.apiBase}user`, {user: {email, username, password, image: url}}, this.authHeader);

  makeNewArticle = (title, description, text, tagList) =>
    axios.post(`${this.apiBase}articles`,
      {article: {title, description, body: text, tagList: [...tagList]}},
      this.authHeader
    )


  deleteArticle = (slug) => {
    return axios.delete(`${this.apiBase}articles/${slug}/`, this.authHeader)
      .catch(err => console.dir(err))
  }

}

