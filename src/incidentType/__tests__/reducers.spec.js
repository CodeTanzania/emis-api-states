import faker from 'faker';
import isNull from 'lodash/isNull';
import * as ActionTypes from '../constants';
import { incidentType, incidentTypeSchema } from '../reducers';

/**
 * Reducer test helper function
 *
 * @function
 * @name testReducer
 *
 * @param {function} reducer
 * @param {object} action
 * @param {*} previousState
 * @param {*} expectedState
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function testReducer({
  reducer,
  action,
  previousState,
  expectedState,
  only = false,
}) {
  const doTest = () => {
    if (expectedState || isNull(expectedState)) {
      expect(reducer(previousState, action)).toEqual(expectedState);
    } else {
      expect(reducer(previousState, action)).toEqual(action.payload.data);
    }
  };

  let testCaseDescription = `should handle ${
    action.type
  } when previous state is default state`;

  if (previousState) {
    testCaseDescription = `should handle ${
      action.type
    } when previous state is set`;
  }

  if (isNull(previousState)) {
    testCaseDescription = `should handle ${
      action.type
    } when previous state is Null`;
  }

  if (only) {
    // eslint-disable-next-line jest/no-focused-tests
    it.only(`should handle ${action.type}`, doTest);
  } else {
    it(testCaseDescription, doTest);
  }
}

describe('Incident Type: Reducers', () => {
  describe('incidentTypeSchema', () => {
    const incidentTypeSchemaObject = { name: faker.random.word() };

    // test cases
    const tests = [
      {
        reducer: incidentTypeSchema,
        action: { type: ActionTypes.SELECT_INCIDENT_TYPE },
        previousState: null,
        expectedState: null,
      },
      {
        reducer: incidentTypeSchema,
        action: { type: ActionTypes.SELECT_INCIDENT_TYPE },
        previousState: undefined,
        expectedState: null,
      },
      {
        reducer: incidentTypeSchema,
        action: { type: ActionTypes.SELECT_INCIDENT_TYPE },
        previousState: incidentTypeSchemaObject,
        expectedState: incidentTypeSchemaObject,
      },
      {
        reducer: incidentTypeSchema,
        action: {
          type: ActionTypes.SET_INCIDENT_TYPE_SCHEMA,
          payload: { data: { name: faker.random.word() } },
        },
        previousState: null,
      },
      {
        reducer: incidentTypeSchema,
        action: {
          type: ActionTypes.SET_INCIDENT_TYPE_SCHEMA,
          payload: { data: { name: faker.random.word() } },
        },
        previousState: incidentTypeSchemaObject,
      },
    ];

    tests.forEach(test => testReducer(test));
  });

  describe('incidentType', () => {
    const previousState = {
      list: [],
      selected: null,
      filters: null,
      error: null,
      page: 1,
      total: 0,
      loading: false,
      posting: false,
    };
    const updateFetchPreviousState = {
      ...previousState,
      loading: true,
    };
    const incidentTypes = [{ name: faker.random.word() }];
    const incidentTypeSelected = { name: faker.random.word() };
    const error = new Error();

    // these are tests cases for incidentType reducer
    const tests = [
      {
        reducer: incidentType,
        action: { type: ActionTypes.SET_INCIDENT_TYPE_SCHEMA },
        previousState,
        expectedState: previousState,
      },
      {
        reducer: incidentType,
        action: { type: ActionTypes.GET_INCIDENT_TYPES_START },
        previousState,
        expectedState: { ...previousState, loading: true },
      },
      {
        reducer: incidentType,
        action: {
          type: ActionTypes.GET_INCIDENT_TYPES_ERROR,
          payload: { data: error },
        },
        previousState: updateFetchPreviousState,
        expectedState: { ...updateFetchPreviousState, error, loading: false },
      },
      {
        reducer: incidentType,
        action: {
          type: ActionTypes.GET_INCIDENT_TYPES_SUCCESS,
          payload: {
            data: incidentTypes,
            meta: { page: 1, total: 1 },
          },
        },
        previousState: updateFetchPreviousState,
        expectedState: {
          ...updateFetchPreviousState,
          list: incidentTypes,
          page: 1,
          total: 1,
          loading: false,
        },
      },
      {
        reducer: incidentType,
        action: {
          type: ActionTypes.SELECT_INCIDENT_TYPE,
          payload: {
            data: incidentTypeSelected,
          },
        },
        expectedState: { ...previousState, selected: incidentTypeSelected },
      },
      {
        reducer: incidentType,
        action: {
          type: ActionTypes.SELECT_INCIDENT_TYPE,
          payload: {
            data: incidentTypeSelected,
          },
        },
        previousState: {
          ...previousState,
          selected: { name: faker.random.words() },
        },
        expectedState: { ...previousState, selected: incidentTypeSelected },
      },
    ];

    // run all test cases
    tests.forEach(test => testReducer(test));
  });
});
