'use strict';

/**
 * @ngdoc service
 * @name arpWebApp.UIGridCellTemplates
 * @description
 * # UIGridCellTemplates
 * Constant in the arpWebApp.
 */
angular.module('arpWebApp')
  .constant('UIGridCellTemplates', {
    dateCell: {
      template: '<div class="ui-grid-cell-contents">' +
      '{{grid.getCellValue(row, col) | date:"LLLL dd, yyyy"}}' +
      '</div>',
      width: 120
    },
    errorDescription: {
      template: '<div class="grid-tooltip" uib-tooltip="{{ row.entity.errorDescription }}" tooltip-append-to-body="true">' +
      '<div class="ui-grid-cell-contents">' +
      '\{\{ COL_FIELD \}\}' +
      '</div>' +
      '</div>'
    }
  });
