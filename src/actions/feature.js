import generateExposedActions from '../helpers';
import { actions, dispatch } from '../store';

const featureActions = generateExposedActions('feature', actions, dispatch);

export const {
  getFeatures,
  getFeature,
  selectFeature,
  closeFeatureForm,
  openFeatureForm,
  postFeature,
  putFeature,
  setFeatureSchema,
} = featureActions;
