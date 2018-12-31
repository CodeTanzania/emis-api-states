import {
  DELETE_INCIDENT_TYPE_ERROR,
  DELETE_INCIDENT_TYPE_START,
  DELETE_INCIDENT_TYPE_SUCCESS,
  GET_INCIDENT_TYPES_ERROR,
  GET_INCIDENT_TYPES_START,
  GET_INCIDENT_TYPES_SUCCESS,
  GET_INCIDENT_TYPE_ERROR,
  GET_INCIDENT_TYPE_START,
  GET_INCIDENT_TYPE_SUCCESS,
  POST_INCIDENT_TYPE_ERROR,
  POST_INCIDENT_TYPE_START,
  POST_INCIDENT_TYPE_SUCCESS,
  PUT_INCIDENT_TYPE_ERROR,
  PUT_INCIDENT_TYPE_START,
  PUT_INCIDENT_TYPE_SUCCESS,
} from './constants';

/**
 * Action dispatched when fetching incident types from the API start
 *
 * @function
 * @name getIncidentTypesStart
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getIncidentTypesStart() {
  return {
    type: GET_INCIDENT_TYPES_START,
  };
}

/**
 * Action dispatched when fetching incident types from the API is successfully
 *
 * @function
 * @name getIncidentTypesSuccess
 *
 * @param {Object[]} incidentTypes=[]
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getIncidentTypesSuccess(incidentTypes = []) {
  return {
    type: GET_INCIDENT_TYPES_SUCCESS,
    payload: {
      data: incidentTypes,
    },
  };
}

/**
 * Action dispatched when fetching incident types from the API fails
 *
 * @function
 * @name getIncidentTypesError
 *
 * @param {Object} error - Error Instance
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getIncidentTypesError(error) {
  return {
    type: GET_INCIDENT_TYPES_ERROR,
    payload: {
      data: error,
    },
  };
}

/**
 * Action dispatched when fetching a single incident type from the API starts
 *
 * @function
 * @name getIncidentTypeStart
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getIncidentTypeStart() {
  return {
    type: GET_INCIDENT_TYPE_START,
  };
}

/**
 * Action dispatched when fetching a single incident type from API is successfully
 *
 * @function
 * @name getIncidentTypeSuccess
 *
 * @param {Object} incidentType
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getIncidentTypeSuccess(incidentType) {
  return {
    type: GET_INCIDENT_TYPE_SUCCESS,
    payload: {
      data: incidentType,
    },
  };
}

/**
 * Action dispatched when fetching a single incident type from API fails
 *
 * @function
 * @name getIncidentTypeError
 *
 * @param error
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getIncidentTypeError(error) {
  return {
    type: GET_INCIDENT_TYPE_ERROR,
    payload: {
      data: error,
    },
  };
}

/**
 * Action dispatched when creating incident type from the API starts
 *
 * @function
 * @name postIncidentTypeStart
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postIncidentTypeStart() {
  return {
    type: POST_INCIDENT_TYPE_START,
  };
}

/**
 * Action dispatched when creating incident type from API is successfully
 *
 * @function
 * @name postIncidentTypeSuccess
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postIncidentTypeSuccess() {
  return {
    type: POST_INCIDENT_TYPE_SUCCESS,
  };
}

/**
 * Action dispatched when creating incident type from API fails
 *
 * @function
 * @name postIncidentTypeError
 *
 * @param error
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postIncidentTypeError(error) {
  return {
    type: POST_INCIDENT_TYPE_ERROR,
    payload: {
      data: error,
    },
  };
}

/**
 * Action dispatched when updating incident type from the API starts
 *
 * @function
 * @name putIncidentTypeStart
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putIncidentTypeStart() {
  return {
    type: PUT_INCIDENT_TYPE_START,
  };
}

/**
 * Action dispatched when updating incident type from API is successfully
 *
 * @function
 * @name putIncidentTypeSuccess
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putIncidentTypeSuccess() {
  return {
    type: PUT_INCIDENT_TYPE_SUCCESS,
  };
}

/**
 * Action dispatched when updating incident type from API fails
 *
 * @function
 * @name putIncidentTypeError
 *
 * @param error
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putIncidentTypeError(error) {
  return {
    type: PUT_INCIDENT_TYPE_ERROR,
    payload: {
      data: error,
    },
  };
}

/**
 * Action dispatched when deleting incident type from the API starts
 *
 * @function
 * @name deleteIncidentTypeStart
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteIncidentTypeStart() {
  return {
    type: DELETE_INCIDENT_TYPE_START,
  };
}

/**
 * Action dispatched when deleting incident type from API is successfully
 *
 * @function
 * @name deleteIncidentTypeSuccess
 *
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteIncidentTypeSuccess() {
  return {
    type: DELETE_INCIDENT_TYPE_SUCCESS,
  };
}

/**
 * Action dispatched when deleting incident type from API fails
 *
 * @function
 * @name deleteIncidentTypeError
 *
 * @param error
 * @returns {Object} - Redux action
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteIncidentTypeError(error) {
  return {
    type: DELETE_INCIDENT_TYPE_ERROR,
    payload: {
      data: error,
    },
  };
}
