import generateExposedActions from '../helpers';
import { actions, dispatch } from '../store';

const activityActions = generateExposedActions('activity', actions, dispatch);

export const {
  getActivities,
  getActivity,
  selectActivity,
  closeActivityForm,
  openActivityForm,
  postActivity,
  putActivity,
  setActivitySchema,
} = activityActions;
