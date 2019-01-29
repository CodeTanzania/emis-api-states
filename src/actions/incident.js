import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const incidentActions = generateExposedActions('incident', actions, dispatch);

export const {
  clearIncidentFilters,
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
  refreshIncidents,
  searchIncidents,
  setIncidentSchema,
  sortIncidents,
} = incidentActions;
