(function() {
    'use strict';

    var app = angular.module('main.layout', ['main.home', 'main.about', 'main.authentication']);
    
    app.controller('LayoutController', ['$window', '$scope', 'authenticationFactory', function($window, $scope, authenticationFactory) {
        $scope.signOut = function(e) {
            e.preventDefault();
            $window.localStorage.removeItem('oauth');
        }
        
        function init() {
            $scope.$watch(function() {
                return $window.localStorage.getItem('oauth') === null;
            }, function(value) {
                $scope.showSignInLink = value;
                $scope.oauth = null;
            });
            
            $scope.$watch(function() {
                return $window.localStorage.getItem('oauth') !== null;
            }, function(value) {
                $scope.showSignOutLink = value;
                $scope.oauth = JSON.parse($window.localStorage.getItem('oauth'));
                $scope.signOutLinkText = $scope.oauth ? $scope.oauth.displayname : '';
            });
        }
        
        init();
        
    }]);

    app.directive('layout', [function(){
        return {
            restrict: 'E',
            templateUrl: '/modules/layout/partials/layout-partial.html',
            controller: 'LayoutController',
            scope: {
                title: '@title',
                description: '@description',
                year: '@year'
            }
        };
    }]);

})();