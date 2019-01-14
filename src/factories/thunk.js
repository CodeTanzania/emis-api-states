import * as Client from '@codetanzania/emis-api-client';
import { pluralize, singularize } from 'inflection';
import toLower from 'lodash/toLower';
import upperFirst from 'lodash/upperFirst';
import { actions } from '../store';

/**
 * Thunk factory. Expose all common thunks for resources
 *
 * Custom thunk implementations can be added to the specific resource
 * actions module
 *
 * @function
 * @name createThunkFor
 *
 * @param {string} resource - Resource name
 * @return {Object} thunks
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export default function createThunksFor(resource) {
  const pluralName = upperFirst(pluralize(resource));
  const singularName = upperFirst(singularize(resource));
  const resourceName = toLower(singularName);

  return {
    [`get${pluralName}`]: param => dispatch => {
      dispatch(actions[resourceName][`get${pluralName}Request`]());
      return Client[`get${pluralName}`](param)
        .then(data =>
          dispatch(actions[resourceName][`get${pluralName}Success`](data))
        )
        .catch(error =>
          dispatch(actions[resourceName][`get${pluralName}Failure`](error))
        );
    },
    [`get${singularName}`]: param => dispatch => {
      dispatch(actions[resourceName][`get${singularName}Request`]());
      return Client[`get${singularName}`](param)
        .then(data =>
          dispatch(actions[resourceName][`get${singularName}Success`](data))
        )
        .catch(error =>
          dispatch(actions[resourceName][`get${singularName}Failure`](error))
        );
    },
    [`post${singularName}`]: param => dispatch => {
      dispatch(actions[resourceName][`post${singularName}Request`]());
      return Client[`post${singularName}`](param)
        .then(data =>
          dispatch(actions[resourceName][`post${singularName}Success`](data))
        )
        .catch(error =>
          dispatch(actions[resourceName][`post${singularName}Failure`](error))
        );
    },
    [`put${singularName}`]: param => dispatch => {
      dispatch(actions[resourceName][`put${singularName}Request`]());
      return Client[`put${singularName}`](param)
        .then(data =>
          dispatch(actions[resourceName][`put${singularName}Success`](data))
        )
        .catch(error =>
          dispatch(actions[resourceName][`put${singularName}Failure`](error))
        );
    },
  };
}
