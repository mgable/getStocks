'use strict';

angular.module('getStocksApp')
  .controller('MainCtrl', function ($scope, StockLoader,StockLoaderName, StockLoaderExchange) {
  	$scope.stock = {ticker: "", price: "", exchange: "", name: "", query: ""};

  	$scope.getStock = function(){
  		//$scope.stock.ticker = StockLoader($scope.stock);
		StockLoader($scope.stock).then(function(response){
			$scope.stock.ticker = response;
			StockLoaderName($scope.stock).then(function(response){
				$scope.stock.name = response;
			});
			StockLoaderExchange($scope.stock).then(function(response){
				$scope.stock.exchange = response;
			})
  		});
		
	};
  });
