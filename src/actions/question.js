import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const questionActions = generateExposedActions('question', actions, dispatch);

export const {
  clearQuestionsFilter,
  clearQuestionsSort,
  closeQuestionForm,
  filterQuestions,
  getQuestions,
  getQuestion,
  selectQuestion,
  openQuestionForm,
  paginateQuestions,
  postQuestion,
  putQuestion,
  refreshQuestions,
  searchQuestions,
  setQuestionSchema,
  sortQuestions,
} = questionActions;
