import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const incidentTypeActions = generateExposedActions(
  'incidentType',
  actions,
  dispatch
);

export const {
  clearIncidentTypesFilter,
  clearIncidentTypesSort,
  closeIncidentTypeForm,
  filterIncidentTypes,
  getIncidentTypes,
  getIncidentType,
  selectIncidentType,
  openIncidentTypeForm,
  paginateIncidentTypes,
  postIncidentType,
  putIncidentType,
  searchIncidentTypes,
  setIncidentTypeSchema,
  sortIncidentTypes,
} = incidentTypeActions;
