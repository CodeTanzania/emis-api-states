import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const planActions = generateExposedActions('plan', actions, dispatch);

export const {
  clearPlansFilter,
  clearPlansSort,
  closePlanForm,
  filterPlans,
  getPlans,
  getPlan,
  selectPlan,
  openPlanForm,
  paginatePlans,
  postPlan,
  putPlan,
  refreshPlans,
  searchPlans,
  setPlanSchema,
  sortPlans,
} = planActions;
