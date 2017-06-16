'use strict';

/**
 * @ngdoc function
 * @name arpWebApp.controller:LogoutCtrl
 * @description
 * # LogoutCtrl
 * Controller of the arpWebApp
 */
angular.module('arpWebApp')
  .controller('LogoutCtrl', function ($state, api, localStorageService) {
    api.doLogout().then(function () {
      localStorageService.remove('session');
      $state.transitionTo('login');
    });
  });
