import { pluralize, singularize } from 'inflection';
import upperFirst from 'lodash/upperFirst';

/**
 * Generate defaultReducers object
 *
 * @function
 * @name getDefaultReducers
 *
 * @param {string} singular
 * @param {string} plural
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getDefaultReducers(resourceName) {
  const plural = upperFirst(pluralize(resourceName));
  const singular = upperFirst(singularize(resourceName));

  return {
    [`select${singular}`]: (state, action) =>
      Object.assign({}, state, { selected: action.payload }),
    [`get${plural}Request`]: state =>
      Object.assign({}, state, { loading: true }),
    [`get${plural}Success`]: (state, action) =>
      Object.assign({}, state, {
        list: [...action.payload.data],
        page: action.payload.page,
        total: action.payload.total,
        loading: false,
      }),
    [`get${plural}Failure`]: (state, action) =>
      Object.assign({}, state, { error: action.payload, loading: false }),
    [`post${singular}Request`]: state =>
      Object.assign({}, state, { posting: true }),
    [`post${singular}Success`]: state =>
      Object.assign({}, state, { posting: false }),
    [`post${singular}Failure`]: (state, action) =>
      Object.assign({}, state, { error: action.payload, posting: false }),
    [`put${singular}Request`]: state =>
      Object.assign({}, state, { posting: true }),
    [`put${singular}Success`]: state =>
      Object.assign({}, state, { posting: false }),
    [`put${singular}Failure`]: (state, action) =>
      Object.assign({}, state, { posting: false, error: action.payload }),
    [`open${singular}Form`]: state =>
      Object.assign({}, state, { showForm: true }),
    [`close${singular}Form`]: state =>
      Object.assign({}, state, { showForm: false }),
    [`set${singular}Schema`]: (state, action) =>
      Object.assign({}, state, { schema: action.payload }),
  };
}

/**
 * Generate default initial State for resource
 *
 * @function
 * @name getDefaultInitialState
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
