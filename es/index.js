import forIn from 'lodash/forIn';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import React from 'react';
import { Provider } from 'react-redux';
import { pluralize, singularize } from 'inflection';
import { combineReducers } from 'redux';
import { createSlice, configureStore } from 'redux-starter-kit';
import upperFirst from 'lodash/upperFirst';
import merge from 'lodash/merge';
import * as Client from '@codetanzania/emis-api-client';
import toLower from 'lodash/toLower';

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
function getDefaultReducers(resourceName) {
  var _ref;

  var plural = upperFirst(pluralize(resourceName));
  var singular = upperFirst(singularize(resourceName));

  return _ref = {}, defineProperty(_ref, 'select' + singular, function undefined(state, action) {
    return Object.assign({}, state, { selected: action.payload });
  }), defineProperty(_ref, 'get' + plural + 'Request', function undefined(state) {
    return Object.assign({}, state, { loading: true });
  }), defineProperty(_ref, 'get' + plural + 'Success', function undefined(state, action) {
    return Object.assign({}, state, {
      list: [].concat(toConsumableArray(action.payload.data)),
      page: action.payload.page,
      total: action.payload.total,
      loading: false
    });
  }), defineProperty(_ref, 'get' + plural + 'Failure', function undefined(state, action) {
    return Object.assign({}, state, { error: action.payload, loading: false });
  }), defineProperty(_ref, 'get' + singular + 'Request', function undefined(state) {
    return Object.assign({}, state, { loading: true });
  }), defineProperty(_ref, 'get' + singular + 'Success', function undefined(state) {
    return Object.assign({}, state, { loading: false });
  }), defineProperty(_ref, 'get' + singular + 'Failure', function undefined(state, action) {
    return Object.assign({}, state, { loading: false, error: action.payload });
  }), defineProperty(_ref, 'post' + singular + 'Request', function undefined(state) {
    return Object.assign({}, state, { posting: true });
  }), defineProperty(_ref, 'post' + singular + 'Success', function undefined(state) {
    return Object.assign({}, state, { posting: false });
  }), defineProperty(_ref, 'post' + singular + 'Failure', function undefined(state, action) {
    return Object.assign({}, state, { error: action.payload, posting: false });
  }), defineProperty(_ref, 'put' + singular + 'Request', function undefined(state) {
    return Object.assign({}, state, { posting: true });
  }), defineProperty(_ref, 'put' + singular + 'Success', function undefined(state) {
    return Object.assign({}, state, { posting: false });
  }), defineProperty(_ref, 'put' + singular + 'Failure', function undefined(state, action) {
    return Object.assign({}, state, { posting: false, error: action.payload });
  }), defineProperty(_ref, 'open' + singular + 'Form', function undefined(state) {
    return Object.assign({}, state, { showForm: true });
  }), defineProperty(_ref, 'close' + singular + 'Form', function undefined(state) {
    return Object.assign({}, state, { showForm: false });
  }), defineProperty(_ref, 'set' + singular + 'Schema', function undefined(state, action) {
    return Object.assign({}, state, { schema: action.payload });
  }), _ref;
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
    schema: null
  };
}

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

  return createSlice({
    slice: sliceName,
    initialState: initialDefaultState,
    reducers: defaultReducers
  });
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
function mapSliceReducers(resources, slices) {
  var reducers = {};

  // reducers
  resources.forEach(function (resource) {
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
function mapSliceActions(resources, slices) {
  var actions = {};

  resources.forEach(function (resource) {
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
function createResourcesSlices(resources) {
  var slices = {};

  // slices
  resources.forEach(function (resource) {
    slices[resource] = sliceFactory(resource);
  });

  return slices;
}

// all resources exposed by this library
var resources = ['activity', 'alert', 'assessment', 'feature', 'incident', 'incidentType', 'plan', 'procedure', 'questionnaire', 'resource', 'role', 'stakeholder'];

var slices = createResourcesSlices(resources);

var reducers = mapSliceReducers(resources, slices);

var rootReducer = combineReducers(reducers);

var store = configureStore({
  reducer: rootReducer,
  devTools: true
});

var actions = mapSliceActions(resources, slices, store.dispatch);

var dispatch = store.dispatch;

/**
 * Thunk factory. Expose all common thunks for resources
 *
 * Custom thunk implementations can be added to the specific resource
 * actions module
 *
 * @function
 * @name createThunkFor
 *
 * @param {string} resource - Resource name
 * @return {Object} thunks
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function createThunksFor(resource) {
  var _ref;

  var pluralName = upperFirst(pluralize(resource));
  var singularName = upperFirst(singularize(resource));
  var resourceName = toLower(singularName);

  return _ref = {}, defineProperty(_ref, 'get' + pluralName, function undefined(param) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName]['get' + pluralName + 'Request']());
      return Client['get' + pluralName](param).then(function (data) {
        return dispatch$$1(actions[resourceName]['get' + pluralName + 'Success'](data));
      }).catch(function (error) {
        return dispatch$$1(actions[resourceName]['get' + pluralName + 'Failure'](error));
      });
    };
  }), defineProperty(_ref, 'get' + singularName, function undefined(param) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName]['get' + singularName + 'Request']());
      return Client['get' + singularName](param).then(function (data) {
        return dispatch$$1(actions[resourceName]['get' + singularName + 'Success'](data));
      }).catch(function (error) {
        return dispatch$$1(actions[resourceName]['get' + singularName + 'Failure'](error));
      });
    };
  }), defineProperty(_ref, 'post' + singularName, function undefined(param) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName]['post' + singularName + 'Request']());
      return Client['post' + singularName](param).then(function (data) {
        return dispatch$$1(actions[resourceName]['post' + singularName + 'Success'](data));
      }).catch(function (error) {
        return dispatch$$1(actions[resourceName]['post' + singularName + 'Failure'](error));
      });
    };
  }), defineProperty(_ref, 'put' + singularName, function undefined(param) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName]['put' + singularName + 'Request']());
      return Client['put' + singularName](param).then(function (data) {
        return dispatch$$1(actions[resourceName]['put' + singularName + 'Success'](data));
      }).catch(function (error) {
        return dispatch$$1(actions[resourceName]['put' + singularName + 'Failure'](error));
      });
    };
  }), _ref;
}

/**
 * Generate all actions which are exposed from the library for consumers to use.
 * All exposed actions are wrapped in dispatch function so use should not have
 * call dispatch again
 *
 * @function
 * @name generateExposedActions
 *
 * @param {string} resource - Resource Name
 * @param {Object} thunks - Custom thunks to override/extends existing thunks
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function generateExposedActions(resource, actions, dispatch) {
  var thunks = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var resourceName = singularize(upperFirst(resource));

  var generatedThunks = createThunksFor(resourceName);

  merge(generatedThunks, thunks);

  var extractedActions = {};

  extractedActions['select' + resourceName] = get(actions[resource], 'select' + resourceName);
  extractedActions['open' + resourceName + 'Form'] = get(actions[resource], 'open' + resourceName + 'Form');
  extractedActions['close' + resourceName + 'Form'] = get(actions[resource], 'close' + resourceName + 'Form');
  extractedActions['set' + resourceName + 'Schema'] = get(actions[resource], 'set' + resourceName + 'Schema');

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

var getActivities = activityActions.getActivities,
    getActivity = activityActions.getActivity,
    selectActivity = activityActions.selectActivity,
    closeActivityForm = activityActions.closeActivityForm,
    openActivityForm = activityActions.openActivityForm,
    postActivity = activityActions.postActivity,
    putActivity = activityActions.putActivity,
    setActivitySchema = activityActions.setActivitySchema;

var alertActions = generateExposedActions('alert', actions, dispatch);

var getAlerts = alertActions.getAlerts,
    getAlert = alertActions.getAlert,
    selectAlert = alertActions.selectAlert,
    closeAlertForm = alertActions.closeAlertForm,
    openAlertForm = alertActions.openAlertForm,
    postAlert = alertActions.postAlert,
    putAlert = alertActions.putAlert,
    setAlertSchema = alertActions.setAlertSchema;

var assessmentActions = generateExposedActions('assessment', actions, dispatch);

var getAssessments = assessmentActions.getAssessments,
    getAssessment = assessmentActions.getAssessment,
    selectAssessment = assessmentActions.selectAssessment,
    closeAssessmentForm = assessmentActions.closeAssessmentForm,
    openAssessmentForm = assessmentActions.openAssessmentForm,
    postAssessment = assessmentActions.postAssessment,
    putAssessment = assessmentActions.putAssessment,
    setAssessmentSchema = assessmentActions.setAssessmentSchema;

var featureActions = generateExposedActions('feature', actions, dispatch);

var getFeatures = featureActions.getFeatures,
    getFeature = featureActions.getFeature,
    selectFeature = featureActions.selectFeature,
    closeFeatureForm = featureActions.closeFeatureForm,
    openFeatureForm = featureActions.openFeatureForm,
    postFeature = featureActions.postFeature,
    putFeature = featureActions.putFeature,
    setFeatureSchema = featureActions.setFeatureSchema;

var incidentActions = generateExposedActions('incident', actions, dispatch);

var getIncidents = incidentActions.getIncidents,
    getIncident = incidentActions.getIncident,
    selectIncident = incidentActions.selectIncident,
    closeIncidentForm = incidentActions.closeIncidentForm,
    openIncidentForm = incidentActions.openIncidentForm,
    postIncident = incidentActions.postIncident,
    putIncident = incidentActions.putIncident,
    setIncidentSchema = incidentActions.setIncidentSchema;

var incidentTypeActions = generateExposedActions('incidentType', actions, dispatch);

var getIncidentTypes = incidentTypeActions.getIncidentTypes,
    getIncidentType = incidentTypeActions.getIncidentType,
    selectIncidentType = incidentTypeActions.selectIncidentType,
    closedIncidentTypeForm = incidentTypeActions.closedIncidentTypeForm,
    openIncidentTypeForm = incidentTypeActions.openIncidentTypeForm,
    postIncidentType = incidentTypeActions.postIncidentType,
    putIncidentType = incidentTypeActions.putIncidentType,
    setIncidentTypeSchema = incidentTypeActions.setIncidentTypeSchema;

var planActions = generateExposedActions('plan', actions, dispatch);

var getPlans = planActions.getPlans,
    getPlan = planActions.getPlan,
    selectPlan = planActions.selectPlan,
    closePlanForm = planActions.closePlanForm,
    openPlanForm = planActions.openPlanForm,
    postPlan = planActions.postPlan,
    putPlan = planActions.putPlan,
    setPlanSchema = planActions.setPlanSchema;

var procedureActions = generateExposedActions('procedure', actions, dispatch);

var getProcedures = procedureActions.getProcedures,
    getProcedure = procedureActions.getProcedure,
    selectProcedure = procedureActions.selectProcedure,
    closeProcedureForm = procedureActions.closeProcedureForm,
    openProcedureForm = procedureActions.openProcedureForm,
    postProcedure = procedureActions.postProcedure,
    putProcedure = procedureActions.putProcedure,
    setProcedureSchema = procedureActions.setProcedureSchema;

var questionnaireActions = generateExposedActions('questionnaire', actions, dispatch);

var getQuestionnaires = questionnaireActions.getQuestionnaires,
    getQuestionnaire = questionnaireActions.getQuestionnaire,
    selectQuestionnaire = questionnaireActions.selectQuestionnaire,
    closeQuestionnaireForm = questionnaireActions.closeQuestionnaireForm,
    openQuestionnaireForm = questionnaireActions.openQuestionnaireForm,
    postQuestionnaire = questionnaireActions.postQuestionnaire,
    putQuestionnaire = questionnaireActions.putQuestionnaire,
    setQuestionnaireSchema = questionnaireActions.setQuestionnaireSchema;

var resourceActions = generateExposedActions('resource', actions, dispatch);

var getResources = resourceActions.getResources,
    getResource = resourceActions.getResource,
    selectResource = resourceActions.selectResource,
    closeResourceForm = resourceActions.closeResourceForm,
    openResourceForm = resourceActions.openResourceForm,
    postResource = resourceActions.postResource,
    putResource = resourceActions.putResource,
    setResourceSchema = resourceActions.setResourceSchema;

var roleActions = generateExposedActions('role', actions, dispatch);

var getRoles = roleActions.getRoles,
    getRole = roleActions.getRole,
    selectRole = roleActions.selectRole,
    closeRoleForm = roleActions.closeRoleForm,
    openRoleForm = roleActions.openRoleForm,
    postRole = roleActions.postRole,
    putRole = roleActions.putRole,
    setRoleSchema = roleActions.setRoleSchema;

var stakeholderActions = generateExposedActions('stakeholder', actions, dispatch);

var getStakeholders = stakeholderActions.getStakeholders,
    getStakeholder = stakeholderActions.getStakeholder,
    selectStakeholder = stakeholderActions.selectStakeholder,
    closeStakeholderForm = stakeholderActions.closeStakeholderForm,
    openStakeholderForm = stakeholderActions.openStakeholderForm,
    postStakeholder = stakeholderActions.postStakeholder,
    putStakeholder = stakeholderActions.putStakeholder,
    setStakeholderSchema = stakeholderActions.setStakeholderSchema;

/* eslint-disable */
/**
 * Store Provider for EMIS store
 *
 * @function
 * @name StoreProvider
 *
 * @param {Object} props
 * @param {ReactComponent} props.children
 * @returns {ReactComponent} Provider
 * @version 0.1.0
 * @since 0.1.0
 */
function StoreProvider(_ref) {
  var children = _ref.children;

  return React.createElement(
    Provider,
    { store: store },
    children
  );
}
/* eslint-enable */

/**
 * Expose simplified connect function
 *
 * @function
 * @name connect
 *
 * @param {ReactComponent} component
 * @param {Object|function} stateToProps
 * @return {ReactComponent} - React component which is injected with props
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function connect(component) {
  var stateToProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var _mapStateToProps = stateToProps;

  if (isObject(_mapStateToProps)) {
    _mapStateToProps = function mapStateToProps(state) {
      var mappedState = {};

      forIn(_mapStateToProps, function (value, key) {
        mappedState[key] = get(state, value);
      });

      return mappedState;
    };
  }

  return connect(_mapStateToProps)(component);
}

export { StoreProvider, connect, getActivities, getActivity, selectActivity, closeActivityForm, openActivityForm, postActivity, putActivity, setActivitySchema, getAlerts, getAlert, selectAlert, closeAlertForm, openAlertForm, postAlert, putAlert, setAlertSchema, getAssessments, getAssessment, selectAssessment, closeAssessmentForm, openAssessmentForm, postAssessment, putAssessment, setAssessmentSchema, getFeatures, getFeature, selectFeature, closeFeatureForm, openFeatureForm, postFeature, putFeature, setFeatureSchema, getIncidents, getIncident, selectIncident, closeIncidentForm, openIncidentForm, postIncident, putIncident, setIncidentSchema, getIncidentTypes, getIncidentType, selectIncidentType, closedIncidentTypeForm, openIncidentTypeForm, postIncidentType, putIncidentType, setIncidentTypeSchema, getPlans, getPlan, selectPlan, closePlanForm, openPlanForm, postPlan, putPlan, setPlanSchema, getProcedures, getProcedure, selectProcedure, closeProcedureForm, openProcedureForm, postProcedure, putProcedure, setProcedureSchema, getQuestionnaires, getQuestionnaire, selectQuestionnaire, closeQuestionnaireForm, openQuestionnaireForm, postQuestionnaire, putQuestionnaire, setQuestionnaireSchema, getResources, getResource, selectResource, closeResourceForm, openResourceForm, postResource, putResource, setResourceSchema, getRoles, getRole, selectRole, closeRoleForm, openRoleForm, postRole, putRole, setRoleSchema, getStakeholders, getStakeholder, selectStakeholder, closeStakeholderForm, openStakeholderForm, postStakeholder, putStakeholder, setStakeholderSchema };
