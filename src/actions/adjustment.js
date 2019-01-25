import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const adjustmentActions = generateExposedActions(
  'adjustment',
  actions,
  dispatch
);

export const {
  getAdjustments,
  getAdjustment,
  selectAdjustment,
  closeAdjustmentForm,
  openAdjustmentForm,
  postAdjustment,
  putAdjustment,
  setAdjustmentSchema,
} = adjustmentActions;