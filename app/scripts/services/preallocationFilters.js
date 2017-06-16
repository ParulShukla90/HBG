'use strict';

/**
 * @ngdoc service
 * @name otcWebApp.preallocationFilters
 * @description
 * # api
 * Service in the otcWebApp.
 */
var preallocationFilters = function ($http, ENV) {
  this.httpService = $http;
  this.apiUrlPrefix = ENV.apiEndpoint + '/api/v1';
};

preallocationFilters.prototype.getOwners = function () {
  return otc.owners;
};

preallocationFilters.prototype.getItems = function () {
  return otc.books;
};

preallocationFilters.prototype.getForm = function () {
  return otc.form;
};

preallocationFilters.prototype.getData = function () {
  return otc.data;
};

preallocationFilters.prototype.getBillTo = function () {
  return otc.billTo;
};

preallocationFilters.prototype.getRG = function (ownerCode) {
    var rg =[];
    var i = 0;
    for ( i = 0; i < otc.rg.length; i++){
        if(otc.rg[i]['owner'] === ownerCode){
            rg.push(otc.rg[i]);
        }
    }
    return rg;
};
preallocationFilters.prototype.getCat1 = function (rgCode) {
    var cat1 =[];
    var i = 0;
    for ( i = 0; i < otc.cat1.length; i++){
        if(otc.cat1[i]['rg'] === rgCode){
            cat1.push(otc.cat1[i]);
        }
    }
    return cat1;
};

preallocationFilters.prototype.getCat2 = function (cat1Code) {
    var cat2 =[];
    var i = 0;
    for ( i = 0; i < otc.cat2.length; i++){
        if(otc.cat2[i]['cat1'] === cat1Code){
            cat2.push(otc.cat2[i]);
        }
    }
    return cat2;
};

preallocationFilters.prototype.getSubForm = function (formCode) {
    var subForm =[];
    var i = 0;
    for ( i = 0; i < otc.subForm.length; i++){
        if(otc.subForm[i]['form'] === formCode){
            subForm.push(otc.subForm[i]);
        }
    }
    return subForm;
};

angular.module('otcWebApp')
  .service('preallocationFilters', preallocationFilters);
