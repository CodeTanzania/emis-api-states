import generateExposedActions from '../helpers';
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
