import actypes from '../actions/actionTypes';

const initialState = {
  triviaQuestions: [],
};

function questionsReducer(state = initialState, action) {
  switch (action.type) {
  case actypes.SAVE_QUESTIONS_ON_STORE:
    return {
      ...state,
      triviaQuestions: action.questions,
    };
  default:
    return state;
  }
}

export default questionsReducer;
