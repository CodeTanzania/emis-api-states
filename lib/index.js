'use strict';

const forIn = require('lodash/forIn');
const get = require('lodash/get');
const isFunction = require('lodash/isFunction');
const isObject = require('lodash/isObject');
const PropTypes = require('prop-types');
const React = require('react');
const reactRedux = require('react-redux');
const merge = require('lodash/merge');
const redux = require('redux');
const reduxStarterKit = require('redux-starter-kit');
const inflection = require('inflection');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');
const emisApiClient = require('@codetanzania/emis-api-client');
const isEmpty = require('lodash/isEmpty');
const lowerFirst = require('lodash/lowerFirst');
const pick = require('lodash/pick');

/**
 * @function
 * @name camelize
 * @description Joins names and generate camelCase of joined words them
 *
 * @param {...string} words list of words to join and camelize
 * @returns {string} camelCase of joined words
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function camelize(...words) {
  return camelCase([...words].join(' '));
}

/**
 * @function
 * @name wrapActionsWithDispatch
 * @description Wrap actions with dispatch function. Make users to just
 * invoke actions without have to dispatch them.
 *
 * @param {Object} actions list of redux actions
 * @param {Function} dispatch store dispatch function
 * @returns {Object} map of redux action wrapped with dispatch function
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function wrapActionsWithDispatch(actions, dispatch) {
  const wrappedActions = {};

  forIn(actions, (fn, key) => {
    wrappedActions[key] = (...params) => dispatch(fn(...params));
  });

  return wrappedActions;
}

/**
 * @function
 * @name extractReducers
 * @description Extract all resource reducers into a single object
 *
 * @param {string[]} resources list of exposed API resources
 * @param {Object[]} slices list of resource slices
 * @returns {Object} map of all resources reducers
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function extractReducers(resources, slices) {
  const reducers = {};

  // reducers
  resources.forEach(resource => {
    reducers[inflection.pluralize(resource)] = slices[resource].reducer;
  });

  return reducers;
}

/**
 * @function
 * @name extractActions
 * @description Extracts all actions from all slices into into a single object
 *
 * @param {string[]} resources list of api resources
 * @param {Object[]} slices  list of all resources slices
 * @returns {Object} map of all resources actions
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function extractActions(resources, slices) {
  const actions = {};

  resources.forEach(resource => {
    actions[resource] = slices[resource].actions;
  });

  return actions;
}

/**
 * @function
 * @name getDefaultReducers
 * @description Generate defaultReducers object
 *
 * @param {string} resourceName Resource name
 * @returns {Object} Resource reducers
 *
 * @version 0.2.0
 * @since 0.1.0
 */
