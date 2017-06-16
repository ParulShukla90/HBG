'use strict';

/**
 * @ngdoc overview
 * @name otcWebApp
 * @description
 * # otcWebApp
 *
 * Main module of the application.
 */
var otcWebApp = angular
  .module('otcWebApp', [
    'toaster',
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',  'ui.bootstrap',
    'LocalStorageModule',
    'angucomplete-alt',
    'ui.grid', 'ui.grid.exporter', 'ui.grid.pagination'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $locationProvider.html5Mode(false).hashPrefix('!');
    $urlRouterProvider.otherwise('/preAllocation');

    $stateProvider
      
      .state('preAllocation', {
        url: '/preAllocation',
        views:{
          "":{
            controller: 'preAllocationCtrl',
            templateUrl: 'views/preAllocation/preAllocation.html'
          },
          "sidebar":{
            templateUrl: 'views/sidebar.html'
          },
          "header":{
            templateUrl: 'views/header.html'
          }
        }
      })
      
      .state('404', {
        url: '/404',
        templateUrl: '404.html'
      });
  });
