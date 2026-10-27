import actypes from '../actions/actionTypes';

const initialState = {
  numberOfQuestions: 5,
  category: '',
  difficulty: '',
};

function configReducer(state = initialState, action) {
  switch (action.type) {
  case actypes.SET_GAME_OPTIONS:
    return {
      ...state,
      ...action.options,
    };
  default:
    return state;
  }
}

export default configReducer;
