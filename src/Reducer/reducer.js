import initial from '../initialState/initialState';
import actionTypes from "./actionTypes";

const reducer = (state = initial, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case actionTypes.SET_ARTICLES:
      return {
        ...state,
        articles: action.payload
      }
    case actionTypes.SET_TOTAL:
      return {
        ...state,
        postsTotal: action.payload
      }
    case actionTypes.SET_ERRORS:
      return {
        ...state,
        apiErrors: action.payload
      }
    case actionTypes.LOG_OUT:
      return {
        ...state,
        user: {username: null},
        articles: []
      }
    default: return state;
  }
}

export default reducer;