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
var inflection = require('inflection');
var merge = _interopDefault(require('lodash/merge'));
var redux = require('redux');
var reduxStarterKit = require('redux-starter-kit');
var upperFirst = _interopDefault(require('lodash/upperFirst'));
var camelCase = _interopDefault(require('lodash/camelCase'));
var client = require('@codetanzania/emis-api-client');
var lowerFirst = _interopDefault(require('lodash/lowerFirst'));

/**
 * @function
 * @name camelize
 * @description Joins names and generate camelCase of joined words them
 *
 * @param {...string} words - list of words to join and camelize
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
 * @param {string} resourceName - Resource name
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
  }), defineProperty(_ref, camelize('clear', plural, 'filter'), function (state) {
    return Object.assign({}, state, { filter: null });
  }), defineProperty(_ref, camelize('sort', plural), function (state, action) {
    return Object.assign({}, state, { sort: action.payload });
  }), defineProperty(_ref, camelize('clear', plural, 'sort'), function (state) {
    return Object.assign({}, state, { sort: null });
  }), defineProperty(_ref, camelize('get', plural, 'Request'), function (state) {
    return Object.assign({}, state, { loading: true });
  }), defineProperty(_ref, camelize('get', plural, 'Success'), function (state, action) {
    return Object.assign({}, state, {
      list: [].concat(toConsumableArray(action.payload.data)),
      page: action.payload.page,
      total: action.payload.total,
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
    loading: false,
    posting: false,
    showForm: false,
    schema: null,
    filter: null,
    sort: null
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
function mapSliceReducers(resources, slices) {
  var reducers = {};

  // reducers
  resources.forEach(function (resource) {
    reducers[inflection.pluralize(resource)] = slices[resource].reducer;
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
function mapSliceActions(resources, slices) {
  var actions = {};

  resources.forEach(function (resource) {
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
function createResourcesSlices(resources) {
  var slices = {};

  // slices
  resources.forEach(function (resource) {
    slices[resource] = sliceFactory(resource);
  });

  return slices;
}

/**
 * App reducer for controlling application initialization state
 *
 * @function
 * @name app
 *
 * @param {Object} state - previous app state value
 * @param {Object} action - dispatched action object
 * @returns {Object} - updated app state
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
var resources = ['activity', 'adjustment', 'alert', 'assessment', 'feature', 'incident', 'incidentType', 'indicator', 'item', 'plan', 'procedure', 'question', 'questionnaire', 'resource', 'role', 'stakeholder', 'stock', 'warehouse'];

var slices = createResourcesSlices(resources);

var reducers = mapSliceReducers(resources, slices);
var allReducers = merge({}, reducers, { app: app });

var rootReducer = redux.combineReducers(allReducers);

var store = reduxStarterKit.configureStore({
  reducer: rootReducer,
  devTools: true
});

var actions = mapSliceActions(resources, slices, store.dispatch);

var dispatch = store.dispatch;

/**
 * @function
 * @name createThunkFor
 * @description Create and expose all common thunks for a resource.
 *
 * Custom thunk implementations can be added to the specific resource
 * actions module
 *
 * @param {string} resource - resource name
 * @returns {Object} thunks - resource thunks
 *
 * @version 0.2.0
 * @since 0.1.0
 */