function getDefaultReducers(resourceName) {
  const plural = upperFirst(inflection.pluralize(resourceName));
  const singular = upperFirst(inflection.singularize(resourceName));

  return {
    [camelize('select', singular)]: (state, action) => Object.assign({}, state, { selected: action.payload }),
    [camelize('filter', plural)]: (state, action) => Object.assign({}, state, { filter: action.payload }),
    [camelize('sort', plural)]: (state, action) => Object.assign({}, state, { sort: action.payload }),
    [camelize('search', plural)]: (state, action) => Object.assign({}, state, { q: action.payload }),
    [camelize('clear', plural, 'filters')]: state => Object.assign({}, state, { filters: null }),
    [camelize('clear', plural, 'sort')]: state => Object.assign({}, state, { sort: null }),
    [camelize('get', plural, 'Request')]: state => Object.assign({}, state, { loading: true }),
    [camelize('get', plural, 'Success')]: (state, action) => Object.assign({}, state, {
      list: [...action.payload.data],
      page: action.payload.page,
      total: action.payload.total,
      size: action.payload.size,
      loading: false
    }),
    [camelize('get', plural, 'Failure')]: (state, action) => Object.assign({}, state, { error: action.payload, loading: false }),
    [camelize('get', singular, 'Request')]: state => Object.assign({}, state, { loading: true }),
    [camelize('get', singular, 'Success')]: state => Object.assign({}, state, { loading: false }),
    [camelize('get', singular, 'Failure')]: (state, action) => Object.assign({}, state, { loading: false, error: action.payload }),
    [camelize('post', singular, 'Request')]: state => Object.assign({}, state, { posting: true }),
    [camelize('post', singular, 'Success')]: state => Object.assign({}, state, { posting: false, showForm: false }),
    [camelize('post', singular, 'Failure')]: (state, action) => Object.assign({}, state, { error: action.payload, posting: false }),
    [camelize('put', singular, 'Request')]: state => Object.assign({}, state, { posting: true }),
    [camelize('put', singular, 'Success')]: state => Object.assign({}, state, { posting: false, showForm: false }),
    [camelize('put', singular, 'Failure')]: (state, action) => Object.assign({}, state, { posting: false, error: action.payload }),
    [camelize('delete', singular, 'Request')]: state => Object.assign({}, state, { posting: true }),
    [camelize('delete', singular, 'Success')]: state => Object.assign({}, state, { posting: false }),
    [camelize('delete', singular, 'Failure')]: (state, action) => Object.assign({}, state, { posting: false, error: action.payload }),
    [camelize('open', singular, 'Form')]: state => Object.assign({}, state, { showForm: true }),
    [camelize('close', singular, 'Form')]: state => Object.assign({}, state, { showForm: false }),
    [camelize('set', singular, 'Schema')]: (state, action) => Object.assign({}, state, { schema: action.payload })
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
function getDefaultInitialState() {
  return {
    list: [],
    selected: null,
    page: 1,
    total: 0,
    pages: 1,
    size: 0,
    loading: false,
    posting: false,
    showForm: false,
    schema: null,
    filter: null,
    sort: null,
    q: undefined
  };
}

/**
 * @function
 * @name createSliceFor
 * @description Slice Factory which is used to create slice
 *
 * @param {string} sliceName Slice name which will results to be reducer name
 * @param {Object} initialState Optional override of default initial state
 * @param {Object} reducers Optional override of default reducers
 * @returns {Object} slice resource slice
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function sliceFactory(sliceName, initialState = null, reducers = null) {
  let defaultReducers = getDefaultReducers(sliceName);
  let initialDefaultState = getDefaultInitialState();

  if (initialState) {
    initialDefaultState = initialState;
  }

  if (reducers && isObject(reducers)) {
    defaultReducers = reducers;
  }

  return reduxStarterKit.createSlice({
    slice: sliceName,
    initialState: initialDefaultState,
    reducers: defaultReducers
  });
}

/* application action types */
const INITIALIZE_APP_START = 'app/initialize';
const INITIALIZE_APP_SUCCESS = 'app/initializeSuccess';
const INITIALIZE_APP_FAILURE = 'app/initializeFailure';

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
function createResourcesSlices(resources) {
  const slices = {};

  // slices
  resources.forEach(resource => {
    slices[resource] = sliceFactory(resource);
  });

  return slices;
}

/**
 * @function
 * @name app
 * @description App reducer for controlling application initialization state
 *
 * @param {Object} state previous app state value
 * @param {Object} action dispatched action object
 * @returns {Object} updated app state
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function app(state = { loading: false, error: null }, action) {
  switch (action.type) {
    case INITIALIZE_APP_START:
      return Object.assign({}, state, { loading: true });
    case INITIALIZE_APP_SUCCESS:
      return Object.assign({}, state, { loading: false });
    case INITIALIZE_APP_FAILURE:
      return Object.assign({}, state, {
        loading: false,
        error: action.payload
      });
    default:
      return state;
  }
}

// all resources exposed by this library
const resources = ['activity', 'adjustment', 'agency', 'alert', 'alertSource', 'assessment', 'district', 'feature', 'incident', 'incidentType', 'indicator', 'item', 'itemCategory', 'itemUnit', 'plan', 'procedure', 'question', 'questionnaire', 'region', 'resource', 'role', 'focalPerson', 'stock', 'warehouse'];

const slices = createResourcesSlices(resources);

const reducers = merge({}, extractReducers(resources, slices), { app });

const rootReducer = redux.combineReducers(reducers);

const store = reduxStarterKit.configureStore({
  reducer: rootReducer,
  devTools: true
});

const actions = extractActions(resources, slices, store.dispatch);

const { dispatch } = store;

/**
 * @function
 * @name createThunkFor
 * @description Create and expose all common thunks for a resource.
 *
 * Custom thunk implementations can be added to the specific resource
 * actions module
 *
 * @param {string} resource  resource name
 * @returns {Object} thunks  resource thunks
 *
 * @version 0.3.0
 * @since 0.1.0
 */
function createThunksFor(resource) {
  const pluralName = upperFirst(inflection.pluralize(resource));
  const singularName = upperFirst(inflection.singularize(resource));
  const resourceName = lowerFirst(singularName);
  const storeKey = lowerFirst(pluralName);

  const thunks = {};

  /**
   * @function
   * @name get<Resource Plural Name>
   * @description A thunk that will be dispatched when fetching data from API
   *
   * @param {Object} param  Param object to be passed to API client
   * @param {Function} onSuccess  Callback to be called when fetching
   * resources from the API succeed
   * @param {Function} onError  Callback to be called when fetching
   * resources from the API fails
   * @returns {Function}  Thunk function
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  thunks[camelize('get', pluralName)] = (param, onSuccess, onError) => dispatch => {
    dispatch(actions[resourceName][camelize('get', pluralName, 'request')]());
    return emisApiClient.httpActions[camelize('get', pluralName)](param).then(data => {
      dispatch(actions[resourceName][camelize('get', pluralName, 'success')](data));

      // custom provided onSuccess callback
      if (isFunction(onSuccess)) {
        onSuccess();
      }
    }).catch(error => {
      dispatch(actions[resourceName][camelize('get', pluralName, 'failure')](error));

      // custom provided onError callback
      if (isFunction(onError)) {
        onError();
      }
    });
  };

  /**
   * @function
   * @name get<Resource Singular Name>
   * @description A thunk that will be dispatched when fetching
   * single resource data from the API
   *
   * @param {string} id  Resource unique identification
   * @param {Function} onSuccess  Callback to be called when getting a
   * resource from the API succeed
   * @param {Function} onError  Callback to be called when getting a resource
   * from the API fails
   * @returns {Function} Thunk function
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  thunks[camelize('get', singularName)] = (id, onSuccess, onError) => dispatch => {
    dispatch(actions[resourceName][camelize('get', singularName, 'request')]());
    return emisApiClient.httpActions[camelize('get', singularName)](id).then(data => {
      dispatch(actions[resourceName][camelize('get', singularName, 'success')](data));

      // custom provided onSuccess callback
      if (isFunction(onSuccess)) {
        onSuccess();
      }
    }).catch(error => {
      dispatch(actions[resourceName][camelize('get', singularName, 'failure')](error));

      // custom provided onError callback
      if (isFunction(onError)) {
        onError();
      }
    });
  };

  /**
   * @function
   * @name post<Resource Singular Name>
   * @description A thunk that will be dispatched when creating a single
   * resource data in the API
   *
   * @param {Object} param Resource  object to be created/Saved
   * @param {Function} onSuccess Callback to be executed when posting a
   * resource succeed
   * @param {Function} onError Callback to be executed when posting
   * resource fails
   * @returns {Function} Thunk function
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  thunks[camelize('post', singularName)] = (param, onSuccess, onError) => dispatch => {
    dispatch(actions[resourceName][camelize('post', singularName, 'request')]());
    return emisApiClient.httpActions[camelize('post', singularName)](param).then(data => {
      dispatch(actions[resourceName][camelize('post', singularName, 'success')](data));

      dispatch(actions[resourceName][camelize('clear', pluralName, 'filters')]());
      dispatch(actions[resourceName][camelize('clear', pluralName, 'sort')]());

      dispatch(actions[resourceName][camelize('search', pluralName)]());

      dispatch(thunks[camelize('get', pluralName)]());

      // custom provided onSuccess callback
      if (isFunction(onSuccess)) {
        onSuccess();
      }
    }).catch(error => {
      dispatch(actions[resourceName][camelize('post', singularName, 'failure')](error));

      // custom provided onError callback
      if (isFunction(onError)) {
        onError();
      }
    });
  };

  /**
   * @function
   * @name put<Resource Singular Name>
   * @description A thunk that will be dispatched when updating a single
   * resource data in the API
   *
   * @param {Object} param Resource  object to be updated
   * @param {Function} onSuccess Callback to be executed when updating a
   * resource succeed
   * @param {Function} onError Callback to be executed when updating a
   * resource fails
   * @returns {Function} Thunk function
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  thunks[camelize('put', singularName)] = (param, onSuccess, onError) => dispatch => {
    dispatch(actions[resourceName][camelize('put', singularName, 'request')]());
    return emisApiClient.httpActions[camelize('put', singularName)](param).then(data => {
      dispatch(actions[resourceName][camelize('put', singularName, 'success')](data));

      dispatch(actions[resourceName][camelize('clear', pluralName, 'filters')]());
      dispatch(actions[resourceName][camelize('clear', pluralName, 'sort')]());

      dispatch(actions[resourceName][camelize('search', pluralName)]());

      dispatch(thunks[camelize('get', pluralName)]());

      // custom provided onSuccess callback
      if (isFunction(onSuccess)) {
        onSuccess();
      }
    }).catch(error => {
      dispatch(actions[resourceName][camelize('put', singularName, 'failure')](error));

      // custom provided onError callback
      if (isFunction(onError)) {
        onError();
      }
    });
  };

  /**
   * @function
   * @name delete<Resource Singular Name>
   * @description A thunk that will be dispatched when deleting/archiving
   * a single resource data in the API
   *
   * @param {string} id Resource unique identification
   * @param {Function} onSuccess Callback to be executed when updating a
   * resource succeed
   * @param {Function} onError Callback to be executed when updating a
   * resource fails
   * @returns {Function} Thunk function
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  thunks[camelize('delete', singularName)] = (id, onSuccess, onError) => (dispatch, getState) => {
    dispatch(actions[resourceName][camelize('delete', singularName, 'request')]());
    return emisApiClient.httpActions[camelize('delete', singularName)](id).then(data => {
      dispatch(actions[resourceName][camelize('delete', singularName, 'success')](data));

      const { page, filter } = getState()[storeKey];

      // custom provided onSuccess callback
      if (isFunction(onSuccess)) {
        onSuccess();
      }

      return dispatch(thunks[camelize('get', pluralName)]({ page, filter }));
    }).catch(error => {
      dispatch(actions[resourceName][camelize('delete', singularName, 'failure')](error));

      // custom provided onError callback
      if (isFunction(onError)) {
        onError();
      }
    });
  };

  /**
   * @function
   * @name fetch<Resource Name>
   * @description A thunk that for fetching data from the API the difference
   * between this and get thunk is this will apply all the criteria on fetch.
   * Pagination, filters, Search Query and sort.
   *
   * @param {Function} onSuccess Callback to be called when fetching
   * resources from the API succeed
   * @param {Function} onError Callback to be called when fetching
   * resources from the API fails
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  thunks[camelize('fetch', pluralName)] = (onSuccess, onError) => (dispatch, getState) => {
    const { page, sort, filter, q } = getState()[storeKey];

    return dispatch(thunks[camelize('get', pluralName)]({ page, filter, sort, q }, onSuccess, onError));
  };

  /**
   * @function
   * @name filter<Resource Plural Name>
   * @description A thunk that will be dispatched when filtering resources
   *  data in the API
   *
   * @param {Object} filter Resource filter criteria object
   * @param {Function} onSuccess Callback to be executed when filtering
   * resources succeed
   * @param {Function} onError Callback to be executed when filtering
   * resources fails
   * @returns {Function} Thunk function
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  thunks[camelize('filter', pluralName)] = (filter, onSuccess, onError) => dispatch => {
    dispatch(actions[resourceName][camelize('filter', pluralName)](filter));

    return dispatch(thunks[camelize('get', pluralName)]({ filter }, onSuccess, onError));
  };

  /**
   * @function
   * @name refresh<Resource Plural Name>
   * @description A thunk that will be dispatched when refreshing resources
   *  data in the API
   *
   * @param {Function} onSuccess Callback to be executed when refreshing
   * resources succeed
   * @param {Function} onError Callback to be executed when refreshing
   * resources fails
   * @returns {Function} Thunk function
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  thunks[camelize('refresh', pluralName)] = (onSuccess, onError) => (dispatch, getState) => {
    const { page, filter, q } = getState()[storeKey];

    return dispatch(thunks[camelize('get', pluralName)]({
      page,
      filter,
      q
    }, onSuccess, onError));
  };

  /**
   * @function
   * @name search<Resource Plural Name>
   * @description A thunk that will be dispatched when searching resources
   *  data in the API
   *
   * @param {string} query  Search query string
   * @param {Function} onSuccess Callback to be executed when searching
   * resources succeed
   * @param {Function} onError Callback to be executed when searching
   * resources fails
   * @returns {Function} Thunk function
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  thunks[camelize('search', pluralName)] = (query, onSuccess, onError) => (dispatch, getState) => {
    dispatch(actions[resourceName][camelize('search', pluralName)](query));

    const { filter } = getState()[storeKey];

    return dispatch(thunks[camelize('get', pluralName)]({ q: query, filter }, onSuccess, onError));
  };

  /**
   * @function
   * @name sort<Resource Plural Name>
   * @description A thunk that will be dispatched when sorting resources
   *  data in the API
   *
   * @param {Object} order sort order object
   * @param {Function} onSuccess Callback to be executed when sorting
   * resources succeed
   * @param {Function} onError Callback to be executed when sorting
   * resources fails
   * @returns {Function} Thunk function
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  thunks[camelize('sort', pluralName)] = (order, onSuccess, onError) => (dispatch, getState) => {
    const { page } = getState()[storeKey];

    dispatch(actions[resourceName][camelize('sort', pluralName)](order));

    return dispatch(thunks[camelize('get', pluralName)]({ page, sort: order }, onSuccess, onError));
  };

  /**
   * @function
   * @name paginate<Resource Plural Name>
   * @description A thunk that will be dispatched when paginating resources
   *  data in the API
   *
   * @param {number} page  paginate to page
   * @param {Function} onSuccess Callback to be executed when paginating
   * resources succeed
   * @param {Function} onError Callback to be executed when paginating
   * resources fails
   * @returns {Function} Thunk function
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  thunks[camelize('paginate', pluralName)] = (page, onSuccess, onError) => (dispatch, getState) => {
    const { filter, q } = getState()[storeKey];

    return dispatch(thunks[camelize('get', pluralName)]({ page, filter, q }, onSuccess, onError));
  };

  /**
   * @function
   * @name clear<Resource Singular Name>Filters
   * @description A thunk that will be dispatched when clearing filters on
   * resources data in the API
   *
   * @param {Function} onSuccess Callback to be executed when filters are
   *  cleared and resources data is reloaded successfully
   * @param {Function} onError Callback to be executed when filters are
   * cleared and resources data fails to reload
   * @param {string[]} keep list of filter names to be kept
   * @returns {Function} Thunk Function
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  thunks[camelize('clear', singularName, 'filters')] = (onSuccess, onError, keep = []) => (dispatch, getState) => {
    if (!isEmpty(keep)) {
      // keep specified filters
      let keptFilters = pick(getState()[storeKey].filter, keep);
      keptFilters = isEmpty(keptFilters) ? null : keptFilters;
      return dispatch(thunks[camelize('filter', pluralName)](keptFilters, onSuccess, onError));
    }

    // clear all filters
    return dispatch(thunks[camelize('filter', pluralName)](null, onSuccess, onError));
  };

  /**
   * @function
   * @name clear<Resource Plural Name>Sort
   * @description A thunk that will be dispatched when clearing sort order on
   * resources data in the API
   *
   * @param {Function} onSuccess Callback to be executed when sort are
   *  cleared and resources data is reloaded successfully
   * @param {Function} onError Callback to be executed when sort are
   * cleared and resources data fails to reload
   * @returns {Function} Thunk function
   *
   * @version 0.1.0
   * @since 0.1.0
   */
  thunks[camelize('clear', pluralName, 'sort')] = (onSuccess, onError) => (dispatch, getState) => {
    const { page } = getState()[storeKey];

    dispatch(actions[resourceName][camelize('clear', pluralName, 'sort')]());

    return dispatch(thunks[camelize('get', pluralName)]({ page }, onSuccess, onError));
  };

  return thunks;
}

/**
 * @function
 * @name generateExposedActions
 * @description Generate all actions which are exposed from the library for
 * consumers to use. All exposed actions are wrapped in dispatch function so
 * use should not have call dispatch again.
 *
 * @param {string} resource Resource Name
 * @param {Object} actions Resources actions
 * @param {Function} dispatch Store action dispatcher
 * @param {Object} thunks Custom thunks to override/extends existing thunks
 * @returns {Object} wrapped resource actions with dispatching ability
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function generateExposedActions(resource, actions, dispatch, thunks = null) {
  const resourceName = inflection.singularize(upperFirst(resource));

  const generatedThunks = createThunksFor(resourceName);

  merge(generatedThunks, thunks);

  const extractedActions = {};

  extractedActions[camelize('select', resourceName)] = get(actions[resource], camelize('select', resourceName));

  extractedActions[camelize('open', resourceName, 'form')] = get(actions[resource], camelize('open', resourceName, 'form'));

  extractedActions[camelize('close', resourceName, 'form')] = get(actions[resource], camelize('close', resourceName, 'form'));

  extractedActions[camelize('set', resourceName, 'schema')] = get(actions[resource], camelize('set', resourceName, 'schema'));

  const allActions = merge({}, extractedActions, generatedThunks);

  return wrapActionsWithDispatch(allActions, dispatch);
}

const activityActions = generateExposedActions('activity', actions, dispatch);

const {
  clearActivityFilters,
  clearActivitiesSort,
  closeActivityForm,
  deleteActivity,
  filterActivities,
  getActivities,
  getActivity,
  selectActivity,
  openActivityForm,
  paginateActivities,
  postActivity,
  putActivity,
  refreshActivities,
  searchActivities,
  setActivitySchema,
  sortActivities
} = activityActions;

const adjustmentActions = generateExposedActions('adjustment', actions, dispatch);

const {
  clearAdjustmentFilters,
  clearAdjustmentsSort,
  closeAdjustmentForm,
  deleteAdjustment,
  filterAdjustments,
  getAdjustments,
  getAdjustment,
  selectAdjustment,
  openAdjustmentForm,
  paginateAdjustments,
  postAdjustment,
  putAdjustment,
  refreshAdjustments,
  searchAdjustments,
  setAdjustmentSchema,
  sortAdjustments
} = adjustmentActions;

const stakeholderActions = generateExposedActions('agency', actions, dispatch);

const {
  clearAgencyFilters,
  clearAgenciesSort,
  closeAgencyForm,
  deleteAgency,
  filterAgencies,
  getAgencies,
  getAgency,
  selectAgency,
  openAgencyForm,
  paginateAgencies,
  postAgency,
  putAgency,
  refreshAgencies,
  searchAgencies,
  setAgencySchema,
  sortAgencies
} = stakeholderActions;

const alertActions = generateExposedActions('alert', actions, dispatch);

const {
  clearAlertFilters,
  clearAlertsSort,
  closeAlertForm,
  deleteAlert,
  filterAlerts,
  getAlerts,
  getAlert,
  selectAlert,
  openAlertForm,
  paginateAlerts,
  postAlert,
  putAlert,
  refreshAlerts,
  searchAlerts,
  setAlertSchema,
  sortAlerts
} = alertActions;

const alertActions$1 = generateExposedActions('alertSource', actions, dispatch);

const {
  clearAlertSourceFilters,
  clearAlertSourcesSort,
  closeAlertSourceForm,
  deleteAlertSource,
  filterAlertSources,
  getAlertSources,
  getAlertSource,
  selectAlertSource,
  openAlertSourceForm,
  paginateAlertSources,
  postAlertSource,
  putAlertSource,
  refreshAlertSources,
  searchAlertSources,
  setAlertSourceSchema,
  sortAlertSources
} = alertActions$1;

const { getSchemas } = emisApiClient.httpActions;
/**
 * Action dispatched when application initialization starts
 *
 * @function
 * @name initializeAppStart
 *
 * @returns {Object} - Action object
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function initializeAppStart() {
  return { type: INITIALIZE_APP_START };
}

/**
 * Action dispatched when application initialization is successfully
 *
 * @function
 * @name initializeAppSuccess
 *
 *
 * @returns {Object} - action Object
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function initializeAppSuccess() {
  return { type: INITIALIZE_APP_SUCCESS };
}

/**
 * Action dispatched when an error occurs during application initialization
 *
 * @function
 * @name initializeAppFailure
 *
 * @param {Object} error - error happened during application initialization
 *
 * @returns {undefined} - Nothing is returned
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function initializeAppFailure(error) {
  return { type: INITIALIZE_APP_FAILURE, error };
}

/**
 * Action dispatched when application is started. It will load up all schema
 * need for in the application
 *
 * @function
 * @name initializeApp
 *
 * @returns {Function} - thunk function
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function initializeApp() {
  return dispatch => {
    dispatch(initializeAppStart());
    return getSchemas().then(schemas => {
      const {
        activity: { setActivitySchema },
        adjustment: { setAdjustmentSchema },
        agency: { setAgencySchema },
        alert: { setAlertSchema },
        alertSource: { setAlertSourceSchema },
        district: { setDistrictSchema },
        feature: { setFeatureSchema },
        focalPerson: { setFocalPersonSchema },
        indicator: { setIndicatorSchema },
        item: { setItemSchema },
        incidentType: { setIncidentTypeSchema },
        plan: { setPlanSchema },
        procedure: { setProcedureSchema },
        question: { setQuestionSchema },
        questionnaire: { setQuestionnaireSchema },
        region: { setRegionSchema },
        role: { setRoleSchema },
        stock: { setStockSchema },
        warehouse: { setWarehouseSchema }
      } = actions;

      const {
        Activity: activitySchema,
        Adjustment: adjustmentSchema,
        Agency: agencySchema,
        Alert: alertSchema,
        AlertSource: alertSourceSchema,
        District: districtSchema,
        Feature: featureSchema,
        FocalPerson: focalPersonSchema,
        IncidentType: incidentTypeSchema,
        Indicator: indicatorSchema,
        Item: itemSchema,
        Plan: planSchema,
        Procedure: procedureSchema,
        Question: questionSchema,
        Questionnaire: questionnaireSchema,
        Region: regionSchema,
        Role: roleSchema,
        Stock: stockSchema,
        Warehouse: warehouseSchema
      } = schemas;

      dispatch(setActivitySchema(activitySchema));
      dispatch(setAdjustmentSchema(adjustmentSchema));
      dispatch(setAgencySchema(agencySchema));
      dispatch(setAlertSchema(alertSchema));
      dispatch(setAlertSourceSchema(alertSourceSchema));
      dispatch(setDistrictSchema(districtSchema));
      dispatch(setFeatureSchema(featureSchema));
      dispatch(setFocalPersonSchema(focalPersonSchema));
      dispatch(setIndicatorSchema(indicatorSchema));
      dispatch(setIncidentTypeSchema(incidentTypeSchema));
      dispatch(setItemSchema(itemSchema));
      dispatch(setPlanSchema(planSchema));
      dispatch(setProcedureSchema(procedureSchema));
      dispatch(setQuestionSchema(questionSchema));
      dispatch(setQuestionnaireSchema(questionnaireSchema));
      dispatch(setRegionSchema(regionSchema));
      dispatch(setRoleSchema(roleSchema));
      dispatch(setStockSchema(stockSchema));
      dispatch(setWarehouseSchema(warehouseSchema));
      dispatch(initializeAppSuccess());
    }).catch(error => {
      dispatch(initializeAppFailure(error));
    });
  };
}

/**
 * Wrapped initialize app thunk
 *
 * @function
 * @name wrappedInitializeApp
 * @returns {Promise} - dispatched initialize app thunk
 *
 * @version 0.1.0
 * @since 0.3.2
 */
function wrappedInitializeApp() {
  return dispatch(initializeApp());
}

const assessmentActions = generateExposedActions('assessment', actions, dispatch);

const {
  clearAssessmentFilters,
  clearAssessmentsSort,
  closeAssessmentForm,
  deleteAssessment,
  filterAssessments,
  getAssessments,
  getAssessment,
  selectAssessment,
  openAssessmentForm,
  paginateAssessments,
  postAssessment,
  putAssessment,
  refreshAssessments,
  searchAssessments,
  setAssessmentSchema,
  sortAssessments
} = assessmentActions;

const featureActions = generateExposedActions('district', actions, dispatch);

const {
  clearDistrictFilters,
  clearDistrictsSort,
  closeDistrictForm,
  deleteDistrict,
  filterDistricts,
  getDistricts,
  getDistrict,
  selectDistrict,
  openDistrictForm,
  paginateDistricts,
  postDistrict,
  putDistrict,
  refreshDistricts,
  searchDistricts,
  setDistrictSchema,
  sortDistricts
} = featureActions;

const featureActions$1 = generateExposedActions('feature', actions, dispatch);

const {
  clearFeatureFilters,
  clearFeaturesSort,
  closeFeatureForm,
  deleteFeature,
  filterFeatures,
  getFeatures,
  getFeature,
  selectFeature,
  openFeatureForm,
  paginateFeatures,
  postFeature,
  putFeature,
  refreshFeatures,
  searchFeatures,
  setFeatureSchema,
  sortFeatures
} = featureActions$1;

const stakeholderActions$1 = generateExposedActions('focalPerson', actions, dispatch);

const {
  clearFocalPersonFilters,
  clearFocalPeopleSort,
  closeFocalPersonForm,
  deleteFocalPerson,
  filterFocalPeople,
  getFocalPeople,
  getFocalPerson,
  selectFocalPerson,
  openFocalPersonForm,
  paginateFocalPeople,
  postFocalPerson,
  putFocalPerson,
  refreshFocalPeople,
  searchFocalPeople,
  setFocalPersonSchema,
  sortFocalPeople
} = stakeholderActions$1;

const incidentActions = generateExposedActions('incident', actions, dispatch);

const {
  clearIncidentFilters,
  clearIncidentsSort,
  closeIncidentForm,
  deleteIncident,
  filterIncidents,
  getIncidents,
  getIncident,
  selectIncident,
  openIncidentForm,
  paginateIncidents,
  postIncident,
  putIncident,
  refreshIncidents,
  searchIncidents,
  setIncidentSchema,
  sortIncidents
} = incidentActions;

const incidentTypeActions = generateExposedActions('incidentType', actions, dispatch);

const {
  clearIncidentTypeFilters,
  clearIncidentTypesSort,
  closeIncidentTypeForm,
  deleteIncidentType,
  filterIncidentTypes,
  getIncidentTypes,
  getIncidentType,
  selectIncidentType,
  openIncidentTypeForm,
  paginateIncidentTypes,
  postIncidentType,
  putIncidentType,
  refreshIncidentTypes,
  searchIncidentTypes,
  setIncidentTypeSchema,
  sortIncidentTypes
} = incidentTypeActions;

const indicatorActions = generateExposedActions('indicator', actions, dispatch);

const {
  clearIndicatorFilters,
  clearIndicatorsSort,
  closeIndicatorForm,
  deleteIndicator,
  filterIndicators,
  getIndicators,
  getIndicator,
  selectIndicator,
  openIndicatorForm,
  paginateIndicators,
  postIndicator,
  putIndicator,
  refreshIndicators,
  searchIndicators,
  setIndicatorSchema,
  sortIndicators
} = indicatorActions;

const itemActions = generateExposedActions('item', actions, dispatch);

const {
  clearItemFilters,
  clearItemsSort,
  closeItemForm,
  deleteItem,
  filterItems,
  getItems,
  getItem,
  selectItem,
  openItemForm,
  paginateItems,
  postItem,
  putItem,
  refreshItems,
  searchItems,
  setItemSchema,
  sortItems
} = itemActions;

const itemUnitActions = generateExposedActions('itemUnit', actions, dispatch);

const {
  clearItemUnitFilters,
  clearItemUnitsSort,
  closeItemUnitForm,
  deleteItemUnit,
  filterItemUnits,
  getItemUnits,
  getItemUnit,
  selectItemUnit,
  openItemUnitForm,
  paginateItemUnits,
  postItemUnit,
  putItemUnit,
  refreshItemUnits,
  searchItemUnits,
  setItemUnitSchema,
  sortItemUnits
} = itemUnitActions;

const itemCategoryActions = generateExposedActions('itemCategory', actions, dispatch);

const {
  clearItemCategoryFilters,
  clearItemCategoriesSort,
  closeItemCategoryForm,
  deleteItemCategory,
  filterItemCategories,
  getItemCategories,
  getItemCategory,
  selectItemCategory,
  openItemCategoryForm,
  paginateItemCategories,
  postItemCategory,
  putItemCategory,
  refreshItemCategories,
  searchItemCategories,
  setItemCategorySchema,
  sortItemCategories
} = itemCategoryActions;

const planActions = generateExposedActions('plan', actions, dispatch);

const {
  clearPlanFilters,
  clearPlansSort,
  closePlanForm,
  deletePlan,
  filterPlans,
  getPlans,
  getPlan,
  selectPlan,
  openPlanForm,
  paginatePlans,
  postPlan,
  putPlan,
  refreshPlans,
  searchPlans,
  setPlanSchema,
  sortPlans
} = planActions;

const procedureActions = generateExposedActions('procedure', actions, dispatch);

const {
  clearProcedureFilters,
  clearProceduresSort,
  closeProcedureForm,
  deleteProcedure,
  filterProcedures,
  getProcedures,
  getProcedure,
  selectProcedure,
  openProcedureForm,
  paginateProcedures,
  postProcedure,
  putProcedure,
  refreshProcedures,
  searchProcedures,
  setProcedureSchema,
  sortProcedures
} = procedureActions;

const questionActions = generateExposedActions('question', actions, dispatch);

const {
  clearQuestionFilters,
  clearQuestionsSort,
  closeQuestionForm,
  deleteQuestion,
  filterQuestions,
  getQuestions,
  getQuestion,
  selectQuestion,
  openQuestionForm,
  paginateQuestions,
  postQuestion,
  putQuestion,
  refreshQuestions,
  searchQuestions,
  setQuestionSchema,
  sortQuestions
} = questionActions;

const questionnaireActions = generateExposedActions('questionnaire', actions, dispatch);

const {
  clearQuestionnaireFilters,
  clearQuestionnairesSort,
  closeQuestionnaireForm,
  deleteQuestionnaire,
  filterQuestionnaires,
  getQuestionnaires,
  getQuestionnaire,
  selectQuestionnaire,
  openQuestionnaireForm,
  paginateQuestionnaires,
  postQuestionnaire,
  putQuestionnaire,
  refreshQuestionnaires,
  searchQuestionnaires,
  setQuestionnaireSchema,
  sortQuestionnaires
} = questionnaireActions;

const featureActions$2 = generateExposedActions('region', actions, dispatch);

const {
  clearRegionFilters,
  clearRegionsSort,
  closeRegionForm,
  deleteRegion,
  filterRegions,
  getRegions,
  getRegion,
  selectRegion,
  openRegionForm,
  paginateRegions,
  postRegion,
  putRegion,
  refreshRegions,
  searchRegions,
  setRegionSchema,
  sortRegions
} = featureActions$2;

const resourceActions = generateExposedActions('resource', actions, dispatch);

const {
  clearResourceFilters,
  clearResourcesSort,
  closeResourceForm,
  deleteResource,
  filterResources,
  getResources,
  getResource,
  selectResource,
  openResourceForm,
  paginateResources,
  postResource,
  putResource,
  refreshResources,
  searchResources,
  setResourceSchema,
  sortResources
} = resourceActions;

const roleActions = generateExposedActions('role', actions, dispatch);

const {
  clearRoleFilters,
  clearRolesSort,
  closeRoleForm,
  deleteRole,
  filterRoles,
  getRoles,
  getRole,
  selectRole,
  openRoleForm,
  paginateRoles,
  postRole,
  putRole,
  refreshRoles,
  searchRoles,
  setRoleSchema,
  sortRoles
} = roleActions;

const stakeholderActions$2 = generateExposedActions('stock', actions, dispatch);

const {
  clearStockFilters,
  clearStocksSort,
  closeStockForm,
  deleteStock,
  filterStocks,
  getStocks,
  getStock,
  selectStock,
  openStockForm,
  paginateStocks,
  postStock,
  putStock,
  refreshStocks,
  searchStocks,
  setStockSchema,
  sortStocks
} = stakeholderActions$2;

const warehouseActions = generateExposedActions('warehouse', actions, dispatch);

const {
  clearWarehouseFilters,
  clearWarehousesSort,
  closeWarehouseForm,
  deleteWarehouse,
  filterWarehouses,
  getWarehouses,
  getWarehouse,
  selectWarehouse,
  openWarehouseForm,
  paginateWarehouses,
  postWarehouse,
  putWarehouse,
  refreshWarehouses,
  searchWarehouses,
  setWarehouseSchema,
  sortWarehouses
} = warehouseActions;

/**
 * @function
 * @name StoreProvider
 * @description Store Provider for EMIS store
 *
 * @param {Object} props react nodes
 * @param {Object} props.children react nodes
 * @returns {Object} Store provider
 * @version 0.1.0
 * @since 0.1.0
 * @example
 * import {StoreProvider} from '@codetanzania/emis-api-states';
 *
 * ReactDom.render(<StoreProvider><App /></StoreProvider>,
 * document.getElementById('root'));
 */
function StoreProvider({ children }) {
  return React.createElement(
    reactRedux.Provider,
    { store: store },
    children
  );
}

StoreProvider.propTypes = {
  children: PropTypes.node.isRequired
};

/**
 * @function
 * @name Connect
 * @description Expose simplified connect function
 *
 * This function subscribe component to the store and inject props
 * to the component
 *
 * @param {Object} component react node
 * @param {Object|Function} stateToProps states to inject into props
 * @returns {Object} React component which is injected with props
 *
 * @version 0.1.0
 * @since 0.1.0
 * @example
 * function AlertList({alerts}){
 *  return (
 *  ... jsx stuff
 * );
 * }
 *
 * export Connect(AlertList,{alerts:'alerts.list'})
 */
function Connect(component, stateToProps = null) {
  let mapStateToProps = stateToProps;

  if (!isFunction(stateToProps) && isObject(stateToProps)) {
    mapStateToProps = state => {
      const mappedState = {};

      forIn(stateToProps, (value, key) => {
        mappedState[key] = get(state, value);
      });

      return mappedState;
    };
  }

  return reactRedux.connect(mapStateToProps)(component);
}

exports.StoreProvider = StoreProvider;
exports.Connect = Connect;
exports.initializeApp = wrappedInitializeApp;
exports.clearActivityFilters = clearActivityFilters;
exports.clearActivitiesSort = clearActivitiesSort;
exports.closeActivityForm = closeActivityForm;
exports.deleteActivity = deleteActivity;
exports.filterActivities = filterActivities;
exports.getActivities = getActivities;
exports.getActivity = getActivity;
exports.selectActivity = selectActivity;
exports.openActivityForm = openActivityForm;
exports.paginateActivities = paginateActivities;
exports.postActivity = postActivity;
exports.putActivity = putActivity;
exports.refreshActivities = refreshActivities;
exports.searchActivities = searchActivities;
exports.setActivitySchema = setActivitySchema;
exports.sortActivities = sortActivities;
exports.clearAdjustmentFilters = clearAdjustmentFilters;
exports.clearAdjustmentsSort = clearAdjustmentsSort;
exports.closeAdjustmentForm = closeAdjustmentForm;
exports.deleteAdjustment = deleteAdjustment;
exports.filterAdjustments = filterAdjustments;
exports.getAdjustments = getAdjustments;
exports.getAdjustment = getAdjustment;
exports.selectAdjustment = selectAdjustment;
exports.openAdjustmentForm = openAdjustmentForm;
exports.paginateAdjustments = paginateAdjustments;
exports.postAdjustment = postAdjustment;
exports.putAdjustment = putAdjustment;
exports.refreshAdjustments = refreshAdjustments;
exports.searchAdjustments = searchAdjustments;
exports.setAdjustmentSchema = setAdjustmentSchema;
exports.sortAdjustments = sortAdjustments;
exports.clearAgencyFilters = clearAgencyFilters;
exports.clearAgenciesSort = clearAgenciesSort;
exports.closeAgencyForm = closeAgencyForm;
exports.deleteAgency = deleteAgency;
exports.filterAgencies = filterAgencies;
exports.getAgencies = getAgencies;
exports.getAgency = getAgency;
exports.selectAgency = selectAgency;
exports.openAgencyForm = openAgencyForm;
exports.paginateAgencies = paginateAgencies;
exports.postAgency = postAgency;
exports.putAgency = putAgency;
exports.refreshAgencies = refreshAgencies;
exports.searchAgencies = searchAgencies;
exports.setAgencySchema = setAgencySchema;
exports.sortAgencies = sortAgencies;
exports.clearAlertFilters = clearAlertFilters;
exports.clearAlertsSort = clearAlertsSort;
exports.closeAlertForm = closeAlertForm;
exports.deleteAlert = deleteAlert;
exports.filterAlerts = filterAlerts;
exports.getAlerts = getAlerts;
exports.getAlert = getAlert;
exports.selectAlert = selectAlert;
exports.openAlertForm = openAlertForm;
exports.paginateAlerts = paginateAlerts;
exports.postAlert = postAlert;
exports.putAlert = putAlert;
exports.refreshAlerts = refreshAlerts;
exports.searchAlerts = searchAlerts;
exports.setAlertSchema = setAlertSchema;
exports.sortAlerts = sortAlerts;
exports.clearAlertSourceFilters = clearAlertSourceFilters;
exports.clearAlertSourcesSort = clearAlertSourcesSort;
exports.closeAlertSourceForm = closeAlertSourceForm;
exports.deleteAlertSource = deleteAlertSource;
exports.filterAlertSources = filterAlertSources;
exports.getAlertSources = getAlertSources;
exports.getAlertSource = getAlertSource;
exports.selectAlertSource = selectAlertSource;
exports.openAlertSourceForm = openAlertSourceForm;
exports.paginateAlertSources = paginateAlertSources;
exports.postAlertSource = postAlertSource;
exports.putAlertSource = putAlertSource;
exports.refreshAlertSources = refreshAlertSources;
exports.searchAlertSources = searchAlertSources;
exports.setAlertSourceSchema = setAlertSourceSchema;
exports.sortAlertSources = sortAlertSources;
exports.clearAssessmentFilters = clearAssessmentFilters;
exports.clearAssessmentsSort = clearAssessmentsSort;
exports.closeAssessmentForm = closeAssessmentForm;
exports.deleteAssessment = deleteAssessment;
exports.filterAssessments = filterAssessments;
exports.getAssessments = getAssessments;
exports.getAssessment = getAssessment;
exports.selectAssessment = selectAssessment;
exports.openAssessmentForm = openAssessmentForm;
exports.paginateAssessments = paginateAssessments;
exports.postAssessment = postAssessment;
exports.putAssessment = putAssessment;
exports.refreshAssessments = refreshAssessments;
exports.searchAssessments = searchAssessments;
exports.setAssessmentSchema = setAssessmentSchema;
exports.sortAssessments = sortAssessments;
exports.clearDistrictFilters = clearDistrictFilters;
exports.clearDistrictsSort = clearDistrictsSort;
exports.closeDistrictForm = closeDistrictForm;
exports.deleteDistrict = deleteDistrict;
exports.filterDistricts = filterDistricts;
exports.getDistricts = getDistricts;
exports.getDistrict = getDistrict;
exports.selectDistrict = selectDistrict;
exports.openDistrictForm = openDistrictForm;
exports.paginateDistricts = paginateDistricts;
exports.postDistrict = postDistrict;
exports.putDistrict = putDistrict;
exports.refreshDistricts = refreshDistricts;
exports.searchDistricts = searchDistricts;
exports.setDistrictSchema = setDistrictSchema;
exports.sortDistricts = sortDistricts;
exports.clearFeatureFilters = clearFeatureFilters;
exports.clearFeaturesSort = clearFeaturesSort;
exports.closeFeatureForm = closeFeatureForm;
exports.deleteFeature = deleteFeature;
exports.filterFeatures = filterFeatures;
exports.getFeatures = getFeatures;
exports.getFeature = getFeature;
exports.selectFeature = selectFeature;
exports.openFeatureForm = openFeatureForm;
exports.paginateFeatures = paginateFeatures;
exports.postFeature = postFeature;
exports.putFeature = putFeature;
exports.refreshFeatures = refreshFeatures;
exports.searchFeatures = searchFeatures;
exports.setFeatureSchema = setFeatureSchema;
exports.sortFeatures = sortFeatures;
exports.clearFocalPersonFilters = clearFocalPersonFilters;
exports.clearFocalPeopleSort = clearFocalPeopleSort;
exports.closeFocalPersonForm = closeFocalPersonForm;
exports.deleteFocalPerson = deleteFocalPerson;
exports.filterFocalPeople = filterFocalPeople;
exports.getFocalPeople = getFocalPeople;
exports.getFocalPerson = getFocalPerson;
exports.selectFocalPerson = selectFocalPerson;
exports.openFocalPersonForm = openFocalPersonForm;
exports.paginateFocalPeople = paginateFocalPeople;
exports.postFocalPerson = postFocalPerson;
exports.putFocalPerson = putFocalPerson;
exports.refreshFocalPeople = refreshFocalPeople;
exports.searchFocalPeople = searchFocalPeople;
exports.setFocalPersonSchema = setFocalPersonSchema;
exports.sortFocalPeople = sortFocalPeople;
exports.clearIncidentFilters = clearIncidentFilters;
exports.clearIncidentsSort = clearIncidentsSort;
exports.closeIncidentForm = closeIncidentForm;
exports.deleteIncident = deleteIncident;
exports.filterIncidents = filterIncidents;
exports.getIncidents = getIncidents;
exports.getIncident = getIncident;
exports.selectIncident = selectIncident;
exports.openIncidentForm = openIncidentForm;
exports.paginateIncidents = paginateIncidents;
exports.postIncident = postIncident;
exports.putIncident = putIncident;
exports.refreshIncidents = refreshIncidents;
exports.searchIncidents = searchIncidents;
exports.setIncidentSchema = setIncidentSchema;
exports.sortIncidents = sortIncidents;
exports.clearIncidentTypeFilters = clearIncidentTypeFilters;
exports.clearIncidentTypesSort = clearIncidentTypesSort;
exports.closeIncidentTypeForm = closeIncidentTypeForm;
exports.deleteIncidentType = deleteIncidentType;
exports.filterIncidentTypes = filterIncidentTypes;
exports.getIncidentTypes = getIncidentTypes;
exports.getIncidentType = getIncidentType;
exports.selectIncidentType = selectIncidentType;
exports.openIncidentTypeForm = openIncidentTypeForm;
exports.paginateIncidentTypes = paginateIncidentTypes;
exports.postIncidentType = postIncidentType;
exports.putIncidentType = putIncidentType;
exports.refreshIncidentTypes = refreshIncidentTypes;
exports.searchIncidentTypes = searchIncidentTypes;
exports.setIncidentTypeSchema = setIncidentTypeSchema;
exports.sortIncidentTypes = sortIncidentTypes;
exports.clearIndicatorFilters = clearIndicatorFilters;
exports.clearIndicatorsSort = clearIndicatorsSort;
exports.closeIndicatorForm = closeIndicatorForm;
exports.deleteIndicator = deleteIndicator;
exports.filterIndicators = filterIndicators;
exports.getIndicators = getIndicators;
exports.getIndicator = getIndicator;
exports.selectIndicator = selectIndicator;
exports.openIndicatorForm = openIndicatorForm;
exports.paginateIndicators = paginateIndicators;
exports.postIndicator = postIndicator;
exports.putIndicator = putIndicator;
exports.refreshIndicators = refreshIndicators;
exports.searchIndicators = searchIndicators;
exports.setIndicatorSchema = setIndicatorSchema;
exports.sortIndicators = sortIndicators;
exports.clearItemFilters = clearItemFilters;
exports.clearItemsSort = clearItemsSort;
exports.closeItemForm = closeItemForm;
exports.deleteItem = deleteItem;
exports.filterItems = filterItems;
exports.getItems = getItems;
exports.getItem = getItem;
exports.selectItem = selectItem;
exports.openItemForm = openItemForm;
exports.paginateItems = paginateItems;
exports.postItem = postItem;
exports.putItem = putItem;
exports.refreshItems = refreshItems;
exports.searchItems = searchItems;
exports.setItemSchema = setItemSchema;
exports.sortItems = sortItems;
exports.clearItemUnitFilters = clearItemUnitFilters;
exports.clearItemUnitsSort = clearItemUnitsSort;
exports.closeItemUnitForm = closeItemUnitForm;
exports.deleteItemUnit = deleteItemUnit;
exports.filterItemUnits = filterItemUnits;
exports.getItemUnits = getItemUnits;
exports.getItemUnit = getItemUnit;
exports.selectItemUnit = selectItemUnit;
exports.openItemUnitForm = openItemUnitForm;
exports.paginateItemUnits = paginateItemUnits;
exports.postItemUnit = postItemUnit;
exports.putItemUnit = putItemUnit;
exports.refreshItemUnits = refreshItemUnits;
exports.searchItemUnits = searchItemUnits;
exports.setItemUnitSchema = setItemUnitSchema;
exports.sortItemUnits = sortItemUnits;
exports.clearItemCategoryFilters = clearItemCategoryFilters;
exports.clearItemCategoriesSort = clearItemCategoriesSort;
exports.closeItemCategoryForm = closeItemCategoryForm;
exports.deleteItemCategory = deleteItemCategory;
exports.filterItemCategories = filterItemCategories;
exports.getItemCategories = getItemCategories;
exports.getItemCategory = getItemCategory;
exports.selectItemCategory = selectItemCategory;
exports.openItemCategoryForm = openItemCategoryForm;
exports.paginateItemCategories = paginateItemCategories;
exports.postItemCategory = postItemCategory;
exports.putItemCategory = putItemCategory;
exports.refreshItemCategories = refreshItemCategories;
exports.searchItemCategories = searchItemCategories;
exports.setItemCategorySchema = setItemCategorySchema;
exports.sortItemCategories = sortItemCategories;
exports.clearPlanFilters = clearPlanFilters;
exports.clearPlansSort = clearPlansSort;
exports.closePlanForm = closePlanForm;
exports.deletePlan = deletePlan;
exports.filterPlans = filterPlans;
exports.getPlans = getPlans;
exports.getPlan = getPlan;
exports.selectPlan = selectPlan;
exports.openPlanForm = openPlanForm;
exports.paginatePlans = paginatePlans;
exports.postPlan = postPlan;
exports.putPlan = putPlan;
exports.refreshPlans = refreshPlans;
exports.searchPlans = searchPlans;
exports.setPlanSchema = setPlanSchema;
exports.sortPlans = sortPlans;
exports.clearProcedureFilters = clearProcedureFilters;
exports.clearProceduresSort = clearProceduresSort;
exports.closeProcedureForm = closeProcedureForm;
exports.deleteProcedure = deleteProcedure;
exports.filterProcedures = filterProcedures;
exports.getProcedures = getProcedures;
exports.getProcedure = getProcedure;
exports.selectProcedure = selectProcedure;
exports.openProcedureForm = openProcedureForm;
exports.paginateProcedures = paginateProcedures;
exports.postProcedure = postProcedure;
exports.putProcedure = putProcedure;
exports.refreshProcedures = refreshProcedures;
exports.searchProcedures = searchProcedures;
exports.setProcedureSchema = setProcedureSchema;
exports.sortProcedures = sortProcedures;
exports.clearQuestionFilters = clearQuestionFilters;
exports.clearQuestionsSort = clearQuestionsSort;
exports.closeQuestionForm = closeQuestionForm;
exports.deleteQuestion = deleteQuestion;
exports.filterQuestions = filterQuestions;
exports.getQuestions = getQuestions;
exports.getQuestion = getQuestion;
exports.selectQuestion = selectQuestion;
exports.openQuestionForm = openQuestionForm;
exports.paginateQuestions = paginateQuestions;
exports.postQuestion = postQuestion;
exports.putQuestion = putQuestion;
exports.refreshQuestions = refreshQuestions;
exports.searchQuestions = searchQuestions;
exports.setQuestionSchema = setQuestionSchema;
exports.sortQuestions = sortQuestions;
exports.clearQuestionnaireFilters = clearQuestionnaireFilters;
exports.clearQuestionnairesSort = clearQuestionnairesSort;
exports.closeQuestionnaireForm = closeQuestionnaireForm;
exports.deleteQuestionnaire = deleteQuestionnaire;
exports.filterQuestionnaires = filterQuestionnaires;
exports.getQuestionnaires = getQuestionnaires;
exports.getQuestionnaire = getQuestionnaire;
exports.selectQuestionnaire = selectQuestionnaire;
exports.openQuestionnaireForm = openQuestionnaireForm;
exports.paginateQuestionnaires = paginateQuestionnaires;
exports.postQuestionnaire = postQuestionnaire;
exports.putQuestionnaire = putQuestionnaire;
exports.refreshQuestionnaires = refreshQuestionnaires;
exports.searchQuestionnaires = searchQuestionnaires;
exports.setQuestionnaireSchema = setQuestionnaireSchema;
exports.sortQuestionnaires = sortQuestionnaires;
exports.clearRegionFilters = clearRegionFilters;
exports.clearRegionsSort = clearRegionsSort;
exports.closeRegionForm = closeRegionForm;
exports.deleteRegion = deleteRegion;
exports.filterRegions = filterRegions;
exports.getRegions = getRegions;
exports.getRegion = getRegion;
exports.selectRegion = selectRegion;
exports.openRegionForm = openRegionForm;
exports.paginateRegions = paginateRegions;
exports.postRegion = postRegion;
exports.putRegion = putRegion;
exports.refreshRegions = refreshRegions;
exports.searchRegions = searchRegions;
exports.setRegionSchema = setRegionSchema;
exports.sortRegions = sortRegions;
exports.clearResourceFilters = clearResourceFilters;
exports.clearResourcesSort = clearResourcesSort;
exports.closeResourceForm = closeResourceForm;
exports.deleteResource = deleteResource;
exports.filterResources = filterResources;
exports.getResources = getResources;
exports.getResource = getResource;
exports.selectResource = selectResource;
exports.openResourceForm = openResourceForm;
exports.paginateResources = paginateResources;
exports.postResource = postResource;
exports.putResource = putResource;
exports.refreshResources = refreshResources;
exports.searchResources = searchResources;
exports.setResourceSchema = setResourceSchema;
exports.sortResources = sortResources;
exports.clearRoleFilters = clearRoleFilters;
exports.clearRolesSort = clearRolesSort;
exports.closeRoleForm = closeRoleForm;
exports.deleteRole = deleteRole;
exports.filterRoles = filterRoles;
exports.getRoles = getRoles;
exports.getRole = getRole;
exports.selectRole = selectRole;
exports.openRoleForm = openRoleForm;
exports.paginateRoles = paginateRoles;
exports.postRole = postRole;
exports.putRole = putRole;
exports.refreshRoles = refreshRoles;
exports.searchRoles = searchRoles;
exports.setRoleSchema = setRoleSchema;
exports.sortRoles = sortRoles;
exports.clearStockFilters = clearStockFilters;
exports.clearStocksSort = clearStocksSort;
exports.closeStockForm = closeStockForm;
exports.deleteStock = deleteStock;
exports.filterStocks = filterStocks;
exports.getStocks = getStocks;
exports.getStock = getStock;
exports.selectStock = selectStock;
exports.openStockForm = openStockForm;
exports.paginateStocks = paginateStocks;
exports.postStock = postStock;
exports.putStock = putStock;
exports.refreshStocks = refreshStocks;
exports.searchStocks = searchStocks;
exports.setStockSchema = setStockSchema;
exports.sortStocks = sortStocks;
exports.clearWarehouseFilters = clearWarehouseFilters;
exports.clearWarehousesSort = clearWarehousesSort;
exports.closeWarehouseForm = closeWarehouseForm;
exports.deleteWarehouse = deleteWarehouse;
exports.filterWarehouses = filterWarehouses;
exports.getWarehouses = getWarehouses;
exports.getWarehouse = getWarehouse;
exports.selectWarehouse = selectWarehouse;
exports.openWarehouseForm = openWarehouseForm;
exports.paginateWarehouses = paginateWarehouses;
exports.postWarehouse = postWarehouse;
exports.putWarehouse = putWarehouse;
exports.refreshWarehouses = refreshWarehouses;
exports.searchWarehouses = searchWarehouses;
exports.setWarehouseSchema = setWarehouseSchema;
exports.sortWarehouses = sortWarehouses;
