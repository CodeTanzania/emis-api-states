import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const questionnaireActions = generateExposedActions(
  'questionnaire',
  actions,
  dispatch
);

export const {
  getQuestionnaires,
  getQuestionnaire,
  selectQuestionnaire,
  closeQuestionnaireForm,
  openQuestionnaireForm,
  postQuestionnaire,
  putQuestionnaire,
  setQuestionnaireSchema,
} = questionnaireActions;
