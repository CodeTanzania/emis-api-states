import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const assessmentActions = generateExposedActions(
  'assessment',
  actions,
  dispatch
);

export const {
  clearAssessmentsFilter,
  clearAssessmentsSort,
  closeAssessmentForm,
  filterAssessments,
  getAssessments,
  getAssessment,
  selectAssessment,
  openAssessmentForm,
  paginateAssessments,
  postAssessment,
  putAssessment,
  refreshAssessments,
  searchAssessments,
  setAssessmentSchema,
  sortAssessments,
} = assessmentActions;
