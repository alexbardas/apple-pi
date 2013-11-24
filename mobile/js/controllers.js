'use strict';

angular.module('controllers')
.controller('Login', function ($scope, $location, $timeout, Api, Cookie) {
    $scope.user = {
        username: '',
        password: ''
    };

    var showError = function () {
        $timeout(function () {
            $scope.showError = false;
        }, 5000);
    };

    $scope.logIn = function () {
        if (!$scope.user.username || !$scope.user.password) {
            showError();
        }

        Api
            .post('login/', { user: $scope.user.username, pass: $scope.user.password })
            .success(function (data) {
                if (data && data.token) {
                    Cookie.set('token', data.token);
                    $location.path('/dashboard');
                }
            })
            .error(function (data) {
                $scope.showError = true;
                showError();
            });
    }
})
.controller('Dashboard', function ($scope, $location, Api, DS, User, Cookie) {
    $scope.user = User;
    Api
        .get('location/')
        .success(function (data) {
            DS.location = data;
            $scope.location = DS.location;
        });

    $scope.friends = DS.friends;

    $scope.openLeft = function () {
        $scope.sideMenuController.toggleLeft();
    };

    $scope.openRight = function () {
        $scope.sideMenuController.toggleRight();
    };

    $scope.logOut = function () {
        $location.path('/');
    };

    $scope.checkIn = function () {
        Api
            .post('checkin/', {token: Cookie.get('token')})
            .success(function (data) {
                User.hasCheckedIn = true;
            })
    }

    $scope.checkOut = function () {
        Api
            .post('checkout/', {token: Cookie.get('token')})
            .success(function (data) {
                User.hasCheckedIn = false;
            })
    }
})
.controller('Profile', function ($scope, User) {
    $scope.user = {
        fn: User.fn,
        ln: User.ln
    }
})
.controller('Location', function ($scope, DS) {
    $scope.location = DS.location;
})
.controller('AddFriend', function ($scope, $location, $timeout, Api, DS) {
    $scope.friend = {
        name: ''
    };

    $scope.addFriend = function () {
        if (!$scope.friend.name.length) {
            $scope.showError = true;
            $timeout(function () {
                $scope.showError = false;
            }, 5000);
        }
        Api
            .post('friend/add', {name: $scope.friend.name})
            .success(function () {

            })
            .error(function () {

            });
        $location.path('/dashboard');
    };
});

angular.module('resolvers').Location = function ($q, Api) {
    var deferred = $q.defer();
    return Api
        .get('location/')
        .success(function (data) {
            deferred.resolve(data);
        });

    return deferred.promise;
};