'use strict';

/**
 * @ngdoc function
 * @name arpWebApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the arpWebApp
 */
angular.module('arpWebApp')
  .controller('LoginCtrl', function (api, $state, localStorageService, RoleType) {
    var $ctrl = this;
    $ctrl.doLogin = function (username, password) {
      api.doLogin(username, password).then(function (response) {
          var userInfo = response.data;
          if (_.includes([RoleType.RW, RoleType.RO], userInfo.userrole)) {
            localStorageService.set('session', userInfo);
            $state.transitionTo('dashboard.pending');
          } else {
            $ctrl.loginError = 'You do not have permission to access this application. Please contact the administrators.';
          }
        },
        function (response) {
          $ctrl.loginError = response.data.message;
        });
    };
  });
