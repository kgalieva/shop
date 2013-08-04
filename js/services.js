'use strict';

/* Services */

angular.module('ecwidServices', ['ngResource']).
    factory('Ecwid', function ($resource) {
        return $resource('https://appdev.ecwid.com/api/v1/2894003/:url', {callback: 'JSON_CALLBACK'},
            {
                getCategories: {method: 'JSONP', cache: true, params: {url: 'categories'}, isArray: true},
                getProducts: {method: 'JSONP', params: {url: 'products'}, isArray: true},
                getProduct: {method: 'JSONP', params: {url: 'product'}},
                getCategory: {method: 'JSONP', params: {url: 'category'}}
            }
        );
    });

angular.module('localStorageServices', []).service('LocalStorage', localStorageService);

