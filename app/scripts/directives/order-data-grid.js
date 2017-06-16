'use strict';

/**
 * @ngdoc directive
 * @name arpWebApp.directive:orderDataGrid
 * @description
 * # orderDataGrid
 */
angular.module('arpWebApp')
  .directive('orderDataGrid', function (OrderAttributes, UIGridCellTemplates) {
    return {
      template: '<div ng-if="enableOrderRejectionFeature" ui-grid="gridOptions" ui-grid-selection class="grid" ui-grid-resize-columns></div> <div ng-if="!enableOrderRejectionFeature" ui-grid="gridOptions" class="grid" ui-grid-resize-columns></div>',
      restrict: 'E',
      scope: {
        data: '=',
        enableOrderRejectionFeature: '=',
        selection: '='
      },
      link: function postLink($scope, element, attrs) {
        var PENDING_ORDER_STATUS = 'PENDING';

        $scope.data = $scope.data || [];
        $scope.gridOptions = {
          multiSelect: true,
          enableSelectAll: true,
          enableSorting: true,
          enableFiltering: true,
          enableColumnResizing: true,
          columnDefs: [],
          isRowSelectable: function (row) {
            return row.entity.arpOrderStatus === PENDING_ORDER_STATUS;
          },
          onRegisterApi: function (gridApi) {
			console.log('onRegisterApi : in right place 1.........................');
            $scope.selection = gridApi.selection;
          }
        };
        var orderAttributes = _.filter(OrderAttributes, function (attr) {
			console.log('filter: in right place 1.........................');
          return _.indexOf(attr.scope, attrs.gridType) >= 0;
        });

        angular.forEach(orderAttributes, function (attr) {
          var colDef = {
            field: attr.id,
            displayName: attr.label,
            cellTooltip: true,
            headerTooltip: true,
            type: attr.dataType
          };

          if (attr.dataType === 'date') {
            // We filter the date from milliseconds to human readable format
            colDef.width = UIGridCellTemplates.dateCell.width;
            colDef.cellTemplate = UIGridCellTemplates.dateCell.template;
          }

          if (attr.id === 'arpOrderStatus') {
            // This is a custom template to show tooltip on error status cell explaning the reasons
            colDef.cellTemplate = UIGridCellTemplates.errorDescription.template;
          }

          $scope.gridOptions.columnDefs.push(colDef);
        });

        $scope.$watch('data', function () {
          if ($scope.data) {
			console.log('watch: in right place 1.........................');
            $scope.gridOptions.data = $scope.data;
          }
        });
      }
    };
  });
