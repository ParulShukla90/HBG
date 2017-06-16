'use strict';

/**
 * @ngdoc service
 * @name arpWebApp.role
 * @description
 * # role
 * Constant in the arpWebApp.
 */

var RoleType = function (ENV) {
  this.RW = ENV.roleTypes.RW;
  this.RO = ENV.roleTypes.RO;
};

angular.module('arpWebApp')
  .service('RoleType', RoleType);
