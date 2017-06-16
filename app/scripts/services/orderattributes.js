'use strict';

/**
 * @ngdoc service
 * @name arpWebApp.PendingOrderAttributes
 * @description
 * # PendingOrderAttributes
 * Constant in the arpWebApp.
 */
angular.module('arpWebApp')
  .constant('OrderAttributes', [
    {label: 'ISBN', id: 'isbn', dataType: 'string', scope: ['pending', 'history']},
    {label: 'Title', id: 'bookTitle', dataType: 'string', scope: ['pending', 'history']},
    {label: 'Publisher', id: 'publisher', dataType: 'string', scope: ['pending', 'history']},
    {label: 'Format', id: 'format', dataType: 'string', scope: ['pending', 'history']},
    {label: 'Planner Segment', id: 'plannerSegment', dataType: 'string', scope: ['pending', 'history']},
    {label: 'PO Create Date', id: 'plannedPOCreationDate', dataType: 'date', scope: ['pending', 'history']},
    {label: 'WHSE Due Date', id: 'projectedInWarehouseDate', dataType: 'date', scope: ['pending', 'history']},
    {label: 'Out of Stock Date', id: 'outOfStockDate', dataType: 'date', scope: ['pending', 'history']},
    {label: 'Carton Qty', id: 'cartonQuantity', dataType: 'number', scope: ['pending', 'history']},
    {label: 'Recommended Qty', id: 'recommendedQuantity', dataType: 'number', scope: ['pending', 'history']},
    {label: 'Lot Size', id: 'lotSize', dataType: 'number', scope: ['pending', 'history']},
    {label: 'Print Qty', id: 'printQuantity', dataType: 'number', scope: ['pending', 'history']},
    {label: 'Print Carton Count', id: 'printCartonQuantity', dataType: 'number', scope: ['pending', 'history']},
    {label: 'PO No.', id: 'purchaseOrderNumber', dataType: 'string', scope: ['history']},
    {label: 'Status', id: 'arpOrderStatus', dataType: 'string', scope: ['history']},
    {label: 'Submit Date', id: 'poEDITransmissionDate', dataType: 'date', scope: ['history']}
  ]);
