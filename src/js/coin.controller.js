var app = angular.module("myShoppingList", []);

app.controller("myCtrl", function ($scope, $q) {
    $scope.products = [];

    $scope.symbol = ["ETH/BTC", "BTC/USD", "LTC/CNY", "ETH/EUR", "DOGE/LTC", "DASH/XRP", "ETH/JPY", "ZEC/XMR"];

    var allExchanges = ccxt.exchanges, exchange, successCallTicker = [], successCallPromises = [], eobj = {};

    $scope.refreshList = function () {

        allExchanges.map(function (ticker, index) {
            $scope.products = [];
            successCallTicker = [];
            exchange = new ccxt[ticker]();

            exchange.fetchTicker($scope.selectedSymbol).then(function (data) {
                data.exchange = ticker;
                $scope.products.push(data);
                eobj[ticker] = data;
                successCallTicker.push(ticker);
                $scope.$apply();
            });
        });

    };

    setInterval(function () {

        successCallTicker.map(function (ticker, index) {
            $scope.products = [];
            exchange = new ccxt[ticker]();
            exchange.fetchTicker($scope.selectedSymbol).then(function (data) {
                data.exchange = ticker;
                $scope.products.push(data);
                $scope.$apply();
            });
        });

    }, 5000);

    $scope.refreshList();

});