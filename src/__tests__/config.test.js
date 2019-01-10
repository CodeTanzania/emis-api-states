import { getDefaultInitialState, getDefaultReducers } from '../config';

describe('Configs', () => {
  it('should generate default initial default state', () => {
    expect(getDefaultInitialState()).toEqual({
      list: [],
      selected: null,
      page: 1,
      total: 0,
      pages: 1,
      loading: false,
      posting: false,
      showForm: false,
      schema: null,
    });
  });

  it('should generate default initial reducers object', () => {
    expect(typeof getDefaultReducers('todo').getTodosSuccess).toBe('function');
    expect(typeof getDefaultReducers('todo').getTodosFailure).toBe('function');
    expect(typeof getDefaultReducers('todo').getTodosSuccess).toBe('function');
    expect(typeof getDefaultReducers('todo').postTodoRequest).toBe('function');
    expect(typeof getDefaultReducers('todo').postTodoSuccess).toBe('function');
    expect(typeof getDefaultReducers('todo').postTodoFailure).toBe('function');
    expect(typeof getDefaultReducers('todo').putTodoRequest).toBe('function');
    expect(typeof getDefaultReducers('todo').putTodoSuccess).toBe('function');
    expect(typeof getDefaultReducers('todo').putTodoFailure).toBe('function');
    expect(typeof getDefaultReducers('todo').openTodoForm).toBe('function');
    expect(typeof getDefaultReducers('todo').closeTodoForm).toBe('function');
    expect(typeof getDefaultReducers('todo').setTodoSchema).toBe('function');
  });
});
