import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const stakeholderActions = generateExposedActions(
  'stakeholder',
  actions,
  dispatch
);

export const {
  clearStakeholderFilters,
  clearStakeholdersSort,
  closeStakeholderForm,
  deleteStakeholder,
  filterStakeholders,
  getStakeholders,
  getStakeholder,
  selectStakeholder,
  openStakeholderForm,
  paginateStakeholders,
  postStakeholder,
  putStakeholder,
  refreshStakeholders,
  searchStakeholders,
  setStakeholderSchema,
  sortStakeholders,
} = stakeholderActions;
