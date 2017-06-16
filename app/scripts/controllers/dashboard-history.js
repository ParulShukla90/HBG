'use strict';

/**
 * @ngdoc function
 * @name arpWebApp.controller:DashboardHistoryCtrl
 * @description
 * # DashboardHistoryCtrl
 * Controller of the arpWebApp
 */
angular.module('arpWebApp')
  .controller('DashboardHistoryCtrl', function ($scope, api) {
    $scope.fetchLatestData = function () {
      api.getHistory($scope.searchFilter).then(function (response) {
        $scope.data = response.data;
      }, function () {
        // Handle error
      });
    };

    $scope.fetchLatestData();

    $scope.clearFilters = function () {
      resetFilter();
      $scope.fetchLatestData();
    };

    var resetFilter = function () {
      $scope.searchFilter = {
        isbn: null,
        plannerSegment: null,
        purchaseOrderNumber: null,
        searchDateType: null,
        searchDateFrom: null,
        searchDateTo: null
      };
    };
  });
