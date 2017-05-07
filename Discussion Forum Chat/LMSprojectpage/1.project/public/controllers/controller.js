
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




 myApp.directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }]);
     myApp.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl){
           var fd = new FormData();
           fd.append('file', file);
           $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
           })
           .success(function(){
            //popup.windowPopup(500,500,"Upload Successful")
            //console.log("Upload Successful")
           })
           .error(function(){
            //window.alert("Ohh, Upload failed!")
           });
        }
     }]);

     /**** Controllers ****/
     myApp.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload){
        $scope.uploadFile = function(){
           var file = $scope.myFile;
           var uploadUrl = "/savedata";
           fileUpload.uploadFileToUrl(file, uploadUrl);
        };
     }]);  


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
      var ID = $scope.selectedProject;
      $scope.getProjectDetails = function(id) {
        console.log(id);
        ID=id;
        console.log("bibgv "+ID)
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

      $scope.edit = function(id) {
        console.log();
        $http.get('/projectlist/' + id).success(function(response) {
          $scope.project = response;
        });
      };  
      console.log(selectedProject);
      var refresh = function(id) {
        $http.get('/projectlist').success(function(response) {
          console.log("I got the data I requested");
          $scope.projectlist = response;
          $scope.project = "";
        });
        console.log(id);
        $http.get('/commentlist/' + id).success(function(response) {
          console.log("I got comment data I requested");
          $scope.commentlist = response;
          $scope.comment = "";
        });        
      };
      refresh(ID);

      $scope.update = function(id) {
        console.log(id);
        $http.put('/projectlist/' + id).success(function(response) {
          refresh();
        })
      };

      $scope.update = function() {
        console.log($scope.project._id);
        $http.put('/projectlist/' + $scope.project._id, $scope.project).success(function(response) {
          refresh();
        })
      };

      $scope.createComment = function (id){
        console.log(id);
        $http.post('/commentlist/'+ id, $scope.comment).success(function(response) {
          console.log(response);
          refresh(id);
        });
      }      
}

function AppCtrl($scope, $http, selectedProject){
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

