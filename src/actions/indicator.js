import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const indicatorActions = generateExposedActions('indicator', actions, dispatch);

export const {
  clearIndicatorsFilter,
  clearIndicatorsSort,
  closeIndicatorForm,
  filterIndicators,
  getIndicators,
  getIndicator,
  selectIndicator,
  openIndicatorForm,
  paginateIndicators,
  postIndicator,
  putIndicator,
  searchIndicators,
  setIndicatorSchema,
  sortIndicators,
} = indicatorActions;
