import faker from 'faker';
import camelCase from 'lodash/camelCase';
import merge from 'lodash/merge';
import * as Actions from '../actions';
import * as ActionTypes from '../constants';

/**
 * Test helper function for testing action creators
 *
 * @function
 * @name testActionCreator
 *
 * @param {Object} testCase
 * @param {string} testCase.actionType
 * @param {*} testCase.data
 * @param {Object} testCase.meta
 * @param {bool} testCase.only=false - set true to run a specific test case only
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function testActionCreator({ actionType, data, meta, only = false }) {
  const doTest = () => {
    let expectedAction = {
      type: actionType,
    };

    if (data) {
      expectedAction = merge({}, expectedAction, { payload: { data } });

      if (meta) {
        expectedAction = merge({}, expectedAction, { payload: { meta } });
      }

      return expect(Actions[`${camelCase(actionType)}`](data)).toEqual(
        expectedAction
      );
    }

    return expect(Actions[`${camelCase(actionType)}`]()).toEqual(
      expectedAction
    );
  };

  if (only) {
    // eslint-disable-next-line jest/no-focused-tests
    it.only(`should create an action of type ${actionType}`, doTest);
  } else {
    it(`should create an action of type ${actionType}`, doTest);
  }
}

describe('Incident Type Action Creators', () => {
  const tests = [
    {
      actionType: ActionTypes.SELECT_INCIDENT_TYPE,
      data: {
        name: faker.random.word(),
      },
    },
    {
      actionType: ActionTypes.GET_INCIDENT_TYPES_START,
    },
    {
      actionType: ActionTypes.GET_INCIDENT_TYPES_SUCCESS,
      data: [{ name: faker.random.word() }],
    },
    {
      actionType: ActionTypes.GET_INCIDENT_TYPES_SUCCESS,
      data: [],
    },
    {
      actionType: ActionTypes.GET_INCIDENT_TYPES_ERROR,
      data: new Error(),
    },
    {
      actionType: ActionTypes.GET_INCIDENT_TYPE_START,
    },
    {
      actionType: ActionTypes.GET_INCIDENT_TYPE_SUCCESS,
      data: {
        name: faker.random.word(),
      },
    },
    {
      actionType: ActionTypes.GET_INCIDENT_TYPE_ERROR,
      data: new Error(),
    },
    {
      actionType: ActionTypes.POST_INCIDENT_TYPE_START,
    },
    {
      actionType: ActionTypes.POST_INCIDENT_TYPE_SUCCESS,
    },
    {
      actionType: ActionTypes.POST_INCIDENT_TYPE_ERROR,
      data: new Error(),
    },
    {
      actionType: ActionTypes.PUT_INCIDENT_TYPE_START,
    },
    {
      actionType: ActionTypes.PUT_INCIDENT_TYPE_SUCCESS,
    },
    {
      actionType: ActionTypes.PUT_INCIDENT_TYPE_ERROR,
      data: new Error(),
    },
    {
      actionType: ActionTypes.DELETE_INCIDENT_TYPE_START,
    },
    { actionType: ActionTypes.DELETE_INCIDENT_TYPE_SUCCESS },
    { actionType: ActionTypes.DELETE_INCIDENT_TYPE_ERROR, data: new Error() },
    {
      actionType: ActionTypes.SET_INCIDENT_TYPE_SCHEMA,
      data: {
        name: faker.random.words(),
      },
    },
  ];

  // run all test cases
  tests.forEach(test => testActionCreator(test));
});
