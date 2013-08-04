'use strict';

/* Controllers */

function CategoryCtrl($scope, $routeParams, Ecwid) {
    $scope.category = Ecwid.getCategory({id: $routeParams.categoryId});
    $scope.$emit('categoryChange');

    $scope.startDragging = function(event, ui) {
        $(ui.helper[0]).css('z-index',100000);
    };
}

function ProductCtrl($scope, $routeParams, Ecwid) {
    $scope.amount = 1;
    $scope.product = Ecwid.getProduct({id: $routeParams.productId}, function(product) {
        $scope.mainImageUrl = product.imageUrl;
    });

    $scope.setImage = function(imageUrl) {
        $scope.mainImageUrl = imageUrl;
    }
}

function MenuCtrl($scope, $routeParams, Ecwid) {
    var menuUtils = new MenuUtils();
    Ecwid.getCategories(function(categories) {
        $scope.mainMenu = menuUtils.buildTrees(categories);
        $scope.setActiveMenu($routeParams.categoryId);
        $scope.menuTemplate = 'partials/menu.html'
    });

    $scope.setActiveMenu = function(categoryId) {
        if (categoryId != null) {
            $scope.activeCategory = categoryId;
            $scope.activeRootMenu = menuUtils.getRoot(categoryId);
        }
    }

    $scope.currentCategories = function() {
        return menuUtils.getPathToRoot($routeParams.categoryId);
    }

    $scope.$on('categoryChange', function(event) {
        $scope.setActiveMenu($routeParams.categoryId);
    });
}

function CartCtrl($scope, LocalStorage) {
    $scope.itemsInCartArray = [];
    $scope.itemsInCart = LocalStorage.items;
    $scope.cartWidget = 'partials/cart-widget.html'

    $scope.dropCallback = function() {
        var newElement = $scope.itemsInCartArray[$scope.itemsInCartArray.length - 1];
        LocalStorage.addItem(newElement, 1);
    };

    $scope.saveItems = function() {
        LocalStorage.saveItems();
    };

    $scope.clearItems = function() {
        LocalStorage.clearItems();
        $scope.itemsInCart = LocalStorage.items;
    }

    $scope.addItem = function (item, amount) {
        LocalStorage.addItem(item, amount);
    }

    $scope.isEmptyCart = function() {
        return $scope.itemsInCart == null || LocalStorage.isEmpty($scope.itemsInCart);
    }

    $scope.getTotalPrice = function() {
        return LocalStorage.getTotalPrice();
    }
}
