import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const roleActions = generateExposedActions('role', actions, dispatch);

export const {
  getRoles,
  getRole,
  selectRole,
  closeRoleForm,
  openRoleForm,
  postRole,
  putRole,
  setRoleSchema,
} = roleActions;
