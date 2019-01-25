import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const questionActions = generateExposedActions('question', actions, dispatch);

export const {
  getQuestions,
  getQuestion,
  selectQuestion,
  closeQuestionForm,
  openQuestionForm,
  postQuestion,
  putQuestion,
  setQuestionSchema,
} = questionActions;
