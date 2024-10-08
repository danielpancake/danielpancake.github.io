/**
 * This module contains common functions that are used in other places on the site.
 */

export function chainFunctions(fn1, fn2) {
  return function () {
    if (fn1) fn1();
    if (fn2) fn2();
  }
}
