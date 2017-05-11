var app = angular.module('myApp', ['ngRoute', 'ui.bootstrap'])

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
            templateUrl: 'project.html',
            controller: ''
        })
        .when('/info/:projectId', {
            templateUrl: 'info.html',
            controller: ''
        })
})
app.controller('mainController', function($scope) {
    $scope.posts = [];
    $scope.newPost = { created_by: '', text: '', created_at: '' };

    $scope.post = function() {
        $scope.newPost.created_at = Date.now();
        $scope.posts.push($scope.newPost);
        $scope.newPost = { created_by: '', text: '', created_at: '' };
    };

});

app.controller('authController', function($scope) {
    $scope.user = { username: '', password: '' };
    $scope.error_message = '';

    $scope.login = function() {
        //placeholder until authentication is implemented
        $scope.error_message = 'login request for ' + $scope.user.username;
    };

    $scope.register = function() {
        //placeholder until authentication is implemented
        $scope.error_message = 'registeration request for ' + $scope.user.username;
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