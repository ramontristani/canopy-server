(function() {
    'use strict';

    var app = angular.module('main.layout', ['main.home', 'main.about']);

    app.directive('layout', [function(){
        return {
            restrict: 'E',
            templateUrl: '/modules/layout/partials/layout-partial.html',
            scope: {
                title: '@title',
                description: '@description',
                year: '@year'
            }
        };
    }]);

})();