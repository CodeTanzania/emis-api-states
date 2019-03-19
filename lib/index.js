'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var forIn = _interopDefault(require('lodash/forIn'));
var get = _interopDefault(require('lodash/get'));
var isFunction = _interopDefault(require('lodash/isFunction'));
var isObject = _interopDefault(require('lodash/isObject'));
var PropTypes = _interopDefault(require('prop-types'));
var React = _interopDefault(require('react'));
var reactRedux = require('react-redux');
var merge = _interopDefault(require('lodash/merge'));
var redux = require('redux');
var reduxStarterKit = require('redux-starter-kit');
var inflection = require('inflection');
var upperFirst = _interopDefault(require('lodash/upperFirst'));
var camelCase = _interopDefault(require('lodash/camelCase'));
var emisApiClient = require('@codetanzania/emis-api-client');
var isEmpty = _interopDefault(require('lodash/isEmpty'));
var pick = _interopDefault(require('lodash/pick'));
var lowerFirst = _interopDefault(require('lodash/lowerFirst'));

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
function camelize() {
  for (var _len = arguments.length, words = Array(_len), _key = 0; _key < _len; _key++) {
    words[_key] = arguments[_key];
  }

  return camelCase([].concat(words).join(' '));
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
  var wrappedActions = {};

  forIn(actions, function (fn, key) {
    wrappedActions[key] = function () {
      return dispatch(fn.apply(undefined, arguments));
    };
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
  var reducers = {};

  // reducers
  resources.forEach(function (resource) {
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
  var actions = {};

  resources.forEach(function (resource) {
    actions[resource] = slices[resource].actions;
  });

  return actions;
}

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

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
  var _ref;

  var plural = upperFirst(inflection.pluralize(resourceName));
  var singular = upperFirst(inflection.singularize(resourceName));

  return _ref = {}, defineProperty(_ref, camelize('select', singular), function (state, action) {
    return Object.assign({}, state, { selected: action.payload });
  }), defineProperty(_ref, camelize('filter', plural), function (state, action) {
    return Object.assign({}, state, { filter: action.payload });
  }), defineProperty(_ref, camelize('sort', plural), function (state, action) {
    return Object.assign({}, state, { sort: action.payload });
  }), defineProperty(_ref, camelize('search', plural), function (state, action) {
    return Object.assign({}, state, { q: action.payload });
  }), defineProperty(_ref, camelize('clear', plural, 'filters'), function (state) {
    return Object.assign({}, state, { filters: null });
  }), defineProperty(_ref, camelize('clear', plural, 'sort'), function (state) {
    return Object.assign({}, state, { sort: null });
  }), defineProperty(_ref, camelize('get', plural, 'Request'), function (state) {
    return Object.assign({}, state, { loading: true });
  }), defineProperty(_ref, camelize('get', plural, 'Success'), function (state, action) {
    return Object.assign({}, state, {
      list: [].concat(toConsumableArray(action.payload.data)),
      page: action.payload.page,
      total: action.payload.total,
      size: action.payload.size,
      loading: false
    });
  }), defineProperty(_ref, camelize('get', plural, 'Failure'), function (state, action) {
    return Object.assign({}, state, { error: action.payload, loading: false });
  }), defineProperty(_ref, camelize('get', singular, 'Request'), function (state) {
    return Object.assign({}, state, { loading: true });
  }), defineProperty(_ref, camelize('get', singular, 'Success'), function (state) {
    return Object.assign({}, state, { loading: false });
  }), defineProperty(_ref, camelize('get', singular, 'Failure'), function (state, action) {
    return Object.assign({}, state, { loading: false, error: action.payload });
  }), defineProperty(_ref, camelize('post', singular, 'Request'), function (state) {
    return Object.assign({}, state, { posting: true });
  }), defineProperty(_ref, camelize('post', singular, 'Success'), function (state) {
    return Object.assign({}, state, { posting: false, showForm: false });
  }), defineProperty(_ref, camelize('post', singular, 'Failure'), function (state, action) {
    return Object.assign({}, state, { error: action.payload, posting: false });
  }), defineProperty(_ref, camelize('put', singular, 'Request'), function (state) {
    return Object.assign({}, state, { posting: true });
  }), defineProperty(_ref, camelize('put', singular, 'Success'), function (state) {
    return Object.assign({}, state, { posting: false, showForm: false });
  }), defineProperty(_ref, camelize('put', singular, 'Failure'), function (state, action) {
    return Object.assign({}, state, { posting: false, error: action.payload });
  }), defineProperty(_ref, camelize('delete', singular, 'Request'), function (state) {
    return Object.assign({}, state, { posting: true });
  }), defineProperty(_ref, camelize('delete', singular, 'Success'), function (state) {
    return Object.assign({}, state, { posting: false });
  }), defineProperty(_ref, camelize('delete', singular, 'Failure'), function (state, action) {
    return Object.assign({}, state, { posting: false, error: action.payload });
  }), defineProperty(_ref, camelize('open', singular, 'Form'), function (state) {
    return Object.assign({}, state, { showForm: true });
  }), defineProperty(_ref, camelize('close', singular, 'Form'), function (state) {
    return Object.assign({}, state, { showForm: false });
  }), defineProperty(_ref, camelize('set', singular, 'Schema'), function (state, action) {
    return Object.assign({}, state, { schema: action.payload });
  }), _ref;
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
function sliceFactory(sliceName) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var reducers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var defaultReducers = getDefaultReducers(sliceName);
  var initialDefaultState = getDefaultInitialState();

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
var INITIALIZE_APP_START = 'app/initialize';
var INITIALIZE_APP_SUCCESS = 'app/initializeSuccess';
var INITIALIZE_APP_FAILURE = 'app/initializeFailure';

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
  var slices = {};

  // slices
  resources.forEach(function (resource) {
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
function app() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { loading: false, error: null };
  var action = arguments[1];

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
var resources = ['activity', 'adjustment', 'agency', 'alert', 'alertSource', 'assessment', 'district', 'feature', 'incident', 'incidentType', 'indicator', 'item', 'itemCategory', 'itemUnit', 'plan', 'procedure', 'question', 'questionnaire', 'region', 'resource', 'role', 'focalPerson', 'stock', 'warehouse'];

var slices = createResourcesSlices(resources);

var reducers = merge({}, extractReducers(resources, slices), { app: app });

var rootReducer = redux.combineReducers(reducers);

var store = reduxStarterKit.configureStore({
  reducer: rootReducer,
  devTools: true
});

var actions = extractActions(resources, slices, store.dispatch);

var dispatch = store.dispatch;

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
  var pluralName = upperFirst(inflection.pluralize(resource));
  var singularName = upperFirst(inflection.singularize(resource));
  var resourceName = lowerFirst(singularName);
  var storeKey = lowerFirst(pluralName);

  var thunks = {};

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
  thunks[camelize('get', pluralName)] = function (param, onSuccess, onError) {
    return function (dispatch) {
      dispatch(actions[resourceName][camelize('get', pluralName, 'request')]());
      return emisApiClient.httpActions[camelize('get', pluralName)](param).then(function (data) {
        dispatch(actions[resourceName][camelize('get', pluralName, 'success')](data));

        // custom provided onSuccess callback
        if (isFunction(onSuccess)) {
          onSuccess();
        }
      }).catch(function (error) {
        dispatch(actions[resourceName][camelize('get', pluralName, 'failure')](error));

        // custom provided onError callback
        if (isFunction(onError)) {
          onError();
        }
      });
    };
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
  thunks[camelize('get', singularName)] = function (id, onSuccess, onError) {
    return function (dispatch) {
      dispatch(actions[resourceName][camelize('get', singularName, 'request')]());
      return emisApiClient.httpActions[camelize('get', singularName)](id).then(function (data) {
        dispatch(actions[resourceName][camelize('get', singularName, 'success')](data));

        // custom provided onSuccess callback
        if (isFunction(onSuccess)) {
          onSuccess();
        }
      }).catch(function (error) {
        dispatch(actions[resourceName][camelize('get', singularName, 'failure')](error));

        // custom provided onError callback
        if (isFunction(onError)) {
          onError();
        }
      });
    };
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
  thunks[camelize('post', singularName)] = function (param, onSuccess, onError) {
    return function (dispatch) {
      dispatch(actions[resourceName][camelize('post', singularName, 'request')]());
      return emisApiClient.httpActions[camelize('post', singularName)](param).then(function (data) {
        dispatch(actions[resourceName][camelize('post', singularName, 'success')](data));

        dispatch(actions[resourceName][camelize('clear', pluralName, 'filters')]());
        dispatch(actions[resourceName][camelize('clear', pluralName, 'sort')]());

        dispatch(actions[resourceName][camelize('search', pluralName)]());

        dispatch(thunks[camelize('get', pluralName)]());

        // custom provided onSuccess callback
        if (isFunction(onSuccess)) {
          onSuccess();
        }
      }).catch(function (error) {
        dispatch(actions[resourceName][camelize('post', singularName, 'failure')](error));

        // custom provided onError callback
        if (isFunction(onError)) {
          onError();
        }
      });
    };
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
  thunks[camelize('put', singularName)] = function (param, onSuccess, onError) {
    return function (dispatch) {
      dispatch(actions[resourceName][camelize('put', singularName, 'request')]());
      return emisApiClient.httpActions[camelize('put', singularName)](param).then(function (data) {
        dispatch(actions[resourceName][camelize('put', singularName, 'success')](data));

        dispatch(thunks[camelize('get', pluralName)]());

        // custom provided onSuccess callback
        if (isFunction(onSuccess)) {
          onSuccess();
        }
      }).catch(function (error) {
        dispatch(actions[resourceName][camelize('put', singularName, 'failure')](error));

        // custom provided onError callback
        if (isFunction(onError)) {
          onError();
        }
      });
    };
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
  thunks[camelize('delete', singularName)] = function (id, onSuccess, onError) {
    return function (dispatch, getState) {
      dispatch(actions[resourceName][camelize('delete', singularName, 'request')]());
      return emisApiClient.httpActions[camelize('delete', singularName)](id).then(function (data) {
        dispatch(actions[resourceName][camelize('delete', singularName, 'success')](data));

        var _getState$storeKey = getState()[storeKey],
            page = _getState$storeKey.page,
            filter = _getState$storeKey.filter;

        // custom provided onSuccess callback

        if (isFunction(onSuccess)) {
          onSuccess();
        }

        return dispatch(thunks[camelize('get', pluralName)]({ page: page, filter: filter }));
      }).catch(function (error) {
        dispatch(actions[resourceName][camelize('delete', singularName, 'failure')](error));

        // custom provided onError callback
        if (isFunction(onError)) {
          onError();
        }
      });
    };
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
  thunks[camelize('fetch', pluralName)] = function (onSuccess, onError) {
    return function (dispatch, getState) {
      var _getState$storeKey2 = getState()[storeKey],
          page = _getState$storeKey2.page,
          sort = _getState$storeKey2.sort,
          filter = _getState$storeKey2.filter,
          q = _getState$storeKey2.q;


      return dispatch(thunks[camelize('get', pluralName)]({ page: page, filter: filter, sort: sort, q: q }, onSuccess, onError));
    };
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
  thunks[camelize('filter', pluralName)] = function (filter, onSuccess, onError) {
    return function (dispatch) {
      dispatch(actions[resourceName][camelize('filter', pluralName)](filter));

      return dispatch(thunks[camelize('get', pluralName)]({ filter: filter }, onSuccess, onError));
    };
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
  thunks[camelize('refresh', pluralName)] = function (onSuccess, onError) {
    return function (dispatch, getState) {
      var _getState$storeKey3 = getState()[storeKey],
          page = _getState$storeKey3.page,
          filter = _getState$storeKey3.filter,
          q = _getState$storeKey3.q;


      return dispatch(thunks[camelize('get', pluralName)]({
        page: page,
        filter: filter,
        q: q
      }, onSuccess, onError));
    };
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
  thunks[camelize('search', pluralName)] = function (query, onSuccess, onError) {
    return function (dispatch, getState) {
      dispatch(actions[resourceName][camelize('search', pluralName)](query));

      var filter = getState()[storeKey].filter;


      return dispatch(thunks[camelize('get', pluralName)]({ q: query, filter: filter }, onSuccess, onError));
    };
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
  thunks[camelize('sort', pluralName)] = function (order, onSuccess, onError) {
    return function (dispatch, getState) {
      var page = getState()[storeKey].page;


      dispatch(actions[resourceName][camelize('sort', pluralName)](order));

      return dispatch(thunks[camelize('get', pluralName)]({ page: page, sort: order }, onSuccess, onError));
    };
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
  thunks[camelize('paginate', pluralName)] = function (page, onSuccess, onError) {
    return function (dispatch, getState) {
      var _getState$storeKey4 = getState()[storeKey],
          filter = _getState$storeKey4.filter,
          q = _getState$storeKey4.q;


      return dispatch(thunks[camelize('get', pluralName)]({ page: page, filter: filter, q: q }, onSuccess, onError));
    };
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
  thunks[camelize('clear', singularName, 'filters')] = function (onSuccess, onError) {
    var keep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    return function (dispatch, getState) {
      if (!isEmpty(keep)) {
        // keep specified filters
        var keptFilters = pick(getState()[storeKey].filter, keep);
        keptFilters = isEmpty(keptFilters) ? null : keptFilters;
        return dispatch(thunks[camelize('filter', pluralName)](keptFilters, onSuccess, onError));
      }

      // clear all filters
      return dispatch(thunks[camelize('filter', pluralName)](null, onSuccess, onError));
    };
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
  thunks[camelize('clear', pluralName, 'sort')] = function (onSuccess, onError) {
    return function (dispatch, getState) {
      var page = getState()[storeKey].page;


      dispatch(actions[resourceName][camelize('clear', pluralName, 'sort')]());

      return dispatch(thunks[camelize('get', pluralName)]({ page: page }, onSuccess, onError));
    };
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
function generateExposedActions(resource, actions, dispatch) {
  var thunks = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var resourceName = inflection.singularize(upperFirst(resource));

  var generatedThunks = createThunksFor(resourceName);

  merge(generatedThunks, thunks);

  var extractedActions = {};

  extractedActions[camelize('select', resourceName)] = get(actions[resource], camelize('select', resourceName));

  extractedActions[camelize('open', resourceName, 'form')] = get(actions[resource], camelize('open', resourceName, 'form'));

  extractedActions[camelize('close', resourceName, 'form')] = get(actions[resource], camelize('close', resourceName, 'form'));

  extractedActions[camelize('set', resourceName, 'schema')] = get(actions[resource], camelize('set', resourceName, 'schema'));

  var allActions = merge({}, extractedActions, generatedThunks);

  return wrapActionsWithDispatch(allActions, dispatch);
}

var activityActions = generateExposedActions('activity', actions, dispatch);

var clearActivityFilters = activityActions.clearActivityFilters,
    clearActivitiesSort = activityActions.clearActivitiesSort,
    closeActivityForm = activityActions.closeActivityForm,
    deleteActivity = activityActions.deleteActivity,
    filterActivities = activityActions.filterActivities,
    getActivities = activityActions.getActivities,
    getActivity = activityActions.getActivity,
    selectActivity = activityActions.selectActivity,
    openActivityForm = activityActions.openActivityForm,
    paginateActivities = activityActions.paginateActivities,
    postActivity = activityActions.postActivity,
    putActivity = activityActions.putActivity,
    refreshActivities = activityActions.refreshActivities,
    searchActivities = activityActions.searchActivities,
    setActivitySchema = activityActions.setActivitySchema,
    sortActivities = activityActions.sortActivities;

var adjustmentActions = generateExposedActions('adjustment', actions, dispatch);

var clearAdjustmentFilters = adjustmentActions.clearAdjustmentFilters,
    clearAdjustmentsSort = adjustmentActions.clearAdjustmentsSort,
    closeAdjustmentForm = adjustmentActions.closeAdjustmentForm,
    deleteAdjustment = adjustmentActions.deleteAdjustment,
    filterAdjustments = adjustmentActions.filterAdjustments,
    getAdjustments = adjustmentActions.getAdjustments,
    getAdjustment = adjustmentActions.getAdjustment,
    selectAdjustment = adjustmentActions.selectAdjustment,
    openAdjustmentForm = adjustmentActions.openAdjustmentForm,
    paginateAdjustments = adjustmentActions.paginateAdjustments,
    postAdjustment = adjustmentActions.postAdjustment,
    putAdjustment = adjustmentActions.putAdjustment,
    refreshAdjustments = adjustmentActions.refreshAdjustments,
    searchAdjustments = adjustmentActions.searchAdjustments,
    setAdjustmentSchema = adjustmentActions.setAdjustmentSchema,
    sortAdjustments = adjustmentActions.sortAdjustments;

var stakeholderActions = generateExposedActions('agency', actions, dispatch);

var clearAgencyFilters = stakeholderActions.clearAgencyFilters,
    clearAgenciesSort = stakeholderActions.clearAgenciesSort,
    closeAgencyForm = stakeholderActions.closeAgencyForm,
    deleteAgency = stakeholderActions.deleteAgency,
    filterAgencies = stakeholderActions.filterAgencies,
    getAgencies = stakeholderActions.getAgencies,
    getAgency = stakeholderActions.getAgency,
    selectAgency = stakeholderActions.selectAgency,
    openAgencyForm = stakeholderActions.openAgencyForm,
    paginateAgencies = stakeholderActions.paginateAgencies,
    postAgency = stakeholderActions.postAgency,
    putAgency = stakeholderActions.putAgency,
    refreshAgencies = stakeholderActions.refreshAgencies,
    searchAgencies = stakeholderActions.searchAgencies,
    setAgencySchema = stakeholderActions.setAgencySchema,
    sortAgencies = stakeholderActions.sortAgencies;

var alertActions = generateExposedActions('alert', actions, dispatch);

var clearAlertFilters = alertActions.clearAlertFilters,
    clearAlertsSort = alertActions.clearAlertsSort,
    closeAlertForm = alertActions.closeAlertForm,
    deleteAlert = alertActions.deleteAlert,
    filterAlerts = alertActions.filterAlerts,
    getAlerts = alertActions.getAlerts,
    getAlert = alertActions.getAlert,
    selectAlert = alertActions.selectAlert,
    openAlertForm = alertActions.openAlertForm,
    paginateAlerts = alertActions.paginateAlerts,
    postAlert = alertActions.postAlert,
    putAlert = alertActions.putAlert,
    refreshAlerts = alertActions.refreshAlerts,
    searchAlerts = alertActions.searchAlerts,
    setAlertSchema = alertActions.setAlertSchema,
    sortAlerts = alertActions.sortAlerts;

var alertActions$1 = generateExposedActions('alertSource', actions, dispatch);

var clearAlertSourceFilters = alertActions$1.clearAlertSourceFilters,
    clearAlertSourcesSort = alertActions$1.clearAlertSourcesSort,
    closeAlertSourceForm = alertActions$1.closeAlertSourceForm,
    deleteAlertSource = alertActions$1.deleteAlertSource,
    filterAlertSources = alertActions$1.filterAlertSources,
    getAlertSources = alertActions$1.getAlertSources,
    getAlertSource = alertActions$1.getAlertSource,
    selectAlertSource = alertActions$1.selectAlertSource,
    openAlertSourceForm = alertActions$1.openAlertSourceForm,
    paginateAlertSources = alertActions$1.paginateAlertSources,
    postAlertSource = alertActions$1.postAlertSource,
    putAlertSource = alertActions$1.putAlertSource,
    refreshAlertSources = alertActions$1.refreshAlertSources,
    searchAlertSources = alertActions$1.searchAlertSources,
    setAlertSourceSchema = alertActions$1.setAlertSourceSchema,
    sortAlertSources = alertActions$1.sortAlertSources;

var getSchemas = emisApiClient.httpActions.getSchemas;
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
  return { type: INITIALIZE_APP_FAILURE, error: error };
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
  return function (dispatch) {
    dispatch(initializeAppStart());
    return getSchemas().then(function (schemas) {
      var setActivitySchema = actions.activity.setActivitySchema,
          setAdjustmentSchema = actions.adjustment.setAdjustmentSchema,
          setAgencySchema = actions.agency.setAgencySchema,
          setAlertSchema = actions.alert.setAlertSchema,
          setAlertSourceSchema = actions.alertSource.setAlertSourceSchema,
          setDistrictSchema = actions.district.setDistrictSchema,
          setFeatureSchema = actions.feature.setFeatureSchema,
          setFocalPersonSchema = actions.focalPerson.setFocalPersonSchema,
          setIndicatorSchema = actions.indicator.setIndicatorSchema,
          setItemSchema = actions.item.setItemSchema,
          setIncidentTypeSchema = actions.incidentType.setIncidentTypeSchema,
          setPlanSchema = actions.plan.setPlanSchema,
          setProcedureSchema = actions.procedure.setProcedureSchema,
          setQuestionSchema = actions.question.setQuestionSchema,
          setQuestionnaireSchema = actions.questionnaire.setQuestionnaireSchema,
          setRegionSchema = actions.region.setRegionSchema,
          setRoleSchema = actions.role.setRoleSchema,
          setStockSchema = actions.stock.setStockSchema,
          setWarehouseSchema = actions.warehouse.setWarehouseSchema;
      var activitySchema = schemas.Activity,
          adjustmentSchema = schemas.Adjustment,
          agencySchema = schemas.Agency,
          alertSchema = schemas.Alert,
          alertSourceSchema = schemas.AlertSource,
          districtSchema = schemas.District,
          featureSchema = schemas.Feature,
          focalPersonSchema = schemas.FocalPerson,
          incidentTypeSchema = schemas.IncidentType,
          indicatorSchema = schemas.Indicator,
          itemSchema = schemas.Item,
          planSchema = schemas.Plan,
          procedureSchema = schemas.Procedure,
          questionSchema = schemas.Question,
          questionnaireSchema = schemas.Questionnaire,
          regionSchema = schemas.Region,
          roleSchema = schemas.Role,
          stockSchema = schemas.Stock,
          warehouseSchema = schemas.Warehouse;


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
    }).catch(function (error) {
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

var assessmentActions = generateExposedActions('assessment', actions, dispatch);

var clearAssessmentFilters = assessmentActions.clearAssessmentFilters,
    clearAssessmentsSort = assessmentActions.clearAssessmentsSort,
    closeAssessmentForm = assessmentActions.closeAssessmentForm,
    deleteAssessment = assessmentActions.deleteAssessment,
    filterAssessments = assessmentActions.filterAssessments,
    getAssessments = assessmentActions.getAssessments,
    getAssessment = assessmentActions.getAssessment,
    selectAssessment = assessmentActions.selectAssessment,
    openAssessmentForm = assessmentActions.openAssessmentForm,
    paginateAssessments = assessmentActions.paginateAssessments,
    postAssessment = assessmentActions.postAssessment,
    putAssessment = assessmentActions.putAssessment,
    refreshAssessments = assessmentActions.refreshAssessments,
    searchAssessments = assessmentActions.searchAssessments,
    setAssessmentSchema = assessmentActions.setAssessmentSchema,
    sortAssessments = assessmentActions.sortAssessments;

var featureActions = generateExposedActions('district', actions, dispatch);

var clearDistrictFilters = featureActions.clearDistrictFilters,
    clearDistrictsSort = featureActions.clearDistrictsSort,
    closeDistrictForm = featureActions.closeDistrictForm,
    deleteDistrict = featureActions.deleteDistrict,
    filterDistricts = featureActions.filterDistricts,
    getDistricts = featureActions.getDistricts,
    getDistrict = featureActions.getDistrict,
    selectDistrict = featureActions.selectDistrict,
    openDistrictForm = featureActions.openDistrictForm,
    paginateDistricts = featureActions.paginateDistricts,
    postDistrict = featureActions.postDistrict,
    putDistrict = featureActions.putDistrict,
    refreshDistricts = featureActions.refreshDistricts,
    searchDistricts = featureActions.searchDistricts,
    setDistrictSchema = featureActions.setDistrictSchema,
    sortDistricts = featureActions.sortDistricts;

var featureActions$1 = generateExposedActions('feature', actions, dispatch);

var clearFeatureFilters = featureActions$1.clearFeatureFilters,
    clearFeaturesSort = featureActions$1.clearFeaturesSort,
    closeFeatureForm = featureActions$1.closeFeatureForm,
    deleteFeature = featureActions$1.deleteFeature,
    filterFeatures = featureActions$1.filterFeatures,
    getFeatures = featureActions$1.getFeatures,
    getFeature = featureActions$1.getFeature,
    selectFeature = featureActions$1.selectFeature,
    openFeatureForm = featureActions$1.openFeatureForm,
    paginateFeatures = featureActions$1.paginateFeatures,
    postFeature = featureActions$1.postFeature,
    putFeature = featureActions$1.putFeature,
    refreshFeatures = featureActions$1.refreshFeatures,
    searchFeatures = featureActions$1.searchFeatures,
    setFeatureSchema = featureActions$1.setFeatureSchema,
    sortFeatures = featureActions$1.sortFeatures;

var stakeholderActions$1 = generateExposedActions('focalPerson', actions, dispatch);

var clearFocalPersonFilters = stakeholderActions$1.clearFocalPersonFilters,
    clearFocalPeopleSort = stakeholderActions$1.clearFocalPeopleSort,
    closeFocalPersonForm = stakeholderActions$1.closeFocalPersonForm,
    deleteFocalPerson = stakeholderActions$1.deleteFocalPerson,
    filterFocalPeople = stakeholderActions$1.filterFocalPeople,
    getFocalPeople = stakeholderActions$1.getFocalPeople,
    getFocalPerson = stakeholderActions$1.getFocalPerson,
    selectFocalPerson = stakeholderActions$1.selectFocalPerson,
    openFocalPersonForm = stakeholderActions$1.openFocalPersonForm,
    paginateFocalPeople = stakeholderActions$1.paginateFocalPeople,
    postFocalPerson = stakeholderActions$1.postFocalPerson,
    putFocalPerson = stakeholderActions$1.putFocalPerson,
    refreshFocalPeople = stakeholderActions$1.refreshFocalPeople,
    searchFocalPeople = stakeholderActions$1.searchFocalPeople,
    setFocalPersonSchema = stakeholderActions$1.setFocalPersonSchema,
    sortFocalPeople = stakeholderActions$1.sortFocalPeople;

var incidentActions = generateExposedActions('incident', actions, dispatch);

var clearIncidentFilters = incidentActions.clearIncidentFilters,
    clearIncidentsSort = incidentActions.clearIncidentsSort,
    closeIncidentForm = incidentActions.closeIncidentForm,
    deleteIncident = incidentActions.deleteIncident,
    filterIncidents = incidentActions.filterIncidents,
    getIncidents = incidentActions.getIncidents,
    getIncident = incidentActions.getIncident,
    selectIncident = incidentActions.selectIncident,
    openIncidentForm = incidentActions.openIncidentForm,
    paginateIncidents = incidentActions.paginateIncidents,
    postIncident = incidentActions.postIncident,
    putIncident = incidentActions.putIncident,
    refreshIncidents = incidentActions.refreshIncidents,
    searchIncidents = incidentActions.searchIncidents,
    setIncidentSchema = incidentActions.setIncidentSchema,
    sortIncidents = incidentActions.sortIncidents;

var incidentTypeActions = generateExposedActions('incidentType', actions, dispatch);

var clearIncidentTypeFilters = incidentTypeActions.clearIncidentTypeFilters,
    clearIncidentTypesSort = incidentTypeActions.clearIncidentTypesSort,
    closeIncidentTypeForm = incidentTypeActions.closeIncidentTypeForm,
    deleteIncidentType = incidentTypeActions.deleteIncidentType,
    filterIncidentTypes = incidentTypeActions.filterIncidentTypes,
    getIncidentTypes = incidentTypeActions.getIncidentTypes,
    getIncidentType = incidentTypeActions.getIncidentType,
    selectIncidentType = incidentTypeActions.selectIncidentType,
    openIncidentTypeForm = incidentTypeActions.openIncidentTypeForm,
    paginateIncidentTypes = incidentTypeActions.paginateIncidentTypes,
    postIncidentType = incidentTypeActions.postIncidentType,
    putIncidentType = incidentTypeActions.putIncidentType,
    refreshIncidentTypes = incidentTypeActions.refreshIncidentTypes,
    searchIncidentTypes = incidentTypeActions.searchIncidentTypes,
    setIncidentTypeSchema = incidentTypeActions.setIncidentTypeSchema,
    sortIncidentTypes = incidentTypeActions.sortIncidentTypes;

var indicatorActions = generateExposedActions('indicator', actions, dispatch);

var clearIndicatorFilters = indicatorActions.clearIndicatorFilters,
    clearIndicatorsSort = indicatorActions.clearIndicatorsSort,
    closeIndicatorForm = indicatorActions.closeIndicatorForm,
    deleteIndicator = indicatorActions.deleteIndicator,
    filterIndicators = indicatorActions.filterIndicators,
    getIndicators = indicatorActions.getIndicators,
    getIndicator = indicatorActions.getIndicator,
    selectIndicator = indicatorActions.selectIndicator,
    openIndicatorForm = indicatorActions.openIndicatorForm,
    paginateIndicators = indicatorActions.paginateIndicators,
    postIndicator = indicatorActions.postIndicator,
    putIndicator = indicatorActions.putIndicator,
    refreshIndicators = indicatorActions.refreshIndicators,
    searchIndicators = indicatorActions.searchIndicators,
    setIndicatorSchema = indicatorActions.setIndicatorSchema,
    sortIndicators = indicatorActions.sortIndicators;

var itemActions = generateExposedActions('item', actions, dispatch);

var clearItemFilters = itemActions.clearItemFilters,
    clearItemsSort = itemActions.clearItemsSort,
    closeItemForm = itemActions.closeItemForm,
    deleteItem = itemActions.deleteItem,
    filterItems = itemActions.filterItems,
    getItems = itemActions.getItems,
    getItem = itemActions.getItem,
    selectItem = itemActions.selectItem,
    openItemForm = itemActions.openItemForm,
    paginateItems = itemActions.paginateItems,
    postItem = itemActions.postItem,
    putItem = itemActions.putItem,
    refreshItems = itemActions.refreshItems,
    searchItems = itemActions.searchItems,
    setItemSchema = itemActions.setItemSchema,
    sortItems = itemActions.sortItems;

var itemUnitActions = generateExposedActions('itemUnit', actions, dispatch);

var clearItemUnitFilters = itemUnitActions.clearItemUnitFilters,
    clearItemUnitsSort = itemUnitActions.clearItemUnitsSort,
    closeItemUnitForm = itemUnitActions.closeItemUnitForm,
    deleteItemUnit = itemUnitActions.deleteItemUnit,
    filterItemUnits = itemUnitActions.filterItemUnits,
    getItemUnits = itemUnitActions.getItemUnits,
    getItemUnit = itemUnitActions.getItemUnit,
    selectItemUnit = itemUnitActions.selectItemUnit,
    openItemUnitForm = itemUnitActions.openItemUnitForm,
    paginateItemUnits = itemUnitActions.paginateItemUnits,
    postItemUnit = itemUnitActions.postItemUnit,
    putItemUnit = itemUnitActions.putItemUnit,
    refreshItemUnits = itemUnitActions.refreshItemUnits,
    searchItemUnits = itemUnitActions.searchItemUnits,
    setItemUnitSchema = itemUnitActions.setItemUnitSchema,
    sortItemUnits = itemUnitActions.sortItemUnits;

var itemCategoryActions = generateExposedActions('itemCategory', actions, dispatch);

var clearItemCategoryFilters = itemCategoryActions.clearItemCategoryFilters,
    clearItemCategoriesSort = itemCategoryActions.clearItemCategoriesSort,
    closeItemCategoryForm = itemCategoryActions.closeItemCategoryForm,
    deleteItemCategory = itemCategoryActions.deleteItemCategory,
    filterItemCategories = itemCategoryActions.filterItemCategories,
    getItemCategories = itemCategoryActions.getItemCategories,
    getItemCategory = itemCategoryActions.getItemCategory,
    selectItemCategory = itemCategoryActions.selectItemCategory,
    openItemCategoryForm = itemCategoryActions.openItemCategoryForm,
    paginateItemCategories = itemCategoryActions.paginateItemCategories,
    postItemCategory = itemCategoryActions.postItemCategory,
    putItemCategory = itemCategoryActions.putItemCategory,
    refreshItemCategories = itemCategoryActions.refreshItemCategories,
    searchItemCategories = itemCategoryActions.searchItemCategories,
    setItemCategorySchema = itemCategoryActions.setItemCategorySchema,
    sortItemCategories = itemCategoryActions.sortItemCategories;

var planActions = generateExposedActions('plan', actions, dispatch);

var clearPlanFilters = planActions.clearPlanFilters,
    clearPlansSort = planActions.clearPlansSort,
    closePlanForm = planActions.closePlanForm,
    deletePlan = planActions.deletePlan,
    filterPlans = planActions.filterPlans,
    getPlans = planActions.getPlans,
    getPlan = planActions.getPlan,
    selectPlan = planActions.selectPlan,
    openPlanForm = planActions.openPlanForm,
    paginatePlans = planActions.paginatePlans,
    postPlan = planActions.postPlan,
    putPlan = planActions.putPlan,
    refreshPlans = planActions.refreshPlans,
    searchPlans = planActions.searchPlans,
    setPlanSchema = planActions.setPlanSchema,
    sortPlans = planActions.sortPlans;

var procedureActions = generateExposedActions('procedure', actions, dispatch);

var clearProcedureFilters = procedureActions.clearProcedureFilters,
    clearProceduresSort = procedureActions.clearProceduresSort,
    closeProcedureForm = procedureActions.closeProcedureForm,
    deleteProcedure = procedureActions.deleteProcedure,
    filterProcedures = procedureActions.filterProcedures,
    getProcedures = procedureActions.getProcedures,
    getProcedure = procedureActions.getProcedure,
    selectProcedure = procedureActions.selectProcedure,
    openProcedureForm = procedureActions.openProcedureForm,
    paginateProcedures = procedureActions.paginateProcedures,
    postProcedure = procedureActions.postProcedure,
    putProcedure = procedureActions.putProcedure,
    refreshProcedures = procedureActions.refreshProcedures,
    searchProcedures = procedureActions.searchProcedures,
    setProcedureSchema = procedureActions.setProcedureSchema,
    sortProcedures = procedureActions.sortProcedures;

var questionActions = generateExposedActions('question', actions, dispatch);

var clearQuestionFilters = questionActions.clearQuestionFilters,
    clearQuestionsSort = questionActions.clearQuestionsSort,
    closeQuestionForm = questionActions.closeQuestionForm,
    deleteQuestion = questionActions.deleteQuestion,
    filterQuestions = questionActions.filterQuestions,
    getQuestions = questionActions.getQuestions,
    getQuestion = questionActions.getQuestion,
    selectQuestion = questionActions.selectQuestion,
    openQuestionForm = questionActions.openQuestionForm,
    paginateQuestions = questionActions.paginateQuestions,
    postQuestion = questionActions.postQuestion,
    putQuestion = questionActions.putQuestion,
    refreshQuestions = questionActions.refreshQuestions,
    searchQuestions = questionActions.searchQuestions,
    setQuestionSchema = questionActions.setQuestionSchema,
    sortQuestions = questionActions.sortQuestions;

var questionnaireActions = generateExposedActions('questionnaire', actions, dispatch);

var clearQuestionnaireFilters = questionnaireActions.clearQuestionnaireFilters,
    clearQuestionnairesSort = questionnaireActions.clearQuestionnairesSort,
    closeQuestionnaireForm = questionnaireActions.closeQuestionnaireForm,
    deleteQuestionnaire = questionnaireActions.deleteQuestionnaire,
    filterQuestionnaires = questionnaireActions.filterQuestionnaires,
    getQuestionnaires = questionnaireActions.getQuestionnaires,
    getQuestionnaire = questionnaireActions.getQuestionnaire,
    selectQuestionnaire = questionnaireActions.selectQuestionnaire,
    openQuestionnaireForm = questionnaireActions.openQuestionnaireForm,
    paginateQuestionnaires = questionnaireActions.paginateQuestionnaires,
    postQuestionnaire = questionnaireActions.postQuestionnaire,
    putQuestionnaire = questionnaireActions.putQuestionnaire,
    refreshQuestionnaires = questionnaireActions.refreshQuestionnaires,
    searchQuestionnaires = questionnaireActions.searchQuestionnaires,
    setQuestionnaireSchema = questionnaireActions.setQuestionnaireSchema,
    sortQuestionnaires = questionnaireActions.sortQuestionnaires;

var featureActions$2 = generateExposedActions('region', actions, dispatch);

var clearRegionFilters = featureActions$2.clearRegionFilters,
    clearRegionsSort = featureActions$2.clearRegionsSort,
    closeRegionForm = featureActions$2.closeRegionForm,
    deleteRegion = featureActions$2.deleteRegion,
    filterRegions = featureActions$2.filterRegions,
    getRegions = featureActions$2.getRegions,
    getRegion = featureActions$2.getRegion,
    selectRegion = featureActions$2.selectRegion,
    openRegionForm = featureActions$2.openRegionForm,
    paginateRegions = featureActions$2.paginateRegions,
    postRegion = featureActions$2.postRegion,
    putRegion = featureActions$2.putRegion,
    refreshRegions = featureActions$2.refreshRegions,
    searchRegions = featureActions$2.searchRegions,
    setRegionSchema = featureActions$2.setRegionSchema,
    sortRegions = featureActions$2.sortRegions;

var resourceActions = generateExposedActions('resource', actions, dispatch);

var clearResourceFilters = resourceActions.clearResourceFilters,
    clearResourcesSort = resourceActions.clearResourcesSort,
    closeResourceForm = resourceActions.closeResourceForm,
    deleteResource = resourceActions.deleteResource,
    filterResources = resourceActions.filterResources,
    getResources = resourceActions.getResources,
    getResource = resourceActions.getResource,
    selectResource = resourceActions.selectResource,
    openResourceForm = resourceActions.openResourceForm,
    paginateResources = resourceActions.paginateResources,
    postResource = resourceActions.postResource,
    putResource = resourceActions.putResource,
    refreshResources = resourceActions.refreshResources,
    searchResources = resourceActions.searchResources,
    setResourceSchema = resourceActions.setResourceSchema,
    sortResources = resourceActions.sortResources;

var roleActions = generateExposedActions('role', actions, dispatch);

var clearRoleFilters = roleActions.clearRoleFilters,
    clearRolesSort = roleActions.clearRolesSort,
    closeRoleForm = roleActions.closeRoleForm,
    deleteRole = roleActions.deleteRole,
    filterRoles = roleActions.filterRoles,
    getRoles = roleActions.getRoles,
    getRole = roleActions.getRole,
    selectRole = roleActions.selectRole,
    openRoleForm = roleActions.openRoleForm,
    paginateRoles = roleActions.paginateRoles,
    postRole = roleActions.postRole,
    putRole = roleActions.putRole,
    refreshRoles = roleActions.refreshRoles,
    searchRoles = roleActions.searchRoles,
    setRoleSchema = roleActions.setRoleSchema,
    sortRoles = roleActions.sortRoles;

var stakeholderActions$2 = generateExposedActions('stock', actions, dispatch);

var clearStockFilters = stakeholderActions$2.clearStockFilters,
    clearStocksSort = stakeholderActions$2.clearStocksSort,
    closeStockForm = stakeholderActions$2.closeStockForm,
    deleteStock = stakeholderActions$2.deleteStock,
    filterStocks = stakeholderActions$2.filterStocks,
    getStocks = stakeholderActions$2.getStocks,
    getStock = stakeholderActions$2.getStock,
    selectStock = stakeholderActions$2.selectStock,
    openStockForm = stakeholderActions$2.openStockForm,
    paginateStocks = stakeholderActions$2.paginateStocks,
    postStock = stakeholderActions$2.postStock,
    putStock = stakeholderActions$2.putStock,
    refreshStocks = stakeholderActions$2.refreshStocks,
    searchStocks = stakeholderActions$2.searchStocks,
    setStockSchema = stakeholderActions$2.setStockSchema,
    sortStocks = stakeholderActions$2.sortStocks;

var warehouseActions = generateExposedActions('warehouse', actions, dispatch);

var clearWarehouseFilters = warehouseActions.clearWarehouseFilters,
    clearWarehousesSort = warehouseActions.clearWarehousesSort,
    closeWarehouseForm = warehouseActions.closeWarehouseForm,
    deleteWarehouse = warehouseActions.deleteWarehouse,
    filterWarehouses = warehouseActions.filterWarehouses,
    getWarehouses = warehouseActions.getWarehouses,
    getWarehouse = warehouseActions.getWarehouse,
    selectWarehouse = warehouseActions.selectWarehouse,
    openWarehouseForm = warehouseActions.openWarehouseForm,
    paginateWarehouses = warehouseActions.paginateWarehouses,
    postWarehouse = warehouseActions.postWarehouse,
    putWarehouse = warehouseActions.putWarehouse,
    refreshWarehouses = warehouseActions.refreshWarehouses,
    searchWarehouses = warehouseActions.searchWarehouses,
    setWarehouseSchema = warehouseActions.setWarehouseSchema,
    sortWarehouses = warehouseActions.sortWarehouses;

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
function StoreProvider(_ref) {
  var children = _ref.children;

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
function Connect(component) {
  var stateToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var mapStateToProps = stateToProps;

  if (!isFunction(stateToProps) && isObject(stateToProps)) {
    mapStateToProps = function mapStateToProps(state) {
      var mappedState = {};

      forIn(stateToProps, function (value, key) {
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
