
var myApp = angular.module('myApp', ['ngRoute']);
  
myApp.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'project.html',
      controller: 'AppCtrl'
    })
    .when('/project',{
      templateUrl: 'project.html',
      controller:'AppCtrl'
    })
    .when('/info/:projectId', {
      templateUrl: 'info.html',
      controller: 'infoCtrl'
    })
    .when('/discussion',{
      templateUrl: 'discussion.html',
      controller: 'discussionCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
});


myApp.factory('selectedProject', function () {
    var selectedEntry = { id: 'projectId'};
    return {
        entry: selectedEntry,
        setSelectedID : function(id) { selectedEntry.id = id; },
        getSelectedID : function () { return selectedEntry.id; }
    };
});


/**** Controllers ****/

function discussionCtrl($scope,$http) {

console.log("Hello World from controller");   
var refresh= function(){
  $http.get('/discussionlist').success(function(response){
      console.log("I got the data I requested");
      $scope.discussionlist=response;
      $scope.discussion = "";
    }); 
};


refresh();

$scope.addPost = function(){
  console.log($scope.discussion);
  $http.post('/discussionlist',$scope.discussion).success(function(response){
    console.log(response);
    refresh();
  });
};

$scope.reply = function(id){
  console.log(id);
  $http.post('/discussionlist' ,$scope.discussion).success(function(response){
    console.log(response);
    refresh();
  });
};


$scope.remove = function(id){
  console.log(id);
  $http.delete('/discussionlist/'+id).success(function(response){
    refresh();
  });
};

}

function infoCtrl($scope, $http, selectedProject){
  console.log("Hello World from info controller");
      $scope.selectedProject = selectedProject.getSelectedID();
      console.log($scope.selectedProject);
      $scope.requestSent = false;
      $scope.getProjectDetails = function(id) {
        console.log(id);
        if($scope.project) {
          return project;
        }
        if(!$scope.requestSent) {
          $http.get('/projectlist/' + id).success(function(response) {
            $scope.project = response;
            $scope.requestSent = false;
          });
          $scope.requestSent = true;
        }
        return project;
      };

      $scope.edit = function() {
        console.log(id);
        $http.get('/projectlist/' + id).success(function(response) {
          $scope.project = response;
        });
      };

      var refresh = function() {
        $http.get('/projectlist').success(function(response) {
          console.log("I got the data I requested");
          $scope.projectlist = response;
          $scope.project = "";
        });
      };

      refresh();

      $scope.update = function() {
        console.log($scope.project._id);
        $http.put('/projectlist/' + $scope.project._id, $scope.project).success(function(response) {
          refresh();
        })
      };
}

function AppCtrl($scope, $http, selectedProject){
    console.log("Hello World from controller");
    
    
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
      };

      $scope.setSelectedProject = function(id) {
        //console.log(id);
        selectedProject.setSelectedID(id); 
      }
}

