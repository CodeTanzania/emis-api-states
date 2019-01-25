import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const planActions = generateExposedActions('plan', actions, dispatch);

export const {
  getPlans,
  getPlan,
  selectPlan,
  closePlanForm,
  openPlanForm,
  postPlan,
  putPlan,
  setPlanSchema,
} = planActions;
