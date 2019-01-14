import generateExposedActions from '../helpers';
import { actions, dispatch } from '../store';

const incidentTypeActions = generateExposedActions(
  'incidentType',
  actions,
  dispatch
);

export const {
  getIncidentTypes,
  getIncidentType,
  selectIncidentType,
  closedIncidentTypeForm,
  openIncidentTypeForm,
  postIncidentType,
  putIncidentType,
  setIncidentTypeSchema,
} = incidentTypeActions;
