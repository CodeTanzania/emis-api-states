import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const questionnaireActions = generateExposedActions(
  'questionnaire',
  actions,
  dispatch
);

export const {
  clearQuestionnairesFilter,
  clearQuestionnairesSort,
  closeQuestionnaireForm,
  filterQuestionnaires,
  getQuestionnaires,
  getQuestionnaire,
  selectQuestionnaire,
  openQuestionnaireForm,
  paginateQuestionnaires,
  postQuestionnaire,
  putQuestionnaire,
  searchQuestionnaires,
  setQuestionnaireSchema,
  sortQuestionnaires,
} = questionnaireActions;
