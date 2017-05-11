var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap', 'ngResource']).run(function($rootScope, $http) {
    $rootScope.authenticated = false;
    $rootScope.current_user = "";

    $rootScope.logout = function() {
        $http.get('/auth/logout', function() {

        })
        $rootScope.authenticated = false;
        $rootScope.current_user = "Guest";
    };

});

app.config(function($routeProvider) {
    $routeProvider
    //the timeline display
        .when('/', {
            templateUrl: 'display.html',
            controller: 'TabsDemoCtrl'
        })
        //the login display
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'authController'
        })
        //the signup display
        .when('/register', {
            templateUrl: 'register.html',
            controller: 'authController'
        })
        .when('/discussion', {
            templateUrl: 'discussion.html',
            controller: 'discussionCtrl'
        })
        .when('/project', {
            templateUrl: 'main.html',
            controller: 'mainController'
        })
        .when('/info/:projectId', {
            templateUrl: 'info.html',
            controller: 'infoCtrl'
        })
});

app.factory('postService', function($resource) {
    return $resource('/api/posts/:id');
});

app.controller('mainController', function($scope, $rootScope, postService) {
    $scope.posts = postService.query();
    $scope.newPost = { created_by: '', text: '', created_at: '' };
    /*
    //used for basic read from json
    	postService.getAll().success(function(data){
    		$scope.posts = data;
    	});
    */
    $scope.post = function() {
        $scope.newPost.created_by = $rootScope.current_user;
        $scope.newPost.created_at = Date.now();
        postService.save($scope.newPost, function() {
            $scope.posts = postService.query();
            $scope.newPost = { created_by: '', text: '', created_at: '' };
        });
    };
    $scope.delete = function(post) {
        postService.delete({ id: post._id });
        $scope.posts = postService.query();
    };
});
app.controller('authController', function($scope, $http, $rootScope, $location) {
    $scope.user = { username: '', password: '' };
    $scope.error_message = '';

    $scope.login = function() {
        $http.post('/auth/login', $scope.user).success(function(data) {
            if (data.state == 'success') {
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $location.path('/');
            } else {
                $scope.error_message = data.message;
            }
        });
    };

    $scope.register = function() {
        $http.post('/auth/signup', $scope.user).success(function(data) {
            if (data.state == 'success') {
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $location.path('/');
            } else {
                $scope.error_message = data.message;
            }
        });
    };
});

app.controller('TabsDemoCtrl', function($scope) {
    $scope.tabs = [
        { title: 'CPE-640', content: 'CPE-640' },
        { title: 'CPE-640', content: 'group one' }
    ];
    $scope.tabs1 = [
        { title: 'student', content: 'student 1' },
        { title: 'group', content: 'group 1' }
    ];

});