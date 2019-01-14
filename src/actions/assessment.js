import generateExposedActions from '../helpers';
import { actions, dispatch } from '../store';

const assessmentActions = generateExposedActions(
  'assessment',
  actions,
  dispatch
);

export const {
  getAssessments,
  getAssessment,
  selectAssessment,
  closeAssessmentForm,
  openAssessmentForm,
  postAssessment,
  putAssessment,
  setAssessmentSchema,
} = assessmentActions;
