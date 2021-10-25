import initialState from "../initialState/initialState";
import actionTypes from "./actionTypes";

export const setLoading = () => ({
  type: actionTypes.SET_LOADING,
})


export const setUser = user => ({
    type: actionTypes.SET_USER,
    payload: user
  });

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




