angular.module('arpWebApp')
  .controller('OrderRejectionCtrl', function ($uibModalInstance, selectedOrders, api, $rootScope) {
    var $ctrl = this;

    $ctrl.selectedOrders = selectedOrders;

    $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $ctrl.rejectOrders = function (orders) {
      beforeOrderRejectionProcess();
      api.rejectOrders(orders).then(orderRejectionSuccess, orderRejectionFailure);
    };

    var resetRejectionProcessOutputMessage = function () {
      $ctrl.rejectionProcessOutputMessage = {
        description: '',
        success: false,
        selectedISBNs: []
      };
    };

    var beforeOrderRejectionProcess = function () {
      resetRejectionProcessOutputMessage();
    };

    var orderRejectionFailure = function () {
      $ctrl.rejectionProcessOutputMessage.description = 'There was a problem while rejecting the selected orders. Please try again in a while and contact your administrator if the problem persists.';
      $ctrl.rejectionProcessOutputMessage.success = false;
    };

    var orderRejectionSuccess = function () {
      $ctrl.rejectionProcessOutputMessage.description = 'The following title(s) will be removed from your order. Please update your forecast in Demantra.';
      $ctrl.rejectionProcessOutputMessage.success = true;
      $ctrl.rejectionProcessOutputMessage.selectedISBNs = _.map($ctrl.selectedOrders, 'isbn');

      $ctrl.selectedOrders = [];
      $rootScope.$emit("orders-updated");
    };
  });
