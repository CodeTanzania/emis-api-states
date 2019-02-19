import { pluralize } from 'inflection';
import forIn from 'lodash/forIn';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';
import { configureStore } from 'redux-starter-kit';
import createResourceFor from './factories/slice';

/* application action types */
export const INITIALIZE_APP_START = 'app/initialize';
export const INITIALIZE_APP_SUCCESS = 'app/initializeSuccess';
export const INITIALIZE_APP_FAILURE = 'app/initializeFailure';

/**
 * @function
 * @name wrapActionsWithDispatch
 * @description Wrap actions with dispatch function
 *
 * @param {Object} actions list of api actions
 * @param {Function} dispatch store dispatch
 * @returns {Object} actions list of wrapped api actions with dispatch ability
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function wrapActionsWithDispatch(actions, dispatch) {
  const wrappedActions = {};

  forIn(actions, (fn, key) => {
    wrappedActions[key] = payload => dispatch(fn(payload));
  });

  return wrappedActions;
}

/**
 * @function
 * @name mapSliceReducers
 * @description Extract all resource reducers into a single object
 *
 * @param {Array<string>} resources list of api resources
 * @param {Object} slices resources slice
 * @returns {Object} reducers list of api reducers
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function mapSliceReducers(resources, slices) {
  const reducers = {};

  // reducers
  resources.forEach(resource => {
    reducers[pluralize(resource)] = slices[resource].reducer;
  });

  return reducers;
}

/**
 * @function
 * @name mapSliceActions
 * @description Extracts all actions into one object
 *
 * @param {Array<string>} resources list of api resources
 * @param {Object} slices resources slice
 * @returns {Object} actions list of api actions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function mapSliceActions(resources, slices) {
  const actions = {};

  resources.forEach(resource => {
    actions[resource] = slices[resource].actions;
  });

  return actions;
}

/**
 * @function
 * @name createResourcesSlices
 * @description Create slices from all EMIS resources
 *
 * @param {Array<string>} resources list of api resources
 * @returns {Object} slices resources slice
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function createResourcesSlices(resources) {
  const slices = {};

  // slices
  resources.forEach(resource => {
    slices[resource] = createResourceFor(resource);
  });

  return slices;
}

/**
 * @function
 * @name app
 * @description App reducer for controlling application initialization state
 *
 * @param {Object} state - previous app state value
 * @param {Object} action - dispatched action object
 * @returns {Object} - updated app state
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function app(state = { loading: false, error: null }, action) {
  switch (action.type) {
    case INITIALIZE_APP_START:
      return Object.assign({}, state, { loading: true });
    case INITIALIZE_APP_SUCCESS:
      return Object.assign({}, state, { loading: false });
    case INITIALIZE_APP_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload,
      });
    default:
      return state;
  }
}

// all resources exposed by this library
const resources = [
  'activity',
  'adjustment',
  'agency',
  'alert',
  'alertSource',
  'assessment',
  'district',
  'feature',
  'incident',
  'incidentType',
  'indicator',
  'item',
  'plan',
  'procedure',
  'question',
  'questionnaire',
  'region',
  'resource',
  'role',
  'focalPerson',
  'stock',
  'warehouse',
];

const slices = createResourcesSlices(resources);

const reducers = mapSliceReducers(resources, slices);
const allReducers = merge({}, reducers, { app });

const rootReducer = combineReducers(allReducers);

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export const actions = mapSliceActions(resources, slices, store.dispatch);

export const { dispatch } = store;
