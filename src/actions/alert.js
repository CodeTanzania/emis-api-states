import generateExposedActions from '../helpers';
import { actions, dispatch } from '../store';

const alertActions = generateExposedActions('alert', actions, dispatch);

export const {
  getAlerts,
  getAlert,
  selectAlert,
  closeAlertForm,
  openAlertForm,
  postAlert,
  putAlert,
  setAlertSchema,
} = alertActions;
