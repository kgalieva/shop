'use strict';

/* App Module */
var App = angular.module('shop', ['ecwidServices', 'localStorageServices', 'ngDragDrop']);
App.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/product/:productId', {templateUrl: 'partials/product-detail.html',   controller: ProductCtrl}).
      when('/category/:categoryId', {templateUrl: 'partials/product-list.html',   controller: CategoryCtrl}).
      when('/index', {templateUrl: 'partials/main.html',   controller: MenuCtrl}).
      when('/cart', {templateUrl: 'partials/cart.html', controller: CartCtrl}).
      otherwise({redirectTo: '/index'});
}]);

App.constant('cartName','shoppingCart');

