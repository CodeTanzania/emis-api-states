import generateExposedActions from '../helpers';
import { actions, dispatch } from '../store';

const resourceActions = generateExposedActions('resource', actions, dispatch);

export const {
  getResources,
  getResource,
  selectResource,
  closeResourceForm,
  openResourceForm,
  postResource,
  putResource,
  setResourceSchema,
} = resourceActions;
