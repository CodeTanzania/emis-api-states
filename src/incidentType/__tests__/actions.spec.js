import faker from 'faker';
import * as Actions from '../actions';
import * as ActionsTypes from '../constants';

describe('Incident Type Action Creators', () => {
  it(`should create an action of type ${
    ActionsTypes.GET_INCIDENT_TYPES_START
  }`, () => {
    const expectedAction = {
      type: ActionsTypes.GET_INCIDENT_TYPES_START,
    };
    expect(Actions.getIncidentTypesStart()).toEqual(expectedAction);
  });

  it(`should create an action of type ${
    ActionsTypes.GET_INCIDENT_TYPES_SUCCESS
  }`, () => {
    const incidents = [{ name: faker.random.word }];
    const expectedAction = {
      type: ActionsTypes.GET_INCIDENT_TYPES_SUCCESS,
      payload: { data: incidents },
    };

    expect(Actions.getIncidentTypesSuccess(incidents)).toEqual(expectedAction);
  });
});
