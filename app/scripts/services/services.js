"use strict";

var services = angular.module('getStocksApp.services', ['ngResource']).config(function ($httpProvider) {
	  //$httpProvider.defaults.transformResponse = [];
});

services.factory("Stock",['$resource', function($resource){
	return $resource('http://echo.jsontest.com/value/:ticker', 
		{ticker: '@ticker', "callback": "JSON_CALLBACK"}, 
		{
			get: {
				method: 'JSONP',
				transformResponse: function (data, headers){
					return ({value: data.value});
				},
				isArray: false
			},
			getName: {
				method: 'JSONP', 
				url: 'http://finance.yahoo.com/webservice/v1/symbols/:ticker/quote', 
				params: {format: 'json'},
				transformResponse: function (data, headers){
					return ({value: data.list.resources[0].resource.fields.name});
				},
				isArray: false
			},
			getExchange: {
				method: 'JSONP',
				url: 'http://finance.google.com/finance/info',
				params: {client: 'ig', q: '@q'},
				transformResponse: function (data, headers){
					return ({value: data[0].e})
				},
				isArray: false
			}
		});
}]);

services.factory('StockLoader', ['Stock','$q', 'StockLoaderName', function (Stock, $q, StockLoaderName){
	return function(stockObj){
		var defer = $q.defer();
		Stock.get({ticker: stockObj.query}, function (stock){
			defer.resolve(stock);
		}, function (){
			defer.reject('unable to fetch stock ' + stockObj.query);
		});

		return defer.promise;
	};
}]);

services.factory('StockLoaderName', ['Stock','$q', function (Stock, $q){
	return function(stockObj){
		var defer = $q.defer();
		Stock.getName({ticker: stockObj.ticker.value}, function (stock){
			defer.resolve(stock);
		}, function (){
			defer.reject('unable to fetch stock ' + stockObj.ticker.value);
		});

		return defer.promise;
	};
}]);

services.factory('StockLoaderExchange', ['Stock','$q', function (Stock, $q){
	return function(stockObj){
		var defer = $q.defer();
		Stock.getExchange({q: stockObj.ticker.value}, function (stock){
			defer.resolve(stock);
		}, function (){
			defer.reject('unable to fetch stock ' + stockObj.ticker.value);
		});
		return defer.promise;
	};
}]);