import camelCase from 'lodash/camelCase';

/**
 * @function
 * @name camelize
 * @description Joins names and generate camelCase of joined words them
 *
 * @param {...string} words - list of words to join and camelize
 * @returns {string} camelCase of joined words
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export default function camelize(...words) {
  return camelCase([...words].join(' '));
}
