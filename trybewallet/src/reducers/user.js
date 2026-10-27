// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_USER_EMAIL } from '../actions/index';

const initialState = {
  email: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
  case ADD_USER_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}

export default userReducer;
