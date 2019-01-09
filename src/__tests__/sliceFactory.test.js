import createSliceFor from '../sliceFactory';

function createAction(actionType, payload) {
  return { type: actionType, payload };
}

describe('Slice Factory', () => {
  const initialDefaultState = {
    list: [],
    selected: null,
    page: 1,
    total: 0,
    pages: 1,
    loading: false,
    posting: false,
    showForm: false,
    schema: null,
  };

  it('should create a slice provided slice name', () => {
    const resources = createSliceFor('resources');

    expect(resources.actions).toBeDefined();
    expect(resources.reducer).toBeDefined();
    expect(resources.selectors).toBeDefined();
  });

  it('should create common actions for each resource', () => {
    const todos = createSliceFor('todo');

    const actions = Object.keys(todos.actions);

    expect(actions.length).toBeGreaterThan(0);
    expect(actions).toEqual([
      'selectTodo',
      'getTodosRequest',
      'getTodosSuccess',
      'getTodosFailure',
      'postTodoRequest',
      'postTodoSuccess',
      'postTodoFailure',
      'putTodoRequest',
      'putTodoSuccess',
      'putTodoFailure',
      'openTodoForm',
      'closeTodoForm',
      'setTodoSchema',
    ]);
  });

  it('should create a reducer to handle all common actions', () => {
    const todos = createSliceFor('todos');

    const { reducer } = todos;

    const selectTodoAction = createAction('todos/selectTodo', { name: 'Todo' });
    const getTodosRequestAction = createAction('todos/getTodosRequest');
    const getTodosSuccessAction = createAction('todos/getTodosSuccess', {
      data: [{ name: 'todos' }],
      page: 1,
      total: 1,
    });
    const getTodosFailureAction = createAction(
      'todos/getTodosFailure',
      new Error()
    );
    const postTodoRequestAction = createAction('todos/postTodoRequest');
    const postTodoSuccessAction = createAction('todos/postTodoSuccess');
    const postTodoFailureAction = createAction(
      'todos/postTodoFailure',
      new Error()
    );
    const putTodoRequestAction = createAction('todos/putTodoRequest');
    const putTodoSuccessAction = createAction('todos/putTodoSuccess');
    const putTodoFailureAction = createAction(
      'todos/putTodoFailure',
      new Error()
    );
    const openTodoFormAction = createAction('todos/openTodoForm');
    const closeTodoFormAction = createAction('todos/closeTodoForm');
    const setTodoSchemaAction = createAction('todos/setTodoSchema', {
      name: 'Todo Schema',
    });

    // assertions
    expect(typeof reducer).toBe('function');
    expect(reducer(undefined, {})).toEqual(initialDefaultState);

    expect(reducer(initialDefaultState, selectTodoAction)).toEqual({
      ...initialDefaultState,
      selected: selectTodoAction.payload,
    });

    expect(reducer(initialDefaultState, getTodosRequestAction)).toEqual({
      ...initialDefaultState,
      loading: true,
    });

    expect(reducer(initialDefaultState, getTodosSuccessAction)).toEqual({
      ...initialDefaultState,
      list: [...getTodosSuccessAction.payload.data],
      page: getTodosSuccessAction.payload.page,
      total: getTodosSuccessAction.payload.total,
      loading: false,
    });

    expect(reducer(initialDefaultState, getTodosFailureAction)).toEqual({
      ...initialDefaultState,
      error: getTodosFailureAction.payload,
      loading: false,
    });

    expect(reducer(initialDefaultState, postTodoRequestAction)).toEqual({
      ...initialDefaultState,
      posting: true,
    });

    expect(
      reducer({ ...initialDefaultState, posting: true }, postTodoSuccessAction)
    ).toEqual({
      ...initialDefaultState,
      posting: false,
    });

    expect(
      reducer({ ...initialDefaultState, posting: true }, postTodoFailureAction)
    ).toEqual({
      ...initialDefaultState,
      posting: false,
      error: postTodoFailureAction.payload,
    });

    expect(reducer(initialDefaultState, putTodoRequestAction)).toEqual({
      ...initialDefaultState,
      posting: true,
    });

    expect(
      reducer({ ...initialDefaultState, posting: true }, putTodoSuccessAction)
    ).toEqual({
      ...initialDefaultState,
      posting: false,
    });

    expect(
      reducer({ ...initialDefaultState, posting: true }, putTodoFailureAction)
    ).toEqual({
      ...initialDefaultState,
      posting: false,
      error: putTodoFailureAction.payload,
    });

    expect(reducer(initialDefaultState, openTodoFormAction)).toEqual({
      ...initialDefaultState,
      showForm: true,
    });

    expect(
      reducer({ ...initialDefaultState, showForm: true }, closeTodoFormAction)
    ).toEqual({
      ...initialDefaultState,
      showForm: false,
    });

    expect(reducer(initialDefaultState, setTodoSchemaAction)).toEqual({
      ...initialDefaultState,
      schema: setTodoSchemaAction.payload,
    });
  });
});
