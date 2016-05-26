'use strict';

/**
 * Module dependencies
 */

// Public node modules.
const _ = require('lodash');

/**
 * This `before` function is run before generating targets.
 * Validate, configure defaults, get extra dependencies, etc.
 *
 * @param {Object} scope
 * @param {Function} cb
 */

module.exports = function (scope, cb) {
  if (!scope.rootPath || !scope.args[0]) {
    return cb.invalid('Usage: `$ strapi generate:controller controllerName apiName`');
  }

  // `scope.args` are the raw command line arguments.
  _.defaults(scope, {
    id: scope.args[0],
    api: scope.args[1]
  });

  // Determine default values based on the available scope.
  _.defaults(scope, {
    globalID: _.capitalize(scope.id),
    ext: '.js'
  });

  // Take another pass to take advantage of the defaults absorbed in previous passes.
  _.defaults(scope, {
    rootPath: scope.rootPath,
    filename: _.capitalize(scope.id + scope.ext)
  });

  // Humanize output.
  _.defaults(scope, {
    humanizeId: scope.args[0],
    humanizedPath: '`./api/' + scope.api + '/controllers`'
  });

  // Trigger callback with no error to proceed.
  return cb();
};