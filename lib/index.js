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
var redux = require('redux');
var reduxStarterKit = require('redux-starter-kit');
var upperFirst = _interopDefault(require('lodash/upperFirst'));
var camelCase = _interopDefault(require('lodash/camelCase'));
var merge = _interopDefault(require('lodash/merge'));
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
 * @version 0.1.0
 * @since 0.1.0
 */
function getDefaultReducers(resourceName) {
  var _ref;

  var plural = upperFirst(inflection.pluralize(resourceName));
  var singular = upperFirst(inflection.singularize(resourceName));

  return _ref = {}, defineProperty(_ref, camelize('select', singular), function (state, action) {
    return Object.assign({}, state, { selected: action.payload });
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
    return Object.assign({}, state, { posting: false });
  }), defineProperty(_ref, camelize('post', singular, 'Failure'), function (state, action) {
    return Object.assign({}, state, { error: action.payload, posting: false });
  }), defineProperty(_ref, camelize('put', singular, 'Request'), function (state) {
    return Object.assign({}, state, { posting: true });
  }), defineProperty(_ref, camelize('put', singular, 'Success'), function (state) {
    return Object.assign({}, state, { posting: false });
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
    schema: null
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

// all resources exposed by this library
var resources = ['activity', 'adjustment', 'alert', 'assessment', 'feature', 'incident', 'incidentType', 'indicator', 'item', 'plan', 'procedure', 'question', 'questionnaire', 'resource', 'role', 'stakeholder', 'warehouse'];

var slices = createResourcesSlices(resources);

var reducers = mapSliceReducers(resources, slices);

var rootReducer = redux.combineReducers(reducers);

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
 * @version 0.1.0
 * @since 0.1.0
 */
function createThunksFor(resource) {
  var _ref;

  var pluralName = upperFirst(inflection.pluralize(resource));
  var singularName = upperFirst(inflection.singularize(resource));
  var resourceName = lowerFirst(singularName);

  return _ref = {}, defineProperty(_ref, camelize('get', pluralName), function (param) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName][camelize('get', pluralName, 'request')]());
      return client[camelize('get', pluralName)](param).then(function (data) {
        return dispatch$$1(actions[resourceName][camelize('get', pluralName, 'success')](data));
      }).catch(function (error) {
        return dispatch$$1(actions[resourceName][camelize('get', pluralName, 'failure')](error));
      });
    };
  }), defineProperty(_ref, camelize('get', singularName), function (param) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName][camelize('get', singularName, 'request')]());
      return client[camelize('get', singularName)](param).then(function (data) {
        return dispatch$$1(actions[resourceName][camelize('get', singularName, 'success')](data));
      }).catch(function (error) {
        return dispatch$$1(actions[resourceName][camelize('get', singularName, 'failure')](error));
      });
    };
  }), defineProperty(_ref, camelize('post', singularName), function (param) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName][camelize('post', singularName, 'request')]());
      return client[camelize('post', singularName)](param).then(function (data) {
        return dispatch$$1(actions[resourceName][camelize('post', singularName, 'success')](data));
      }).catch(function (error) {
        return dispatch$$1(actions[resourceName][camelize('post', singularName, 'failure')](error));
      });
    };
  }), defineProperty(_ref, camelize('put', singularName), function (param) {
    return function (dispatch$$1) {
      dispatch$$1(actions[resourceName][camelize('put', singularName, 'request')]());
      return client[camelize('put', singularName)](param).then(function (data) {
        return dispatch$$1(actions[resourceName][camelize('put', singularName, 'success')](data));
      }).catch(function (error) {
        return dispatch$$1(actions[resourceName][camelize('put', singularName, 'failure')](error));
      });
    };
  }), _ref;
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

  var generatedThunks = createThunksFor(resourceName);

  merge(generatedThunks, thunks);

  var extractedActions = {};

  extractedActions[camelize('select', resourceName)] = get(actions[resource], camelize('select', resourceName));
  extractedActions[camelize('open', resourceName, 'form')] = get(actions[resource], camelize('open', resourceName, 'form'));
  extractedActions[camelize('close', resourceName, 'form')] = get(actions[resource], camelize('close', resourceName, 'form'));
  extractedActions[camelize('set', resourceName, 'schema')] = get(actions[resource], camelize('set', resourceName, 'schema'));

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

var adjustmentActions = generateExposedActions('adjustment', actions, dispatch);

