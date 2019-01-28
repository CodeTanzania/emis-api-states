import * as client from '@codetanzania/emis-api-client';
import { pluralize, singularize } from 'inflection';
import lowerFirst from 'lodash/lowerFirst';
import upperFirst from 'lodash/upperFirst';
import isFunction from 'lodash/isFunction';
import camelize from '../helpers';
import { actions } from '../store';

/**
 * @function
 * @name createThunkFor
 * @description Create and expose all common thunks for a resource.
 *
 * Custom thunk implementations can be added to the specific resource
 * actions module
 *
 * @param {string} resource - resource name
 * @returns {Object} thunks - resource thunks
 *
 * @version 0.2.0
 * @since 0.1.0
 */
export default function createThunksFor(resource) {
  const pluralName = upperFirst(pluralize(resource));
  const singularName = upperFirst(singularize(resource));
  const resourceName = lowerFirst(singularName);
  const storeKey = lowerFirst(pluralName);

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
    [camelize('post', singularName)]: (
      param,
      onSuccess,
      onError
    ) => dispatch => {
      dispatch(
        actions[resourceName][camelize('post', singularName, 'request')]()
      );
      return client[camelize('post', singularName)](param)
        .then(data => {
          dispatch(
            actions[resourceName][camelize('post', singularName, 'success')](
              data
            )
          );

          // custom provided onSuccess callback
          if (isFunction(onSuccess)) {
            onSuccess();
          }
        })
        .catch(error => {
          dispatch(
            actions[resourceName][camelize('post', singularName, 'failure')](
              error
            )
          );

          // custom provided onError callback
          if (isFunction(onError)) {
            onError();
          }
        });
    },
    [camelize('put', singularName)]: (
      param,
      onSuccess,
      onError
    ) => dispatch => {
      dispatch(
        actions[resourceName][camelize('put', singularName, 'request')]()
      );
      return client[camelize('put', singularName)](param)
        .then(data => {
          dispatch(
            actions[resourceName][camelize('put', singularName, 'success')](
              data
            )
          );

          // custom provided onSuccess callback
          if (isFunction(onSuccess)) {
            onSuccess();
          }
        })
        .catch(error => {
          dispatch(
            actions[resourceName][camelize('put', singularName, 'failure')](
              error
            )
          );

          // custom provided onError callback
          if (isFunction(onError)) {
            onError();
          }
        });
    },
    [camelize('filter', pluralName)]: (
      filter,
      onSuccess,
      onError
    ) => dispatch => {
      dispatch(actions[resourceName][camelize('filter', pluralName)](filter));
      dispatch(actions[resourceName][camelize('get', pluralName, 'request')]());

      return client[camelize('get', pluralName)]({ filter })
        .then(data => {
          dispatch(
            actions[resourceName][camelize('get', pluralName, 'success')](data)
          );

          // custom provided onSuccess callback
          if (isFunction(onSuccess)) {
            onSuccess();
          }
        })
        .catch(error => {
          dispatch(
            actions[resourceName][camelize('get', pluralName, 'failure')](error)
          );

          // custom provided onError callback
          if (isFunction(onError)) {
            onError();
          }
        });
    },
    [camelize('refresh', pluralName)]: (onSuccess, onError) => (
      dispatch,
      getState
    ) => {
      dispatch(actions[resourceName][camelize('get', pluralName, 'request')]());

      const { page, filter } = getState()[storeKey];

      return client[camelize('get', pluralName)]({ page, filter })
        .then(data => {
          dispatch(
            actions[resourceName][camelize('get', pluralName, 'success')](data)
          );

          // custom provided onSuccess callback
          if (isFunction(onSuccess)) {
            onSuccess();
          }
        })
        .catch(error => {
          dispatch(
            actions[resourceName][camelize('get', pluralName, 'failure')](error)
          );

          // custom provided onError callback
          if (isFunction(onError)) {
            onError();
          }
        });
    },
    [camelize('search', pluralName)]: (
      query,
      onSuccess,
      onError
    ) => dispatch => {
      dispatch(actions[resourceName][camelize('get', pluralName, 'request')]());

      return client[camelize('get', pluralName)]({ q: query })
        .then(data => {
          dispatch(
            actions[resourceName][camelize('get', pluralName, 'success')](data)
          );

          // custom provided onSuccess callback
          if (isFunction(onSuccess)) {
            onSuccess();
          }
        })
        .catch(error => {
          dispatch(
            actions[resourceName][camelize('get', pluralName, 'failure')](error)
          );

          // custom provided onError callback
          if (isFunction(onError)) {
            onError();
          }
        });
    },
    [camelize('sort', pluralName)]: (order, onSuccess, onError) => dispatch => {
      dispatch(actions[resourceName][camelize('sort', pluralName)](order));
      dispatch(actions[resourceName][camelize('get', pluralName, 'request')]());

      return client[camelize('get', pluralName)]({ sort: order })
        .then(data => {
          dispatch(
            actions[resourceName][camelize('get', pluralName, 'success')](data)
          );

          // custom provided onSuccess callback
          if (isFunction(onSuccess)) {
            onSuccess();
          }
        })
        .catch(error => {
          dispatch(
            actions[resourceName][camelize('get', pluralName, 'failure')](error)
          );

          // custom provided onError callback
          if (isFunction(onError)) {
            onError();
          }
        });
    },
    [camelize('paginate', pluralName)]: (
      page,
      onSuccess,
      onError
    ) => dispatch => {
      dispatch(actions[resourceName][camelize('get', pluralName, 'request')]());

      return client[camelize('get', pluralName)]({ page })
        .then(data => {
          dispatch(
            actions[resourceName][camelize('get', pluralName, 'success')](data)
          );

          // custom provided onSuccess callback
          if (isFunction(onSuccess)) {
            onSuccess();
          }
        })
        .catch(error => {
          dispatch(
            actions[resourceName][camelize('get', pluralName, 'failure')](error)
          );

          // custom provided onError callback
          if (isFunction(onError)) {
            onError();
          }
        });
    },
  };
}
