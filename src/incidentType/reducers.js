import {
  GET_INCIDENT_TYPES_ERROR,
  GET_INCIDENT_TYPES_START,
  GET_INCIDENT_TYPES_SUCCESS,
  SELECT_INCIDENT_TYPE,
  SET_INCIDENT_TYPE_SCHEMA,
} from './constants';

const defaultIncidentTypeState = {
  list: [],
  selected: null,
  filters: null,
  error: null,
  page: 1,
  total: 0,
  loading: false,
  posting: false,
};
const defaultIncidentTypeSchemaState = null;

/**
 * IncidentType schema reducer
 *
 * @function
 * @name incidentTypeSchema
 *
 * @param {Object} state
 * @param {Object} action - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function incidentTypeSchema(
  state = defaultIncidentTypeSchemaState,
  action
) {
  switch (action.type) {
    case SET_INCIDENT_TYPE_SCHEMA:
      return Object.assign({}, state, action.payload.data);
    default:
      return state;
  }
}

/**
 * incidentType reducer
 *
 * @function
 * @name incidentType
 *
 * @param {Object} state
 * @param {Object} action - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function incidentType(state = defaultIncidentTypeState, action) {
  switch (action.type) {
    case GET_INCIDENT_TYPES_START:
      return Object.assign({}, state, { loading: true });
    case GET_INCIDENT_TYPES_SUCCESS:
      return Object.assign({}, state, {
        list: action.payload.data,
        page: action.payload.meta.page,
        total: action.payload.meta.total,
        loading: false,
      });
    case GET_INCIDENT_TYPES_ERROR:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload.data,
      });
    case SELECT_INCIDENT_TYPE:
      return Object.assign({}, state, { selected: action.payload.data });
    default:
      return state;
  }
}
