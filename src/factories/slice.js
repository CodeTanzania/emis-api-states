import isObject from 'lodash/isObject';
import { createSlice } from 'redux-starter-kit';
import { camelize, getNormalizeResourceName } from '../helpers';

/**
 * @function
 * @name getDefaultReducers
 * @description Generate defaultReducers object
 *
 * @param {string} resourceName - Resource name
 * @returns {Object} Resource reducers
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getDefaultReducers(resourceName) {
  const plural = getNormalizeResourceName(resourceName, true);
  const singular = getNormalizeResourceName(resourceName);

  return {
    [camelize('select', singular)]: (state, action) =>
      Object.assign({}, state, { selected: action.payload }),
    [camelize('get', plural, 'Request')]: state =>
      Object.assign({}, state, { loading: true }),
    [camelize('get', plural, 'Success')]: (state, action) =>
      Object.assign({}, state, {
        list: [...action.payload.data],
        page: action.payload.page,
        total: action.payload.total,
        loading: false,
      }),
    [camelize('get', plural, 'Failure')]: (state, action) =>
      Object.assign({}, state, { error: action.payload, loading: false }),
    [camelize('get', singular, 'Request')]: state =>
      Object.assign({}, state, { loading: true }),
    [camelize('get', singular, 'Success')]: state =>
      Object.assign({}, state, { loading: false }),
    [camelize('get', singular, 'Failure')]: (state, action) =>
      Object.assign({}, state, { loading: false, error: action.payload }),
    [camelize('post', singular, 'Request')]: state =>
      Object.assign({}, state, { posting: true }),
    [camelize('post', singular, 'Success')]: state =>
      Object.assign({}, state, { posting: false }),
    [camelize('post', singular, 'Failure')]: (state, action) =>
      Object.assign({}, state, { error: action.payload, posting: false }),
    [camelize('put', singular, 'Request')]: state =>
      Object.assign({}, state, { posting: true }),
    [camelize('put', singular, 'Success')]: state =>
      Object.assign({}, state, { posting: false }),
    [camelize('put', singular, 'Failure')]: (state, action) =>
      Object.assign({}, state, { posting: false, error: action.payload }),
    [camelize('open', singular, 'Form')]: state =>
      Object.assign({}, state, { showForm: true }),
    [camelize('close', singular, 'Form')]: state =>
      Object.assign({}, state, { showForm: false }),
    [camelize('set', singular, 'Schema')]: (state, action) =>
      Object.assign({}, state, { schema: action.payload }),
  };
}

/**
 * @function
 * @name getDefaultInitialState
 * @description Generate default initial State for resource
 *
 * @returns {Object} Initial states of a resource
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getDefaultInitialState() {
  return {
    list: [],
    selected: null,
    page: 1,
    total: 0,
    pages: 1,
    loading: false,
    posting: false,
    showForm: false,
    schema: null,
  };
}

/**
 * @function
 * @name createSliceFor
 * @description Slice Factory which is used to create slice
 *
 * @param {string} sliceName - Slice name which will results to be reducer name
 * @param {Object} initialState - Optional override of default initial state
 * @param {Object} reducers - Optional override of default reducers
 * @returns {Object} slice resource slice
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export default function sliceFactory(
  sliceName,
  initialState = null,
  reducers = null
) {
  let defaultReducers = getDefaultReducers(sliceName);
  let initialDefaultState = getDefaultInitialState();

  if (initialState) {
    initialDefaultState = initialState;
  }

  if (reducers && isObject(reducers)) {
    defaultReducers = reducers;
  }

  return createSlice({
    slice: sliceName,
    initialState: initialDefaultState,
    reducers: defaultReducers,
  });
}
