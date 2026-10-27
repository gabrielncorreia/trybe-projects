import actypes from '../actions/actionTypes';

const INITIAL_STATE = {
  score: 0,
  timer: 0,
};

const userScoreReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // case actypes.ADD_SCORE:
  //   return {
  //     ...state,
  //     score: state.score + 1,
  //   };
  case actypes.ADD_TIMER:
    return {
      ...state,
      timer: action.timer,
    };

  default:
    return state;
  }
};

export default userScoreReducer;
