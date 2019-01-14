import { pluralize } from 'inflection';
import forIn from 'lodash/forIn';
import { combineReducers } from 'redux';
import { configureStore } from 'redux-starter-kit';
import createResourceFor from './factories/slice';

/**
 * Wrap actions with dispatch function
 *
 * @function
 * @name wrapActionsWithDispatch
 *
 * @param {Object} actions
 * @param {function} dispatch
 * @returns {Object} actions
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
 * Extract all resource reducers into a single object
 *
 * @function
 * @name mapSliceReducers
 *
 * @param {string[]} resources
 * @param {Object} slices
 * @returns {Object} reducers
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
 * Extracts all actions into one object
 *
 * @function
 * @name mapSliceActions
 *
 * @param {string[]} resources
 * @param {Object} slices
 * @returns {Object} actions
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
 * Create slices from all EMIS resources
 *
 * @function
 * @name createResourcesSlices
 *
 * @param {string[]} resources
 * @returns {Object} slices
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

// all resources exposed by this library
const resources = [
  'activity',
  'alert',
  'assessment',
  'feature',
  'incident',
  'incidentType',
  'plan',
  'procedure',
  'questionnaire',
  'resource',
  'role',
  'stakeholder',
];

const slices = createResourcesSlices(resources);

const reducers = mapSliceReducers(resources, slices);

const rootReducer = combineReducers(reducers);

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export const actions = mapSliceActions(resources, slices, store.dispatch);

export const { dispatch } = store;
