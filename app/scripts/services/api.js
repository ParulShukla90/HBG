'use strict';

/**
 * @ngdoc service
 * @name arpWebApp.api
 * @description
 * # api
 * Service in the arpWebApp.
 */
var API = function ($http, ENV) {
  this.httpService = $http;
  this.apiUrlPrefix = ENV.apiEndpoint + '/api/v1';
};

API.prototype.getPending = function () {
  return this.httpService.get(this.apiUrlPrefix + '/orders/pending');
  // return this.httpService.get('http://www.mocky.io/v2/586cb0fb120000010411f0ad');
  // return this.httpService.get('http://www.mocky.io/v2/5876236910000006058b5bdf');
  // return this.httpService.get('http://www.mocky.io/v2/58873077100000631d25e19e');
};

var _sanitizeFilter = function (filter) {
  filter = _.omitBy(filter, function (value) {
    return (typeof value === 'undefined') || value === null || value === '';
  });

  filter = _.mapValues(filter, function (value) {
    return _.isDate(value) ? moment(value).format('L') : value;
  });

  return filter;
};

API.prototype.getHistory = function (filter) {
  if (filter) {
    filter = _sanitizeFilter(filter);
  } else {
    filter = {};
  }

  return this.httpService.get(this.apiUrlPrefix + '/orders/history', {params: filter});
  // return this.httpService.get('http://www.mocky.io/v2/5885e49d0f00005735ff6638');
};

API.prototype.rejectOrders = function (orders) {
  return this.httpService.patch(this.apiUrlPrefix + '/orders', orders.map(function (order) {
    //return this.httpService.patch('http://www.mocky.io/v2/58762edd100000b8058b5bf8', orders.map(function (order) {
    return {
      id: order.id,
      arpOrderStatus: 'REJECTED'
    };
  }));
};

API.prototype.doLogin = function (username, password) {
  return this.httpService.post(this.apiUrlPrefix + '/session', {
    // return this.httpService.post('http://www.mocky.io/v2/588b3dfc300000871afa8d88', {
    username: username,
    password: password
  });
};

API.prototype.doLogout = function () {
  return this.httpService.delete(this.apiUrlPrefix + '/session');
};

angular.module('arpWebApp')
  .service('api', API);
