import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const incidentActions = generateExposedActions('incident', actions, dispatch);

export const {
  getIncidents,
  getIncident,
  selectIncident,
  closeIncidentForm,
  openIncidentForm,
  postIncident,
  putIncident,
  setIncidentSchema,
} = incidentActions;
