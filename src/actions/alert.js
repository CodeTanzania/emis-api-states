import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const alertActions = generateExposedActions('alert', actions, dispatch);

export const {
  clearAlertsFilter,
  clearAlertsSort,
  closeAlertForm,
  filterAlerts,
  getAlerts,
  getAlert,
  selectAlert,
  openAlertForm,
  paginateAlerts,
  postAlert,
  putAlert,
  refreshAlerts,
  searchAlerts,
  setAlertSchema,
  sortAlerts,
} = alertActions;
