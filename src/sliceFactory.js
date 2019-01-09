import { pluralize, singularize } from 'inflection';
import upperFirst from 'lodash/upperFirst';
import { createSlice } from 'redux-starter-kit';

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

export default function createSliceFor(slice) {
  const plural = pluralize(slice);
  const singular = singularize(slice);
  const upperFirstPlural = upperFirst(plural);
  const upperFirstSingular = upperFirst(singular);

  return createSlice({
    slice: plural,
    initialState: initialDefaultState,
    reducers: {
      [`select${upperFirstSingular}`]: (state, action) =>
        Object.assign({}, state, { selected: action.payload }),
      [`get${upperFirstPlural}Request`]: state =>
        Object.assign({}, state, { loading: true }),
      [`get${upperFirstPlural}Success`]: (state, action) =>
        Object.assign({}, state, {
          list: [...action.payload.data],
          page: action.payload.page,
          total: action.payload.total,
          loading: false,
        }),
      [`get${upperFirstPlural}Failure`]: (state, action) =>
        Object.assign({}, state, { error: action.payload, loading: false }),
      [`post${upperFirstSingular}Request`]: state =>
        Object.assign({}, state, { posting: true }),
      [`post${upperFirstSingular}Success`]: state =>
        Object.assign({}, state, { posting: false }),
      [`post${upperFirstSingular}Failure`]: (state, action) =>
        Object.assign({}, state, { error: action.payload, posting: false }),
      [`put${upperFirstSingular}Request`]: state =>
        Object.assign({}, state, { posting: true }),
      [`put${upperFirstSingular}Success`]: state =>
        Object.assign({}, state, { posting: false }),
      [`put${upperFirstSingular}Failure`]: (state, action) =>
        Object.assign({}, state, { posting: false, error: action.payload }),
      [`open${upperFirstSingular}Form`]: state =>
        Object.assign({}, state, { showForm: true }),
      [`close${upperFirstSingular}Form`]: state =>
        Object.assign({}, state, { showForm: false }),
      [`set${upperFirstSingular}Schema`]: (state, action) =>
        Object.assign({}, state, { schema: action.payload }),
    },
  });
}