function createThunksFor(resource) {
  var pluralName = upperFirst(inflection.pluralize(resource));
  var singularName = upperFirst(inflection.singularize(resource));
  var resourceName = lowerFirst(singularName);
  var storeKey = lowerFirst(pluralName);

  var thunks = {};

  thunks[camelize('get', pluralName)] = function (param) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName][camelize('get', pluralName, 'request')]());
      return client[camelize('get', pluralName)](param).then(function (data) {
        return dispatch$$1(actions[resourceName][camelize('get', pluralName, 'success')](data));
      }).catch(function (error) {
        return dispatch$$1(actions[resourceName][camelize('get', pluralName, 'failure')](error));
      });
    };
  };

  thunks[camelize('get', pluralName)] = function (param) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName][camelize('get', pluralName, 'request')]());
      return client[camelize('get', pluralName)](param).then(function (data) {
        return dispatch$$1(actions[resourceName][camelize('get', pluralName, 'success')](data));
      }).catch(function (error) {
        return dispatch$$1(actions[resourceName][camelize('get', pluralName, 'failure')](error));
      });
    };
  };

  thunks[camelize('get', pluralName)] = function (param) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName][camelize('get', pluralName, 'request')]());
      return client[camelize('get', pluralName)](param).then(function (data) {
        return dispatch$$1(actions[resourceName][camelize('get', pluralName, 'success')](data));
      }).catch(function (error) {
        return dispatch$$1(actions[resourceName][camelize('get', pluralName, 'failure')](error));
      });
    };
  };

  thunks[camelize('get', singularName)] = function (param) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName][camelize('get', singularName, 'request')]());
      return client[camelize('get', singularName)](param).then(function (data) {
        return dispatch$$1(actions[resourceName][camelize('get', singularName, 'success')](data));
      }).catch(function (error) {
        return dispatch$$1(actions[resourceName][camelize('get', singularName, 'failure')](error));
      });
    };
  };

  thunks[camelize('post', singularName)] = function (param, onSuccess, onError) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName][camelize('post', singularName, 'request')]());
      return client[camelize('post', singularName)](param).then(function (data) {
        dispatch$$1(actions[resourceName][camelize('post', singularName, 'success')](data));

        dispatch$$1(thunks[camelize('get', pluralName)]());

        // custom provided onSuccess callback
        if (isFunction(onSuccess)) {
          onSuccess();
        }
      }).catch(function (error) {
        dispatch$$1(actions[resourceName][camelize('post', singularName, 'failure')](error));

        // custom provided onError callback
        if (isFunction(onError)) {
          onError();
        }
      });
    };
  };

  thunks[camelize('put', singularName)] = function (param, onSuccess, onError) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName][camelize('put', singularName, 'request')]());
      return client[camelize('put', singularName)](param).then(function (data) {
        dispatch$$1(actions[resourceName][camelize('put', singularName, 'success')](data));

        dispatch$$1(thunks[camelize('get', pluralName)]());

        // custom provided onSuccess callback
        if (isFunction(onSuccess)) {
          onSuccess();
        }
      }).catch(function (error) {
        dispatch$$1(actions[resourceName][camelize('put', singularName, 'failure')](error));

        // custom provided onError callback
        if (isFunction(onError)) {
          onError();
        }
      });
    };
  };

  thunks[camelize('filter', pluralName)] = function (filter, onSuccess, onError) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName][camelize('filter', pluralName)](filter));
      dispatch$$1(actions[resourceName][camelize('get', pluralName, 'request')]());

      return client[camelize('get', pluralName)]({ filter: filter }).then(function (data) {
        dispatch$$1(actions[resourceName][camelize('get', pluralName, 'success')](data));

        // custom provided onSuccess callback
        if (isFunction(onSuccess)) {
          onSuccess();
        }
      }).catch(function (error) {
        dispatch$$1(actions[resourceName][camelize('get', pluralName, 'failure')](error));

        // custom provided onError callback
        if (isFunction(onError)) {
          onError();
        }
      });
    };
  };

  thunks[camelize('refresh', pluralName)] = function (onSuccess, onError) {
    return function (dispatch$$1, getState) {
      dispatch$$1(actions[resourceName][camelize('get', pluralName, 'request')]());

      var _getState$storeKey = getState()[storeKey],
          page = _getState$storeKey.page,
          filter = _getState$storeKey.filter;


      return client[camelize('get', pluralName)]({ page: page, filter: filter }).then(function (data) {
        dispatch$$1(actions[resourceName][camelize('get', pluralName, 'success')](data));

        // custom provided onSuccess callback
        if (isFunction(onSuccess)) {
          onSuccess();
        }
      }).catch(function (error) {
        dispatch$$1(actions[resourceName][camelize('get', pluralName, 'failure')](error));

        // custom provided onError callback
        if (isFunction(onError)) {
          onError();
        }
      });
    };
  };

  thunks[camelize('search', pluralName)] = function (query, onSuccess, onError) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName][camelize('get', pluralName, 'request')]());

      return client[camelize('get', pluralName)]({ q: query }).then(function (data) {
        dispatch$$1(actions[resourceName][camelize('get', pluralName, 'success')](data));

        // custom provided onSuccess callback
        if (isFunction(onSuccess)) {
          onSuccess();
        }
      }).catch(function (error) {
        dispatch$$1(actions[resourceName][camelize('get', pluralName, 'failure')](error));

        // custom provided onError callback
        if (isFunction(onError)) {
          onError();
        }
      });
    };
  };

  thunks[camelize('sort', pluralName)] = function (order, onSuccess, onError) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName][camelize('sort', pluralName)](order));
      dispatch$$1(actions[resourceName][camelize('get', pluralName, 'request')]());

      return client[camelize('get', pluralName)]({ sort: order }).then(function (data) {
        dispatch$$1(actions[resourceName][camelize('get', pluralName, 'success')](data));

        // custom provided onSuccess callback
        if (isFunction(onSuccess)) {
          onSuccess();
        }
      }).catch(function (error) {
        dispatch$$1(actions[resourceName][camelize('get', pluralName, 'failure')](error));

        // custom provided onError callback
        if (isFunction(onError)) {
          onError();
        }
      });
    };
  };

  thunks[camelize('paginate', pluralName)] = function (page, onSuccess, onError) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName][camelize('get', pluralName, 'request')]());

      return client[camelize('get', pluralName)]({ page: page }).then(function (data) {
        dispatch$$1(actions[resourceName][camelize('get', pluralName, 'success')](data));

        // custom provided onSuccess callback
        if (isFunction(onSuccess)) {
          onSuccess();
        }
      }).catch(function (error) {
        dispatch$$1(actions[resourceName][camelize('get', pluralName, 'failure')](error));

        // custom provided onError callback
        if (isFunction(onError)) {
          onError();
        }
      });
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
 * @param {string} resource - Resource Name
 * @param {Object} actions - Resources actions
 * @param {Function} dispatch - Store action dispatcher
 * @param {Object} thunks - Custom thunks to override/extends existing thunks
 * @returns {Object} wrapped resource actions with dispatching ability
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function generateExposedActions(resource, actions, dispatch) {
  var thunks = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var resourceName = inflection.singularize(upperFirst(resource));
  var pluralName = inflection.pluralize(upperFirst(resource));

  var generatedThunks = createThunksFor(resourceName);

  merge(generatedThunks, thunks);

  var extractedActions = {};

  extractedActions[camelize('select', resourceName)] = get(actions[resource], camelize('select', resourceName));

  extractedActions[camelize('open', resourceName, 'form')] = get(actions[resource], camelize('open', resourceName, 'form'));

  extractedActions[camelize('close', resourceName, 'form')] = get(actions[resource], camelize('close', resourceName, 'form'));

  extractedActions[camelize('set', resourceName, 'schema')] = get(actions[resource], camelize('set', resourceName, 'schema'));

  extractedActions[camelize('clear', pluralName, 'filter')] = get(actions[resource], camelize('clear', pluralName, 'filter'));

  extractedActions[camelize('clear', pluralName, 'sort')] = get(actions[resource], camelize('clear', pluralName, 'sort'));

  var allActions = merge({}, extractedActions, generatedThunks);

  var wrappedDispatchThunkActions = {};

  forIn(allActions, function (fn, key) {
    wrappedDispatchThunkActions[key] = function (param) {
      return dispatch(fn(param));
    };
  });

  return wrappedDispatchThunkActions;
}

