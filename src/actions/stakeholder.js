import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const stakeholderActions = generateExposedActions(
  'stakeholder',
  actions,
  dispatch
);

export const {
  getStakeholders,
  getStakeholder,
  selectStakeholder,
  closeStakeholderForm,
  openStakeholderForm,
  postStakeholder,
  putStakeholder,
  setStakeholderSchema,
} = stakeholderActions;
