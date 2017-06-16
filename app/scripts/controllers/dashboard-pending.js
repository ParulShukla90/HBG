'use strict';

/**
 * @ngdoc function
 * @name arpWebApp.controller:DashboardPendingCtrl
 * @description
 * # DashboardPendingCtrl
 * Controller of the arpWebApp
 */
angular.module('arpWebApp')
  .controller('DashboardPendingCtrl', function ($scope, api, $uibModal, $rootScope, $state, userRole, RoleType) {
    if (!userRole) {
      $state.transitionTo('login');
    }

    var PENDING_ORDER_STATUS = 'PENDING';

    var $ctrl = this;

    var hasPendingOrders = function (orders) {
      if (_.find(orders, function (order) {
          return order.arpOrderStatus === PENDING_ORDER_STATUS;
        })) {
        return true;
      } else {
        return false;
      }
    };

    $ctrl.initRejection = function (selectedOrders) {
      $uibModal.open({
        templateUrl: 'views/dashboard/rejection-warning.html',
        controller: 'OrderRejectionCtrl',
        controllerAs: '$ctrl',
        resolve: {
          selectedOrders: function () {
            return selectedOrders;
          }
        }
      });
    };

    var refreshRecords = function () {
      $scope.data = null;
      $scope.enableOrderRejectionFeature = false;

      api.getPending().then(function (response) {
        var data = response.data;
        $scope.poDetails = {};
        if (data.length > 0) {
          $ctrl.hasOrders = true;
          $scope.poDetails.purchaseOrderNumber = data[0].purchaseOrderNumber;
          $scope.poDetails.scheduledPOSubmissionDate = data[0].scheduledPOSubmissionDate;
        } else {
          $ctrl.hasOrders = false;
        }
        $scope.data = response.data;
        $scope.hasPendingOrders = hasPendingOrders($scope.data);
        $scope.enableOrderRejectionFeature = (userRole === RoleType.RW) && $scope.hasPendingOrders;
      }, function () {
        // Handle error
      });
    };

    $rootScope.$on('orders-updated', refreshRecords);

    refreshRecords();
  });
