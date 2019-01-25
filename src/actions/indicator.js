import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const indicatorActions = generateExposedActions('indicator', actions, dispatch);

export const {
  getIndicators,
  getIndicator,
  selectIndicator,
  closeIndicatorForm,
  openIndicatorForm,
  postIndicator,
  putIndicator,
  setIndicatorSchema,
} = indicatorActions;