var getAdjustments = adjustmentActions.getAdjustments,
    getAdjustment = adjustmentActions.getAdjustment,
    selectAdjustment = adjustmentActions.selectAdjustment,
    closeAdjustmentForm = adjustmentActions.closeAdjustmentForm,
    openAdjustmentForm = adjustmentActions.openAdjustmentForm,
    postAdjustment = adjustmentActions.postAdjustment,
    putAdjustment = adjustmentActions.putAdjustment,
    setAdjustmentSchema = adjustmentActions.setAdjustmentSchema;

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

var indicatorActions = generateExposedActions('indicator', actions, dispatch);

var getIndicators = indicatorActions.getIndicators,
    getIndicator = indicatorActions.getIndicator,
    selectIndicator = indicatorActions.selectIndicator,
    closeIndicatorForm = indicatorActions.closeIndicatorForm,
    openIndicatorForm = indicatorActions.openIndicatorForm,
    postIndicator = indicatorActions.postIndicator,
    putIndicator = indicatorActions.putIndicator,
    setIndicatorSchema = indicatorActions.setIndicatorSchema;

var itemActions = generateExposedActions('item', actions, dispatch);

var getItems = itemActions.getItems,
    getItem = itemActions.getItem,
    selectItem = itemActions.selectItem,
    closeItemForm = itemActions.closeItemForm,
    openItemForm = itemActions.openItemForm,
    postItem = itemActions.postItem,
    putItem = itemActions.putItem,
    setItemSchema = itemActions.setItemSchema;

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

var questionActions = generateExposedActions('question', actions, dispatch);

var getQuestions = questionActions.getQuestions,
    getQuestion = questionActions.getQuestion,
    selectQuestion = questionActions.selectQuestion,
    closeQuestionForm = questionActions.closeQuestionForm,
    openQuestionForm = questionActions.openQuestionForm,
    postQuestion = questionActions.postQuestion,
    putQuestion = questionActions.putQuestion,
    setQuestionSchema = questionActions.setQuestionSchema;

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

var warehouseActions = generateExposedActions('warehouse', actions, dispatch);

