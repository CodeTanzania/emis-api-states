import { singularize, pluralize } from 'inflection';
import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import kebabCase from 'lodash/kebabCase';
import split from 'lodash/split';
import capitalize from 'lodash/capitalize';
import last from 'lodash/last';

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
export function camelize(...words) {
  return camelCase([...words].join(' '));
}

/**
 * @function
 * @name getNormalizeResourceName
 *
 * @param {string} resourceName - resource name to be normalized
 * @param {boolean} pluralizeLast - if last word or the resource name should
 * be plural
 * @returns {string} - normalize and first upper-cased resource name
 * @version 0.1.0
 * @since 0.1.0
 */
export function getNormalizeResourceName(resourceName, pluralizeLast = false) {
  const words = split(kebabCase(resourceName), '-');

  if (words.length > 1) {
    const lastWord = pluralizeLast
      ? pluralize(last(words))
      : singularize(last(words));

    words[words.length - 1] = lastWord;
    return upperFirst(camelCase(words.join('-')));
  }

  return pluralizeLast
    ? capitalize(pluralize(resourceName))
    : capitalize(singularize(resourceName));
}
