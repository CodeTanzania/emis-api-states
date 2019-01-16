import * as client from '@codetanzania/emis-api-client';
import { pluralize, singularize } from 'inflection';
import toLower from 'lodash/toLower';
import upperFirst from 'lodash/upperFirst';
import { actions } from '../store';
import { camelize } from '../helpers';

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
    [camelize('get', pluralName)]: param => dispatch => {
      dispatch(actions[resourceName][camelize('get', pluralName, 'request')]());
      return client[camelize('get', pluralName)](param)
        .then(data =>
          dispatch(
            actions[resourceName][camelize('get', pluralName, 'success')](data)
          )
        )
        .catch(error =>
          dispatch(
            actions[resourceName][camelize('get', pluralName, 'failure')](error)
          )
        );
    },
    [camelize('get', singularName)]: param => dispatch => {
      dispatch(
        actions[resourceName][camelize('get', singularName, 'request')]()
      );
      return client[camelize('get', singularName)](param)
        .then(data =>
          dispatch(
            actions[resourceName][camelize('get', singularName, 'success')](
              data
            )
          )
        )
        .catch(error =>
          dispatch(
            actions[resourceName][camelize('get', singularName, 'failure')](
              error
            )
          )
        );
    },
    [camelize('post', singularName)]: param => dispatch => {
      dispatch(
        actions[resourceName][camelize('post', singularName, 'request')]()
      );
      return client[camelize('post', singularName)](param)
        .then(data =>
          dispatch(
            actions[resourceName][camelize('post', singularName, 'success')](
              data
            )
          )
        )
        .catch(error =>
          dispatch(
            actions[resourceName][camelize('post', singularName, 'failure')](
              error
            )
          )
        );
    },
    [camelize('put', singularName)]: param => dispatch => {
      dispatch(
        actions[resourceName][camelize('put', singularName, 'request')]()
      );
      return client[camelize('put', singularName)](param)
        .then(data =>
          dispatch(
            actions[resourceName][camelize('put', singularName, 'success')](
              data
            )
          )
        )
        .catch(error =>
          dispatch(
            actions[resourceName][camelize('put', singularName, 'failure')](
              error
            )
          )
        );
    },
  };
}
