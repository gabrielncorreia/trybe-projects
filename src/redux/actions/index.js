import actypes from './actionTypes';

const actions = {
  setGameOptions: (options) => ({
    type: actypes.SET_GAME_OPTIONS,
    options,
  }),

  saveQuestionsOnStore: (questions) => ({
    type: actypes.SAVE_QUESTIONS_ON_STORE,
    questions }),

  addTimer: (timer) => ({
    type: actypes.ADD_TIMER,
    timer,
  }),

};
export default actions;
