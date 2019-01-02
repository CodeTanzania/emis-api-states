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
 * @param {string} actionType
 * @param {*} data
 * @param {Object} meta
 *
 * @version 0.1.0
 * @since 0.1.0
 */
function testActionCreator(actionType, data, meta) {
  return it(`should create an action of type ${actionType}`, () => {
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
  });
}

describe('Incident Type Action Creators', () => {
  testActionCreator(ActionTypes.SELECT_INCIDENT_TYPE, {
    name: faker.random.word(),
  });

  testActionCreator(ActionTypes.GET_INCIDENT_TYPES_START);

  testActionCreator(ActionTypes.GET_INCIDENT_TYPES_SUCCESS, [
    { name: faker.random.word() },
  ]);

  testActionCreator(ActionTypes.GET_INCIDENT_TYPES_SUCCESS, []);

  testActionCreator(ActionTypes.GET_INCIDENT_TYPES_ERROR, new Error());

  testActionCreator(ActionTypes.GET_INCIDENT_TYPE_START);

  testActionCreator(ActionTypes.GET_INCIDENT_TYPE_SUCCESS, {
    name: faker.random.word(),
  });

  testActionCreator(ActionTypes.GET_INCIDENT_TYPE_ERROR, new Error());

  testActionCreator(ActionTypes.POST_INCIDENT_TYPE_START);

  testActionCreator(ActionTypes.POST_INCIDENT_TYPE_SUCCESS);

  testActionCreator(ActionTypes.POST_INCIDENT_TYPE_ERROR, new Error());

  testActionCreator(ActionTypes.PUT_INCIDENT_TYPE_START);

  testActionCreator(ActionTypes.PUT_INCIDENT_TYPE_SUCCESS);

  testActionCreator(ActionTypes.PUT_INCIDENT_TYPE_ERROR, new Error());

  testActionCreator(ActionTypes.DELETE_INCIDENT_TYPE_START);

  testActionCreator(ActionTypes.DELETE_INCIDENT_TYPE_SUCCESS);

  testActionCreator(ActionTypes.DELETE_INCIDENT_TYPE_ERROR, new Error());
});