var getWarehouses = warehouseActions.getWarehouses,
    getWarehouse = warehouseActions.getWarehouse,
    selectWarehouse = warehouseActions.selectWarehouse,
    closeWarehouseForm = warehouseActions.closeWarehouseForm,
    openWarehouseForm = warehouseActions.openWarehouseForm,
    postWarehouse = warehouseActions.postWarehouse,
    putWarehouse = warehouseActions.putWarehouse,
    setWarehouseSchema = warehouseActions.setWarehouseSchema;

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
exports.getActivities = getActivities;
exports.getActivity = getActivity;
exports.selectActivity = selectActivity;
exports.closeActivityForm = closeActivityForm;
exports.openActivityForm = openActivityForm;
exports.postActivity = postActivity;
exports.putActivity = putActivity;
exports.setActivitySchema = setActivitySchema;
exports.getAdjustments = getAdjustments;
exports.getAdjustment = getAdjustment;
exports.selectAdjustment = selectAdjustment;
exports.closeAdjustmentForm = closeAdjustmentForm;
exports.openAdjustmentForm = openAdjustmentForm;
exports.postAdjustment = postAdjustment;
exports.putAdjustment = putAdjustment;
exports.setAdjustmentSchema = setAdjustmentSchema;
exports.getAlerts = getAlerts;
exports.getAlert = getAlert;
exports.selectAlert = selectAlert;
exports.closeAlertForm = closeAlertForm;
exports.openAlertForm = openAlertForm;
exports.postAlert = postAlert;
exports.putAlert = putAlert;
exports.setAlertSchema = setAlertSchema;
exports.getAssessments = getAssessments;
exports.getAssessment = getAssessment;
exports.selectAssessment = selectAssessment;
exports.closeAssessmentForm = closeAssessmentForm;
exports.openAssessmentForm = openAssessmentForm;
exports.postAssessment = postAssessment;
exports.putAssessment = putAssessment;
exports.setAssessmentSchema = setAssessmentSchema;
exports.getFeatures = getFeatures;
exports.getFeature = getFeature;
exports.selectFeature = selectFeature;
exports.closeFeatureForm = closeFeatureForm;
exports.openFeatureForm = openFeatureForm;
exports.postFeature = postFeature;
exports.putFeature = putFeature;
exports.setFeatureSchema = setFeatureSchema;
exports.getIncidents = getIncidents;
exports.getIncident = getIncident;
exports.selectIncident = selectIncident;
exports.closeIncidentForm = closeIncidentForm;
exports.openIncidentForm = openIncidentForm;
exports.postIncident = postIncident;
exports.putIncident = putIncident;
exports.setIncidentSchema = setIncidentSchema;
exports.getIncidentTypes = getIncidentTypes;
exports.getIncidentType = getIncidentType;
exports.selectIncidentType = selectIncidentType;
exports.closedIncidentTypeForm = closedIncidentTypeForm;
exports.openIncidentTypeForm = openIncidentTypeForm;
exports.postIncidentType = postIncidentType;
exports.putIncidentType = putIncidentType;
exports.setIncidentTypeSchema = setIncidentTypeSchema;
exports.getIndicators = getIndicators;
exports.getIndicator = getIndicator;
exports.selectIndicator = selectIndicator;
exports.closeIndicatorForm = closeIndicatorForm;
exports.openIndicatorForm = openIndicatorForm;
exports.postIndicator = postIndicator;
exports.putIndicator = putIndicator;
exports.setIndicatorSchema = setIndicatorSchema;
exports.getItems = getItems;
exports.getItem = getItem;
exports.selectItem = selectItem;
exports.closeItemForm = closeItemForm;
exports.openItemForm = openItemForm;
exports.postItem = postItem;
exports.putItem = putItem;
exports.setItemSchema = setItemSchema;
exports.getPlans = getPlans;
exports.getPlan = getPlan;
exports.selectPlan = selectPlan;
exports.closePlanForm = closePlanForm;
exports.openPlanForm = openPlanForm;
exports.postPlan = postPlan;
exports.putPlan = putPlan;
exports.setPlanSchema = setPlanSchema;
exports.getProcedures = getProcedures;
exports.getProcedure = getProcedure;
exports.selectProcedure = selectProcedure;
exports.closeProcedureForm = closeProcedureForm;
exports.openProcedureForm = openProcedureForm;
exports.postProcedure = postProcedure;
exports.putProcedure = putProcedure;
exports.setProcedureSchema = setProcedureSchema;
exports.getQuestions = getQuestions;
exports.getQuestion = getQuestion;
exports.selectQuestion = selectQuestion;
exports.closeQuestionForm = closeQuestionForm;
exports.openQuestionForm = openQuestionForm;
exports.postQuestion = postQuestion;
exports.putQuestion = putQuestion;
exports.setQuestionSchema = setQuestionSchema;
exports.getQuestionnaires = getQuestionnaires;
exports.getQuestionnaire = getQuestionnaire;
exports.selectQuestionnaire = selectQuestionnaire;
exports.closeQuestionnaireForm = closeQuestionnaireForm;
exports.openQuestionnaireForm = openQuestionnaireForm;
exports.postQuestionnaire = postQuestionnaire;
exports.putQuestionnaire = putQuestionnaire;
exports.setQuestionnaireSchema = setQuestionnaireSchema;
exports.getResources = getResources;
exports.getResource = getResource;
exports.selectResource = selectResource;
exports.closeResourceForm = closeResourceForm;
exports.openResourceForm = openResourceForm;
exports.postResource = postResource;
exports.putResource = putResource;
exports.setResourceSchema = setResourceSchema;
exports.getRoles = getRoles;
exports.getRole = getRole;
exports.selectRole = selectRole;
exports.closeRoleForm = closeRoleForm;
exports.openRoleForm = openRoleForm;
exports.postRole = postRole;
exports.putRole = putRole;
exports.setRoleSchema = setRoleSchema;
exports.getStakeholders = getStakeholders;
exports.getStakeholder = getStakeholder;
exports.selectStakeholder = selectStakeholder;
exports.closeStakeholderForm = closeStakeholderForm;
exports.openStakeholderForm = openStakeholderForm;
exports.postStakeholder = postStakeholder;
exports.putStakeholder = putStakeholder;
exports.setStakeholderSchema = setStakeholderSchema;
exports.getWarehouses = getWarehouses;
exports.getWarehouse = getWarehouse;
exports.selectWarehouse = selectWarehouse;
exports.closeWarehouseForm = closeWarehouseForm;
exports.openWarehouseForm = openWarehouseForm;
exports.postWarehouse = postWarehouse;
exports.putWarehouse = putWarehouse;
exports.setWarehouseSchema = setWarehouseSchema;
