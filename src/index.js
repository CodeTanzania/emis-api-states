import forIn from 'lodash/forIn';
import get from 'lodash/get';
import isObject from 'lodash/isObject';
import React from 'react';
import { Provider } from 'react-redux';
import store from './configure';

/**
 * Store Provider for EMIS store
 *
 * @function
 * @name StoreProvider
 *
 * @param {Object} props
 * @param {ReactComponent} props.children
 * @returns {ReactComponent} Provider
 * @version 0.1.0
 * @since 0.1.0
 */
export const StoreProvider = (
  { children } //eslint-disable-line
) => <Provider store={store}>{children}</Provider>;

/**
 * Expose simplified connect function
 *
 * @function
 * @name connect
 *
 * @param {ReactComponent} component
 * @param {Object|function} stateToProps
 * @return {ReactComponent} - React component which is injected with props
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function connect(component, stateToProps = null) {
  let mapStateToProps = stateToProps;

  if (isObject(mapStateToProps)) {
    mapStateToProps = state => {
      const mappedState = {};

      forIn(mapStateToProps, (value, key) => {
        mappedState[key] = get(state, value);
      });

      return mappedState;
    };
  }

  return connect(mapStateToProps)(component);
}
