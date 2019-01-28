import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const adjustmentActions = generateExposedActions(
  'adjustment',
  actions,
  dispatch
);

export const {
  clearAdjustmentsFilter,
  clearAdjustmentsSort,
  closeAdjustmentForm,
  filterAdjustments,
  getAdjustments,
  getAdjustment,
  selectAdjustment,
  openAdjustmentForm,
  paginateAdjustments,
  postAdjustment,
  putAdjustment,
  searchAdjustments,
  setAdjustmentSchema,
  sortAdjustments,
} = adjustmentActions;
