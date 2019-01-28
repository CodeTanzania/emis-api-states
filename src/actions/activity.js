import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const activityActions = generateExposedActions('activity', actions, dispatch);

export const {
  clearActivitiesFilter,
  clearActivitiesSort,
  closeActivityForm,
  filterActivities,
  getActivities,
  getActivity,
  selectActivity,
  openActivityForm,
  paginateActivities,
  postActivity,
  putActivity,
  searchActivities,
  setActivitySchema,
  sortActivities,
} = activityActions;
