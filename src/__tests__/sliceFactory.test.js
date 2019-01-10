import createSliceFor from '../factories/slice';

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

  describe('Generated Reducer', () => {
    it('should handle select action', () => {
      const todos = createSliceFor('todos');

      const { reducer } = todos;
      const selectTodoAction = createAction('todos/selectTodo', {
        name: 'Todo',
      });
      expect(reducer(initialDefaultState, selectTodoAction)).toEqual({
        ...initialDefaultState,
        selected: selectTodoAction.payload,
      });
    });

    it('should handle get resources request action', () => {
      const todos = createSliceFor('todos');

      const { reducer } = todos;

      const getTodosRequestAction = createAction('todos/getTodosRequest');

      expect(reducer(initialDefaultState, getTodosRequestAction)).toEqual({
        ...initialDefaultState,
        loading: true,
      });
    });

    it('should handle get resources success action', () => {
      const todos = createSliceFor('todos');

      const { reducer } = todos;

      const getTodosSuccessAction = createAction('todos/getTodosSuccess', {
        data: [{ name: 'todos' }],
        page: 1,
        total: 1,
      });

      expect(reducer(initialDefaultState, getTodosSuccessAction)).toEqual({
        ...initialDefaultState,
        list: [...getTodosSuccessAction.payload.data],
        page: getTodosSuccessAction.payload.page,
        total: getTodosSuccessAction.payload.total,
        loading: false,
      });
    });

    it('should handle get resource failure action', () => {
      const todos = createSliceFor('todos');

      const { reducer } = todos;

      const getTodosFailureAction = createAction(
        'todos/getTodosFailure',
        new Error()
      );

      expect(reducer(initialDefaultState, getTodosFailureAction)).toEqual({
        ...initialDefaultState,
        error: getTodosFailureAction.payload,
        loading: false,
      });
    });

    it('should handle post resource request action', () => {
      const todos = createSliceFor('todos');

      const { reducer } = todos;

      const postTodoRequestAction = createAction('todos/postTodoRequest');

      expect(reducer(initialDefaultState, postTodoRequestAction)).toEqual({
        ...initialDefaultState,
        posting: true,
      });
    });

    it('should handle post request success action', () => {
      const todos = createSliceFor('todos');

      const { reducer } = todos;

      const postTodoSuccessAction = createAction('todos/postTodoSuccess');

      expect(
        reducer(
          { ...initialDefaultState, posting: true },
          postTodoSuccessAction
        )
      ).toEqual({
        ...initialDefaultState,
        posting: false,
      });
    });

    it('should handle post request failure action', () => {
      const todos = createSliceFor('todos');

      const { reducer } = todos;

      const postTodoFailureAction = createAction(
        'todos/postTodoFailure',
        new Error()
      );

      expect(
        reducer(
          { ...initialDefaultState, posting: true },
          postTodoFailureAction
        )
      ).toEqual({
        ...initialDefaultState,
        posting: false,
        error: postTodoFailureAction.payload,
      });
    });

    it('should handle put request action', () => {
      const todos = createSliceFor('todos');

      const { reducer } = todos;

      const putTodoRequestAction = createAction('todos/putTodoRequest');

      expect(reducer(initialDefaultState, putTodoRequestAction)).toEqual({
        ...initialDefaultState,
        posting: true,
      });
    });

    it('should handle put success action', () => {
      const todos = createSliceFor('todos');

      const { reducer } = todos;

      const putTodoSuccessAction = createAction('todos/putTodoSuccess');

      expect(
        reducer({ ...initialDefaultState, posting: true }, putTodoSuccessAction)
      ).toEqual({
        ...initialDefaultState,
        posting: false,
      });
    });

    it('should handle put failure action', () => {
      const todos = createSliceFor('todos');

      const { reducer } = todos;

      const putTodoFailureAction = createAction(
        'todos/putTodoFailure',
        new Error()
      );

      expect(
        reducer({ ...initialDefaultState, posting: true }, putTodoFailureAction)
      ).toEqual({
        ...initialDefaultState,
        posting: false,
        error: putTodoFailureAction.payload,
      });
    });

    it('should handle open resource form action', () => {
      const todos = createSliceFor('todos');

      const { reducer } = todos;

      const openTodoFormAction = createAction('todos/openTodoForm');

      expect(reducer(initialDefaultState, openTodoFormAction)).toEqual({
        ...initialDefaultState,
        showForm: true,
      });
    });

    it('should handle close resource form action', () => {
      const todos = createSliceFor('todos');

      const { reducer } = todos;

      const closeTodoFormAction = createAction('todos/closeTodoForm');

      expect(
        reducer({ ...initialDefaultState, showForm: true }, closeTodoFormAction)
      ).toEqual({
        ...initialDefaultState,
        showForm: false,
      });
    });

    it('should handle set resource schema action', () => {
      const todos = createSliceFor('todos');

      const { reducer } = todos;

      const setTodoSchemaAction = createAction('todos/setTodoSchema', {
        name: 'Todo Schema',
      });

      expect(reducer(initialDefaultState, setTodoSchemaAction)).toEqual({
        ...initialDefaultState,
        schema: setTodoSchemaAction.payload,
      });
    });

    it('should handle invalid action', () => {
      const todos = createSliceFor('todos');

      const { reducer } = todos;

      expect(typeof reducer).toBe('function');
      expect(reducer(undefined, {})).toEqual(initialDefaultState);
    });
  });
});
