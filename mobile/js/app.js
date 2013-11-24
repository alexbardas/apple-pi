'use strict';

angular.module('controllers', []);
angular.module('services', []);
angular.module('directives', []);
angular.module('resolvers', []);

angular.module('apple-pi', ['ionic', 'controllers', 'services', 'directives', 'resolvers'])
.config(function ($compileProvider){
    // Needed for phonegap routing
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})
.config(function ($routeProvider) {
    var Resolvers = angular.module('resolvers');

    $routeProvider
        .when('/', {
            redirectTo: '/login'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'Login'
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'Dashboard'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'Profile'
        })
        .when('/location', {
            templateUrl: 'views/location.html',
            controller: 'Location',
            resolve: {
                location: Resolvers.Location
            },
        })
        .when('/friend/add', {
            templateUrl: '/views/add-friend.html',
            controller: 'AddFriend'
        })
        .otherwise('/');
});