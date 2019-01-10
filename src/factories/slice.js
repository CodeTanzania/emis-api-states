import isObject from 'lodash/isObject';
import { createSlice } from 'redux-starter-kit';
import { getDefaultInitialState, getDefaultReducers } from '../config';

/**
 * Slice Factory which is used to create slice
 *
 * @function
 * @name createSliceFor
 *
 * @param {string} slice - Slice name which will results to also be reducer name
 * @param {*} initialState - Optional override of default initial state
 * @param {Object} reducers - Optional override of default reducers
 * @returns {Object} slice
 *
 * @see {@link https://redux-starter-kit.js.org/api/createslice}
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
