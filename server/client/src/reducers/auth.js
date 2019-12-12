import { DEFAULT_STATE } from '../actions'

const DEFAULT_STATE = {
  username: localStorage.getItem('clientID') || '',
}

export default function(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case DEFAULT_STATE:
      return action.payload;
    default:
      return state;
  }
}