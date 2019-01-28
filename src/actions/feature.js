import generateExposedActions from '../factories/action';
import { actions, dispatch } from '../store';

const featureActions = generateExposedActions('feature', actions, dispatch);

export const {
  clearFeaturesFilter,
  clearFeaturesSort,
  closeFeatureForm,
  filterFeatures,
  getFeatures,
  getFeature,
  selectFeature,
  openFeatureForm,
  paginateFeatures,
  postFeature,
  putFeature,
  searchFeatures,
  setFeatureSchema,
  sortFeatures,
} = featureActions;
