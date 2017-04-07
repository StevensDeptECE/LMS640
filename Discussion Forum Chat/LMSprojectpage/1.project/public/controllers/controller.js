var myApp = angular.module('myApp', ['ngRoute']);
  
myApp.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'project.html',
      controller: 'AppCtrl'
    })
    .when('/info', {
      templateUrl: 'info.html',
      controller: 'AppCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
});



myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
    
    $scope.showMe = false;
    $scope.myFunc = function() {
        $scope.showMe = !$scope.showMe;
    };

    $scope.uploadFile = function(){
               var file = $scope.myFile;
               
               console.log('file is ' );
               console.dir(file);
               
               var uploadUrl = "/fileUpload";
               fileUpload.uploadFileToUrl(file, uploadUrl);
            };


var refresh = function() {
  $http.get('/projectlist').success(function(response) {
    console.log("I got the data I requested");
    $scope.projectlist = response;
    $scope.project = "";
  });
};

refresh();


$scope.addproject = function() {
  console.log($scope.project);
  $http.post('/projectlist', $scope.project).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/projectlist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/projectlist/' + id).success(function(response) {
    $scope.project = response;
  });
};

$scope.get = function(id) {
  console.log(id);
  $http.get('/projectlist/' + id).success(function(response) {
    $scope.project = response;
  });
};

$scope.update = function() {
  console.log($scope.project._id);
  $http.put('/projectlist/' + $scope.project._id, $scope.project).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.project = "";
}


}]);﻿
