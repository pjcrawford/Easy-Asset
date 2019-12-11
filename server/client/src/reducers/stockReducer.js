import {
    GET_STOCK,
    GET_STOCKS,
    DELETE_STOCK,

  } from "../actions/constants";
  
  const defaultState = [];
  
  const userReducer = (state = defaultState, { type, payload }) => {
    switch (type) {
      case GET_STOCK:
      case GET_STOCKS:
      case DELETE_STOCK:
        return payload;
      default:
        return state;
    }
  };
  
  export default userReducer;