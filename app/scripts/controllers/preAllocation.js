'use strict';

/**
 * @ngdoc function
 * @name otcWebApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the otcWebApp
 */
angular.module('otcWebApp')
  .controller('preAllocationCtrl', function ($scope, preallocationFilters, toaster) {
    $scope.otc = {};
    $scope.searchType = 'family';
    $scope.ft = {};
    $scope.today = new Date();
    $scope.format = 'MMMM-dd-yyyy';
    $scope.popup = {};
    $scope.dateOptions = {
      minDate: new Date()
    };
    $scope.active = true;

    $scope.changeData = function(){
      $scope.gridOptionsFT.data = _.filter($scope.getData(),{ 'inactive' : !$scope.active })
    }

    $scope.compDate = function(exp) {
      var expDate = new Date(exp);
      return $scope.today > expDate;
    };
    
    var getTemplate = function (field,qty) {
      if (qty) {
        return '<div ng-class="{\'expiredData\': grid.appScope.compDate(row.entity.expDate)}" class="ui-grid-cell-contents" title="TOOLTIP">{{row.entity.' +field+ '}}</p></div>' 
      }
      if (field == 'exp') {
        return '<div ng-class="{\'expiredData\': grid.appScope.compDate(row.entity.expDate)}" class="ui-grid-cell-contents" title="TOOLTIP">{{row.entity.expDate | date : "shortDate"}}</p></div>' 
      }
      return '<div ng-class="{\'expiredData\': grid.appScope.compDate(row.entity.expDate)}" class="ui-grid-cell-contents" title="TOOLTIP">{{row.entity.'+ field +'.title}}<p>{{row.entity.'+ field +'.code}}</p></div>'
    };

    var getTemplateBool = function (field) {
      return '<div ng-class="{\'expiredData\': grid.appScope.compDate(row.entity.expDate)}" class="ui-grid-cell-contents" title="TOOLTIP">{{row.entity.' +field+ '?"Yes":"No"}}</div>'
    };

    $scope.getData = function() {
      return preallocationFilters.getData();
    };

    $scope.clearData = function() {
      $scope.ft = {};
      $scope.selectedItem = null;
      $scope.$broadcast('angucomplete-alt:clearInput');
      $scope.searchType = 'family';
      $scope.selectedItem = null;
      $scope.newRec = {};
    }
    
    $scope.goToStep2 = function() {
      
    }

    $scope.init = function() {
      $scope.getOwners();
      $scope.getItems();
      $scope.getForm();
      $scope.getBillTo();
    };
    
    $scope.gridOptionsFT = {
        enableSorting : true,
        enablePaginationControls: true,
        columnDefs : [
          { name : 'Owner', field : 'owner.title', cellTemplate : getTemplate('owner') },
          { name : 'Reporting Group', field : 'rg.title', cellTemplate : getTemplate('rg') },
          { name : 'Category 1', field : 'cat1.title', cellTemplate : getTemplate('cat1')},
          { name : 'Category 2', field : 'cat2.title', cellTemplate : getTemplate('cat2'), visible:false },
          { name : 'Format', field : 'form.title', cellTemplate : getTemplate('form') },
          { name : 'Sub-format', field : 'subForm.title', cellTemplate : getTemplate('subForm'), visible:false },
          { name : 'Item Code', field : 'item.code', cellTemplate : getTemplate('item') },
          { name : 'Bill To', field : 'billTo.title', cellTemplate : getTemplate('billTo') },
          { name : 'Expiration Date', field : 'expDate', cellTemplate : getTemplate('exp') },
          { name : 'Default Preallocated Quantity', field : 'defaultQty', cellTemplate : getTemplate('defaultQty', true) },
          { name : 'Usable minimum', field : 'usableMin', cellTemplate : getTemplate('usableMin', true) },
          { name : '% If Falls Below', field : 'percentFallsBelow', cellTemplate : getTemplate('percentFallsBelow', true) },
          { name : 'Pre-release', field : 'pr', cellTemplate : getTemplateBool('pr'), visible:false },
          { name : 'Override NYP', field : 'nyp', cellTemplate : getTemplateBool('nyp') }
        ],
        data :  _.filter($scope.getData(),{ 'inactive' : !$scope.active }),
        enableGridMenu : true,
        enableFiltering : true,
        paginationPageSizes: [25, 50, 75,100],
        paginationPageSize: 25,
        exporterCsvFilename : 'myFile.csv',
        onRegisterApi: function(gridApi) {
          $scope.gridApi = gridApi;
        }
    };
    
    $scope.getOwners = function() {
      $scope.otc.owners = preallocationFilters.getOwners();
    };

    $scope.getItems = function() {
      $scope.otc.items = preallocationFilters.getItems();
    };
    $scope.getBillTo = function() {
      $scope.otc.billTo = preallocationFilters.getBillTo();
    };
    $scope.getRG = function(data) {
      $scope.ft.owner = data;
      if (!$scope.ft.owner) {
        return;
      }
      if (!$scope.ft.owner.hasOwnProperty('originalObject')) {
        return;
      }
      $scope.otc.rg = preallocationFilters.getRG($scope.ft.owner.originalObject.code);
    };

    $scope.getCat1 = function(data) {
      $scope.ft.rg = data;
      if (!$scope.ft.rg) {
        return;
      }
      if (!$scope.ft.rg.hasOwnProperty('originalObject')) {
        return;
      }
      $scope.otc.cat1 = preallocationFilters.getCat1($scope.ft.rg.originalObject.code);
    };
    
    $scope.getCat2 = function(data) {
      $scope.ft.cat1 = data;
      if (!$scope.ft.cat1) {
        return;
      }

      if (!$scope.ft.cat1.hasOwnProperty('originalObject')) {
        return;
      }
      $scope.otc.cat2 = preallocationFilters.getCat2($scope.ft.cat1.originalObject.code);
    };

    $scope.getForm = function() {
      $scope.otc.form = preallocationFilters.getForm();
    };

    $scope.getSubForm = function(data) {
      $scope.ft.form = data;
      if (!$scope.ft.form) {
        return;
      }
      if (!$scope.ft.form.hasOwnProperty('originalObject')) {
        return;
      }
      $scope.otc.subForm = preallocationFilters.getSubForm($scope.ft.form.originalObject.code);
    };

    $scope.setItem = function(data) {
      $scope.selectedItem = data ? (data.originalObject ? data.originalObject : null) : null;
    };

    $scope.saveData = function() {
      var rc = $scope.newRec;
      console.log(rc)
      // rc.billTo = rc.billTo.originalObject;
      if ($scope.searchType == 'family') {
        rc.type = 1;
        rc.owner = $scope.ft.owner.originalObject;
        rc.rg = $scope.ft.rg.originalObject;
        rc.cat1 = $scope.ft.cat1.originalObject;
        rc.cat2 = $scope.ft.cat2.originalObject;
        rc.form = $scope.ft.form.originalObject;
        rc.subForm = $scope.ft.subForm.originalObject;
      }else if ($scope.searchType == 'item') {
        rc.type = 2;
        rc.item = $scope.selectedItem;
      }
      $scope.gridOptionsFT.data.unshift(rc);
      $("#step2").modal('hide');
      // gridApi.core.notifyDataChange( uiGridConstants.dataChange.ALL)  
      $scope.clearData();
      toaster.success({title: "Success", body:"Pre-allocation criteria added successfully."});
    }

    $scope.init();
});
