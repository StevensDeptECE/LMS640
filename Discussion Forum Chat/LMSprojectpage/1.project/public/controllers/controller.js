var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


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
