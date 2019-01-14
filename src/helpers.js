import { singularize } from 'inflection';
import forIn from 'lodash/forIn';
import get from 'lodash/get';
import merge from 'lodash/merge';
import upperFirst from 'lodash/upperFirst';
import createThunkFor from './factories/thunk';

/**
 * Generate all actions which are exposed from the library for consumers to use.
 * All exposed actions are wrapped in dispatch function so use should not have
 * call dispatch again
 *
 * @function
 * @name generateExposedActions
 *
 * @param {string} resource - Resource Name
 * @param {Object} thunks - Custom thunks to override/extends existing thunks
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export default function generateExposedActions(
  resource,
  actions,
  dispatch,
  thunks = null
) {
  const resourceName = singularize(upperFirst(resource));

  const generatedThunks = createThunkFor(resourceName);

  merge(generatedThunks, thunks);

  const extractedActions = {};

  extractedActions[`select${resourceName}`] = get(
    actions[resource],
    `select${resourceName}`
  );
  extractedActions[`open${resourceName}Form`] = get(
    actions[resource],
    `open${resourceName}Form`
  );
  extractedActions[`close${resourceName}Form`] = get(
    actions[resource],
    `close${resourceName}Form`
  );
  extractedActions[`set${resourceName}Schema`] = get(
    actions[resource],
    `set${resourceName}Schema`
  );

  const allActions = merge({}, extractedActions, generatedThunks);

  const wrappedDispatchThunkActions = {};

  forIn(allActions, (fn, key) => {
    wrappedDispatchThunkActions[key] = param => dispatch(fn(param));
  });

  return wrappedDispatchThunkActions;
}
