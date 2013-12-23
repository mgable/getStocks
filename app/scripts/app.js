'use strict';

angular.module('getStocksApp', ['ngRoute', 'ngResource', 'getStocksApp.services'], function(){
})
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          StockLoader: function(StockLoader){
            return StockLoader;
          },
          StockLoaderName: function(StockLoaderName){
            return StockLoaderName;
          },
          StockLoaderExchange: function(StockLoaderExchange){
            return StockLoaderExchange;
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  });