var activityActions = generateExposedActions('activity', actions, dispatch);

var clearActivitiesFilter = activityActions.clearActivitiesFilter,
    clearActivitiesSort = activityActions.clearActivitiesSort,
    closeActivityForm = activityActions.closeActivityForm,
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

var clearAdjustmentsFilter = adjustmentActions.clearAdjustmentsFilter,
    clearAdjustmentsSort = adjustmentActions.clearAdjustmentsSort,
    closeAdjustmentForm = adjustmentActions.closeAdjustmentForm,
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

var alertActions = generateExposedActions('alert', actions, dispatch);

var clearAlertsFilter = alertActions.clearAlertsFilter,
    clearAlertsSort = alertActions.clearAlertsSort,
    closeAlertForm = alertActions.closeAlertForm,
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
  return function (dispatch$$1) {
    dispatch$$1(initializeAppStart());
    return client.getSchemas().then(function (schemas) {
      var setActivitySchema = actions.activity.setActivitySchema,
          setAdjustmentSchema = actions.adjustment.setAdjustmentSchema,
          setAlertSchema = actions.alert.setAlertSchema,
          setFeatureSchema = actions.feature.setFeatureSchema,
          setIndicatorSchema = actions.indicator.setIndicatorSchema,
          setItemSchema = actions.item.setItemSchema,
          setIncidentTypeSchema = actions.incidentType.setIncidentTypeSchema,
          setPlanSchema = actions.plan.setPlanSchema,
          setProcedureSchema = actions.procedure.setProcedureSchema,
          setQuestionSchema = actions.question.setQuestionSchema,
          setQuestionnaireSchema = actions.questionnaire.setQuestionnaireSchema,
          setRoleSchema = actions.role.setRoleSchema,
          setStakeholderSchema = actions.stakeholder.setStakeholderSchema,
          setStockSchema = actions.stock.setStockSchema;
      var activitySchema = schemas.Activity,
          adjustmentSchema = schemas.Adjustment,
          alertSchema = schemas.Alert,
          featureSchema = schemas.Feature,
          incidentTypeSchema = schemas.IncidentType,
          indicatorSchema = schemas.Indicator,
          itemSchema = schemas.Item,
          planSchema = schemas.Plan,
          procedureSchema = schemas.Procedure,
          questionSchema = schemas.Question,
          questionnaireSchema = schemas.Questionnaire,
          roleSchema = schemas.Role,
          stakeholderSchema = schemas.Party,
          stockSchema = schemas.Stock;


      dispatch$$1(setActivitySchema(activitySchema));
      dispatch$$1(setAdjustmentSchema(adjustmentSchema));
      dispatch$$1(setAlertSchema(alertSchema));
      dispatch$$1(setFeatureSchema(featureSchema));
      dispatch$$1(setIndicatorSchema(indicatorSchema));
      dispatch$$1(setIncidentTypeSchema(incidentTypeSchema));
      dispatch$$1(setItemSchema(itemSchema));
      dispatch$$1(setPlanSchema(planSchema));
      dispatch$$1(setProcedureSchema(procedureSchema));
      dispatch$$1(setQuestionSchema(questionSchema));
      dispatch$$1(setQuestionnaireSchema(questionnaireSchema));
      dispatch$$1(setRoleSchema(roleSchema));
      dispatch$$1(setStakeholderSchema(stakeholderSchema));
      dispatch$$1(setStockSchema(stockSchema));
      dispatch$$1(initializeAppSuccess());
    }).catch(function (error) {
      dispatch$$1(initializeAppFailure(error));
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

var clearAssessmentsFilter = assessmentActions.clearAssessmentsFilter,
    clearAssessmentsSort = assessmentActions.clearAssessmentsSort,
    closeAssessmentForm = assessmentActions.closeAssessmentForm,
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

var featureActions = generateExposedActions('feature', actions, dispatch);

var clearFeaturesFilter = featureActions.clearFeaturesFilter,
    clearFeaturesSort = featureActions.clearFeaturesSort,
    closeFeatureForm = featureActions.closeFeatureForm,
    filterFeatures = featureActions.filterFeatures,
    getFeatures = featureActions.getFeatures,
    getFeature = featureActions.getFeature,
    selectFeature = featureActions.selectFeature,
    openFeatureForm = featureActions.openFeatureForm,
    paginateFeatures = featureActions.paginateFeatures,
    postFeature = featureActions.postFeature,
    putFeature = featureActions.putFeature,
    refreshFeatures = featureActions.refreshFeatures,
    searchFeatures = featureActions.searchFeatures,
    setFeatureSchema = featureActions.setFeatureSchema,
    sortFeatures = featureActions.sortFeatures;

var incidentActions = generateExposedActions('incident', actions, dispatch);

var clearIncidentsFilter = incidentActions.clearIncidentsFilter,
    clearIncidentsSort = incidentActions.clearIncidentsSort,
    closeIncidentForm = incidentActions.closeIncidentForm,
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

var clearIncidentTypesFilter = incidentTypeActions.clearIncidentTypesFilter,
    clearIncidentTypesSort = incidentTypeActions.clearIncidentTypesSort,
    closeIncidentTypeForm = incidentTypeActions.closeIncidentTypeForm,
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

var clearIndicatorsFilter = indicatorActions.clearIndicatorsFilter,
    clearIndicatorsSort = indicatorActions.clearIndicatorsSort,
    closeIndicatorForm = indicatorActions.closeIndicatorForm,
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

var clearItemsFilter = itemActions.clearItemsFilter,
    clearItemsSort = itemActions.clearItemsSort,
    closeItemForm = itemActions.closeItemForm,
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

var planActions = generateExposedActions('plan', actions, dispatch);

var clearPlansFilter = planActions.clearPlansFilter,
    clearPlansSort = planActions.clearPlansSort,
    closePlanForm = planActions.closePlanForm,
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

var clearProceduresFilter = procedureActions.clearProceduresFilter,
    clearProceduresSort = procedureActions.clearProceduresSort,
    closeProcedureForm = procedureActions.closeProcedureForm,
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

var clearQuestionsFilter = questionActions.clearQuestionsFilter,
    clearQuestionsSort = questionActions.clearQuestionsSort,
    closeQuestionForm = questionActions.closeQuestionForm,
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

var clearQuestionnairesFilter = questionnaireActions.clearQuestionnairesFilter,
    clearQuestionnairesSort = questionnaireActions.clearQuestionnairesSort,
    closeQuestionnaireForm = questionnaireActions.closeQuestionnaireForm,
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

var resourceActions = generateExposedActions('resource', actions, dispatch);

var clearResourcesFilter = resourceActions.clearResourcesFilter,
    clearResourcesSort = resourceActions.clearResourcesSort,
    closeResourceForm = resourceActions.closeResourceForm,
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

var clearRolesFilter = roleActions.clearRolesFilter,
    clearRolesSort = roleActions.clearRolesSort,
    closeRoleForm = roleActions.closeRoleForm,
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

var stakeholderActions = generateExposedActions('stakeholder', actions, dispatch);

var clearStakeholdersFilter = stakeholderActions.clearStakeholdersFilter,
    clearStakeholdersSort = stakeholderActions.clearStakeholdersSort,
    closeStakeholderForm = stakeholderActions.closeStakeholderForm,
    filterStakeholders = stakeholderActions.filterStakeholders,
    getStakeholders = stakeholderActions.getStakeholders,
    getStakeholder = stakeholderActions.getStakeholder,
    selectStakeholder = stakeholderActions.selectStakeholder,
    openStakeholderForm = stakeholderActions.openStakeholderForm,
    paginateStakeholders = stakeholderActions.paginateStakeholders,
    postStakeholder = stakeholderActions.postStakeholder,
    putStakeholder = stakeholderActions.putStakeholder,
    refreshStakeholders = stakeholderActions.refreshStakeholders,
    searchStakeholders = stakeholderActions.searchStakeholders,
    setStakeholderSchema = stakeholderActions.setStakeholderSchema,
    sortStakeholders = stakeholderActions.sortStakeholders;

var stakeholderActions$1 = generateExposedActions('stock', actions, dispatch);

var clearStocksFilter = stakeholderActions$1.clearStocksFilter,
    clearStocksSort = stakeholderActions$1.clearStocksSort,
    closeStockForm = stakeholderActions$1.closeStockForm,
    filterStocks = stakeholderActions$1.filterStocks,
    getStocks = stakeholderActions$1.getStocks,
    getStock = stakeholderActions$1.getStock,
    selectStock = stakeholderActions$1.selectStock,
    openStockForm = stakeholderActions$1.openStockForm,
    paginateStocks = stakeholderActions$1.paginateStocks,
    postStock = stakeholderActions$1.postStock,
    putStock = stakeholderActions$1.putStock,
    refreshStocks = stakeholderActions$1.refreshStocks,
    searchStocks = stakeholderActions$1.searchStocks,
    setStockSchema = stakeholderActions$1.setStockSchema,
    sortStocks = stakeholderActions$1.sortStocks;

var warehouseActions = generateExposedActions('warehouse', actions, dispatch);

var clearWarehousesFilter = warehouseActions.clearWarehousesFilter,
    clearWarehousesSort = warehouseActions.clearWarehousesSort,
    closeWarehouseForm = warehouseActions.closeWarehouseForm,
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
 * @param {Object} props - react nodes
 * @param {Object} props.children - react nodes
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
 * @param {Object} component - react node
 * @param {Object|Function} stateToProps - states to inject into props
 * @returns {Object} - React component which is injected with props
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
exports.clearActivitiesFilter = clearActivitiesFilter;
exports.clearActivitiesSort = clearActivitiesSort;
exports.closeActivityForm = closeActivityForm;
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
exports.clearAdjustmentsFilter = clearAdjustmentsFilter;
exports.clearAdjustmentsSort = clearAdjustmentsSort;
exports.closeAdjustmentForm = closeAdjustmentForm;
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
exports.clearAlertsFilter = clearAlertsFilter;
exports.clearAlertsSort = clearAlertsSort;
exports.closeAlertForm = closeAlertForm;
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
exports.clearAssessmentsFilter = clearAssessmentsFilter;
exports.clearAssessmentsSort = clearAssessmentsSort;
exports.closeAssessmentForm = closeAssessmentForm;
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
exports.clearFeaturesFilter = clearFeaturesFilter;
exports.clearFeaturesSort = clearFeaturesSort;
exports.closeFeatureForm = closeFeatureForm;
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
exports.clearIncidentsFilter = clearIncidentsFilter;
exports.clearIncidentsSort = clearIncidentsSort;
exports.closeIncidentForm = closeIncidentForm;
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
exports.clearIncidentTypesFilter = clearIncidentTypesFilter;
exports.clearIncidentTypesSort = clearIncidentTypesSort;
exports.closeIncidentTypeForm = closeIncidentTypeForm;
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
exports.clearIndicatorsFilter = clearIndicatorsFilter;
exports.clearIndicatorsSort = clearIndicatorsSort;
exports.closeIndicatorForm = closeIndicatorForm;
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
exports.clearItemsFilter = clearItemsFilter;
exports.clearItemsSort = clearItemsSort;
exports.closeItemForm = closeItemForm;
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
exports.clearPlansFilter = clearPlansFilter;
exports.clearPlansSort = clearPlansSort;
exports.closePlanForm = closePlanForm;
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
exports.clearProceduresFilter = clearProceduresFilter;
exports.clearProceduresSort = clearProceduresSort;
exports.closeProcedureForm = closeProcedureForm;
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
exports.clearQuestionsFilter = clearQuestionsFilter;
exports.clearQuestionsSort = clearQuestionsSort;
exports.closeQuestionForm = closeQuestionForm;
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
exports.clearQuestionnairesFilter = clearQuestionnairesFilter;
exports.clearQuestionnairesSort = clearQuestionnairesSort;
exports.closeQuestionnaireForm = closeQuestionnaireForm;
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
exports.clearResourcesFilter = clearResourcesFilter;
exports.clearResourcesSort = clearResourcesSort;
exports.closeResourceForm = closeResourceForm;
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
exports.clearRolesFilter = clearRolesFilter;
exports.clearRolesSort = clearRolesSort;
exports.closeRoleForm = closeRoleForm;
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
exports.clearStakeholdersFilter = clearStakeholdersFilter;
exports.clearStakeholdersSort = clearStakeholdersSort;
exports.closeStakeholderForm = closeStakeholderForm;
exports.filterStakeholders = filterStakeholders;
exports.getStakeholders = getStakeholders;
exports.getStakeholder = getStakeholder;
exports.selectStakeholder = selectStakeholder;
exports.openStakeholderForm = openStakeholderForm;
exports.paginateStakeholders = paginateStakeholders;
exports.postStakeholder = postStakeholder;
exports.putStakeholder = putStakeholder;
exports.refreshStakeholders = refreshStakeholders;
exports.searchStakeholders = searchStakeholders;
exports.setStakeholderSchema = setStakeholderSchema;
exports.sortStakeholders = sortStakeholders;
exports.clearStocksFilter = clearStocksFilter;
exports.clearStocksSort = clearStocksSort;
exports.closeStockForm = closeStockForm;
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
exports.clearWarehousesFilter = clearWarehousesFilter;
exports.clearWarehousesSort = clearWarehousesSort;
exports.closeWarehouseForm = closeWarehouseForm;
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
