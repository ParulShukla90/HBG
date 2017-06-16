'use strict';

/**
 * @ngdoc service
 * @name arpWebApp.AuthIntercepter
 * @description
 * # AuthIntercepter
 * Service in the arpWebApp.
 */
angular.module('arpWebApp')
  .service('AuthIntercepter', function ($q, $injector, localStorageService) {
    var service = this;

    service.responseError = function (response) {
      if (response.status === 401) {
        localStorageService.remove('session');
        $injector.get('$state').transitionTo('login');
      }
      return $q.reject(response);
    };
  })
  .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('AuthIntercepter');
  }]);
