import forIn from 'lodash/forIn';
import get from 'lodash/get';
import isFunction from 'lodash/isFunction';
import isObject from 'lodash/isObject';
import React from 'react';
import { connect, Provider } from 'react-redux';
import { store } from './store';

/* eslint-disable */
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
 * @example
 * import {StoreProvider} from '@codetanzania/emis-api-states';
 *
 * ReactDom.render(<StoreProvider><App /></StoreProvider>,
 * document.getElementById('root'));
 */
export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
/* eslint-enable */

/**
 * Expose simplified connect function
 *
 * This function subscribe component to the store and inject props
 * to the component
 *
 * @function
 * @name Connect
 *
 * @param {ReactComponent} component
 * @param {Object|function} stateToProps
 * @return {ReactComponent} - React component which is injected with props
 *
 * @version 0.1.0
 * @since 0.1.0
 * @example
 * function AlertList({alerts}){
 *  return (
 *  ... jsx stuff
 * );
 * }
 *
 * export Connect(AlertList,{alerts:'alerts.list'})
 */
export function Connect(component, stateToProps = null) {
  let mapStateToProps = stateToProps;

  if (!isFunction(stateToProps) && isObject(stateToProps)) {
    mapStateToProps = state => {
      const mappedState = {};

      forIn(stateToProps, (value, key) => {
        mappedState[key] = get(state, value);
      });

      return mappedState;
    };
  }

  return connect(mapStateToProps)(component);
}

/* Export resource actions */
export * from './actions/activity';
export * from './actions/alert';
export * from './actions/assessment';
export * from './actions/feature';
export * from './actions/incident';
export * from './actions/incidentType';
export * from './actions/plan';
export * from './actions/procedure';
export * from './actions/questionnaire';
export * from './actions/resource';
export * from './actions/role';
export * from './actions/stakeholder';
