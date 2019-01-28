import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const incidentActions = generateExposedActions('incident', actions, dispatch);

export const {
  clearIncidentsFilter,
  clearIncidentsSort,
  closeIncidentForm,
  filterIncidents,
  getIncidents,
  getIncident,
  selectIncident,
  openIncidentForm,
  paginateIncidents,
  postIncident,
  putIncident,
  searchIncidents,
  setIncidentSchema,
  sortIncidents,
} = incidentActions;
