import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const resourceActions = generateExposedActions('resource', actions, dispatch);

export const {
  clearResourcesFilter,
  clearResourcesSort,
  closeResourceForm,
  filterResources,
  getResources,
  getResource,
  selectResource,
  openResourceForm,
  paginateResources,
  postResource,
  putResource,
  searchResources,
  setResourceSchema,
  sortResources,
} = resourceActions;
