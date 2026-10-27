import { combineReducers } from 'redux';
import configReducer from './configReducer';
import questionsReducer from './questionsReducer';
import userScoreReducer from './userScoreReducer';

const rootReducer = combineReducers({
  configReducer,
  questionsReducer,
  userScoreReducer,
});

export default rootReducer;
