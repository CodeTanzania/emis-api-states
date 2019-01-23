import { pluralize } from 'inflection';
import forIn from 'lodash/forIn';
import { combineReducers } from 'redux';
import { configureStore } from 'redux-starter-kit';
import createResourceFor from './factories/slice';

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
