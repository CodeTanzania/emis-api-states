import { httpActions } from '@codetanzania/emis-api-client';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  initializeApp,
  initializeAppFailure,
  initializeAppStart,
  initializeAppSuccess,
} from '../../src/actions/app';
import {
  INITIALIZE_APP_FAILURE,
  INITIALIZE_APP_START,
  INITIALIZE_APP_SUCCESS,
} from '../../src/store';

const { getSchemas } = httpActions;
jest.mock('@codetanzania/emis-api-client');
const mockStore = configureMockStore([thunk]);

describe('App Actions', () => {
  describe('Actions', () => {
    it(`should create action of type ${INITIALIZE_APP_START}`, () => {
      expect(initializeAppStart()).toEqual({ type: INITIALIZE_APP_START });
    });

    it(`should create action of type ${INITIALIZE_APP_SUCCESS}`, () => {
      expect(initializeAppSuccess()).toEqual({ type: INITIALIZE_APP_SUCCESS });
    });

    it(`should create action of type ${INITIALIZE_APP_FAILURE}`, () => {
      expect(initializeAppFailure({})).toEqual({
        type: INITIALIZE_APP_FAILURE,
        error: {},
      });
    });
  });

  describe('initializeApp Thunk', () => {
    it('should dispatch all schema actions', () => {
      const store = mockStore({});
      const mockData = {
        Permission: {},
        District: {},
        Feature: {},
        FocalPerson: {},
        Role: {},
        Message: {},
        Party: {},
        Alert: {},
        AlertSource: {},
        Item: {},
        Stock: {},
        Adjustment: {},
        Agency: {},
        Indicator: {},
        Question: {},
        Questionnaire: {},
        Region: {},
        IncidentType: {},
        Plan: {},
        Activity: {},
        Procedure: {},
        Warehouse: {},
      };

      getSchemas.mockResolvedValueOnce(mockData);

      const expectedActions = [
        { type: 'app/initialize' },
        { type: 'activity/setActivitySchema', payload: mockData.Activity },
        {
          type: 'adjustment/setAdjustmentSchema',
          payload: mockData.Adjustment,
        },
        {
          type: 'agency/setAgencySchema',
          payload: mockData.Agency,
        },
        { type: 'alert/setAlertSchema', payload: mockData.Alert },
        {
          type: 'alertSource/setAlertSourceSchema',
          payload: mockData.AlertSource,
        },
        { type: 'district/setDistrictSchema', payload: mockData.District },
        { type: 'feature/setFeatureSchema', payload: mockData.Feature },
        {
          type: 'focalPerson/setFocalPersonSchema',
          payload: mockData.FocalPerson,
        },
        { type: 'indicator/setIndicatorSchema', payload: mockData.Indicator },
        {
          type: 'incidentType/setIncidentTypeSchema',
          payload: mockData.IncidentType,
        },
        {
          type: 'item/setItemSchema',
          payload: mockData.Item,
        },
        { type: 'plan/setPlanSchema', payload: mockData.Plan },
        { type: 'procedure/setProcedureSchema', payload: mockData.Procedure },
        { type: 'question/setQuestionSchema', payload: mockData.Question },
        {
          type: 'questionnaire/setQuestionnaireSchema',
          payload: mockData.Questionnaire,
        },
        {
          type: 'region/setRegionSchema',
          payload: mockData.Region,
        },
        { type: 'role/setRoleSchema', payload: mockData.Role },
        {
          type: 'stock/setStockSchema',
          payload: mockData.Stock,
        },
        { type: 'warehouse/setWarehouseSchema', payload: mockData.Warehouse },
        { type: 'app/initializeSuccess' },
      ];

      return store.dispatch(initializeApp()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
