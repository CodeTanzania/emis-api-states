import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const roleActions = generateExposedActions('role', actions, dispatch);

export const {
  clearRolesFilter,
  clearRolesSort,
  closeRoleForm,
  filterRoles,
  getRoles,
  getRole,
  selectRole,
  openRoleForm,
  paginateRoles,
  postRole,
  putRole,
  refreshRoles,
  searchRoles,
  setRoleSchema,
  sortRoles,
} = roleActions;
