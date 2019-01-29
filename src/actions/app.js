import { getSchemas } from '@codetanzania/emis-api-client';
import {
  actions,
  dispatch as storeDispatch,
  INITIALIZE_APP_FAILURE,
  INITIALIZE_APP_START,
  INITIALIZE_APP_SUCCESS,
} from '../store';

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
export function initializeAppStart() {
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
export function initializeAppSuccess() {
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
export function initializeAppFailure(error) {
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
export function initializeApp() {
  return dispatch => {
    dispatch(initializeAppStart());
    return getSchemas()
      .then(schemas => {
        const {
          activity: { setActivitySchema },
          adjustment: { setAdjustmentSchema },
          alert: { setAlertSchema },
          alertSource: { setAlertSourceSchema },
          feature: { setFeatureSchema },
          indicator: { setIndicatorSchema },
          item: { setItemSchema },
          incidentType: { setIncidentTypeSchema },
          plan: { setPlanSchema },
          procedure: { setProcedureSchema },
          question: { setQuestionSchema },
          questionnaire: { setQuestionnaireSchema },
          role: { setRoleSchema },
          stakeholder: { setStakeholderSchema },
          stock: { setStockSchema },
        } = actions;

        const {
          Activity: activitySchema,
          Adjustment: adjustmentSchema,
          Alert: alertSchema,
          AlertSource: alertSourceSchema,
          Feature: featureSchema,
          IncidentType: incidentTypeSchema,
          Indicator: indicatorSchema,
          Item: itemSchema,
          Plan: planSchema,
          Procedure: procedureSchema,
          Question: questionSchema,
          Questionnaire: questionnaireSchema,
          Role: roleSchema,
          Party: stakeholderSchema,
          Stock: stockSchema,
        } = schemas;

        dispatch(setActivitySchema(activitySchema));
        dispatch(setAdjustmentSchema(adjustmentSchema));
        dispatch(setAlertSchema(alertSchema));
        dispatch(setAlertSourceSchema(alertSourceSchema));
        dispatch(setFeatureSchema(featureSchema));
        dispatch(setIndicatorSchema(indicatorSchema));
        dispatch(setIncidentTypeSchema(incidentTypeSchema));
        dispatch(setItemSchema(itemSchema));
        dispatch(setPlanSchema(planSchema));
        dispatch(setProcedureSchema(procedureSchema));
        dispatch(setQuestionSchema(questionSchema));
        dispatch(setQuestionnaireSchema(questionnaireSchema));
        dispatch(setRoleSchema(roleSchema));
        dispatch(setStakeholderSchema(stakeholderSchema));
        dispatch(setStockSchema(stockSchema));
        dispatch(initializeAppSuccess());
      })
      .catch(error => {
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
export function wrappedInitializeApp() {
  return storeDispatch(initializeApp());
}
