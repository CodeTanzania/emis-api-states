import {
  getPlan,
  getPlans,
  postPlan,
  putPlan,
} from '@codetanzania/emis-api-client';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import createThunkFor from '../src/factories/thunk';

jest.mock('@codetanzania/emis-api-client');
const mockStore = configureMockStore([thunk]);

describe('Thunk Factory', () => {
  it('should create object which expose common thunks', () => {
    const thunks = createThunkFor('todos');

    expect(typeof thunks.getTodos).toBe('function');
    expect(typeof thunks.getTodo).toBe('function');
    expect(typeof thunks.postTodo).toBe('function');
    expect(typeof thunks.putTodo).toBe('function');
  });

  it('should dispatch required actions when fetch resources succeed', () => {
    const store = mockStore({
      plans: {
        list: [],
      },
    });

    const mockData = {
      data: {
        data: [{ name: 'Finish off' }],
        page: 1,
        pages: 1,
        total: 1,
      },
    };
    getPlans.mockResolvedValueOnce(mockData);

    const planThunks = createThunkFor('plans');
    const expectedActions = [
      { type: 'plan/getPlansRequest', payload: undefined },
      { type: 'plan/getPlansSuccess', payload: mockData },
    ];

    return store.dispatch(planThunks.getPlans()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch required actions when fetch resources failed', () => {
    const store = mockStore({
      plans: {
        list: [],
      },
    });

    const error = {
      status: 404,
      code: 404,
      name: 'Error',
      message: 'Not Found',
      developerMessage: 'Not Found',
      userMessage: 'Not Found',
      error: 'Error',
      error_description: 'Not Found',
    };

    getPlans.mockRejectedValueOnce(error);

    const planThunks = createThunkFor('plans');
    const expectedActions = [
      { type: 'plan/getPlansRequest', payload: undefined },
      { type: 'plan/getPlansFailure', payload: error },
    ];

    return store.dispatch(planThunks.getPlans()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch required actions when get a resource succeed', () => {
    const store = mockStore({
      plans: {
        list: [],
      },
    });

    const mockData = {
      name: 'Finish off',
    };

    getPlan.mockResolvedValueOnce(mockData);

    const planThunks = createThunkFor('plans');
    const expectedActions = [
      { type: 'plan/getPlanRequest', payload: undefined },
      { type: 'plan/getPlanSuccess', payload: mockData },
    ];

    return store.dispatch(planThunks.getPlan({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch required actions when get a resource failed', () => {
    const store = mockStore({
      plans: {
        list: [],
      },
    });
    const error = {
      status: 404,
      code: 404,
      name: 'Error',
      message: 'Not Found',
      developerMessage: 'Not Found',
      userMessage: 'Not Found',
      error: 'Error',
      error_description: 'Not Found',
    };

    getPlan.mockRejectedValueOnce(error);

    const planThunks = createThunkFor('plans');
    const expectedActions = [
      { type: 'plan/getPlanRequest', payload: undefined },
      { type: 'plan/getPlanFailure', payload: error },
    ];

    return store.dispatch(planThunks.getPlan({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch required actions when post a resource succeed', () => {
    const store = mockStore({
      plans: {
        list: [],
      },
    });

    const mockData = {
      data: {
        name: 'Finish off',
      },
    };

    postPlan.mockResolvedValueOnce(mockData);

    const planThunks = createThunkFor('plans');
    const expectedActions = [
      { type: 'plan/postPlanRequest', payload: undefined },
      { type: 'plan/postPlanSuccess', payload: mockData },
    ];

    return store.dispatch(planThunks.postPlan({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch required actions when post a resource failed', () => {
    const store = mockStore({
      plans: {
        list: [],
      },
    });

    const error = {
      status: 404,
      code: 404,
      name: 'Error',
      message: 'Not Found',
      developerMessage: 'Not Found',
      userMessage: 'Not Found',
      error: 'Error',
      error_description: 'Not Found',
    };

    postPlan.mockRejectedValueOnce(error);

    const planThunks = createThunkFor('plans');
    const expectedActions = [
      { type: 'plan/postPlanRequest', payload: undefined },
      { type: 'plan/postPlanFailure', payload: error },
    ];

    return store.dispatch(planThunks.postPlan({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch required actions when put a resource succeed', () => {
    const store = mockStore({
      plans: {
        list: [],
      },
    });

    const mockData = {
      name: 'Finish off',
    };

    putPlan.mockResolvedValueOnce(mockData);

    const planThunks = createThunkFor('plans');
    const expectedActions = [
      { type: 'plan/putPlanRequest', payload: undefined },
      { type: 'plan/putPlanSuccess', payload: mockData },
    ];

    return store.dispatch(planThunks.putPlan({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should dispatch required actions when put a resource failed', () => {
    const store = mockStore({
      plans: {
        list: [],
      },
    });

    const error = {
      status: 404,
      code: 404,
      name: 'Error',
      message: 'Not Found',
      developerMessage: 'Not Found',
      userMessage: 'Not Found',
      error: 'Error',
      error_description: 'Not Found',
    };

    putPlan.mockRejectedValueOnce(error);

    const planThunks = createThunkFor('plans');
    const expectedActions = [
      { type: 'plan/putPlanRequest', payload: undefined },
      { type: 'plan/putPlanFailure', payload: error },
    ];

    return store.dispatch(planThunks.putPlan({})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
