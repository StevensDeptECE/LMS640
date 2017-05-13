<!DOCTYPE html>
<html>
 <head>
        <meta charset="utf-8">
        <title>Course</title>
         <link rel="stylesheet" media="screen" href="/HomeWork/style.css">
        <link rel="stylesheet" href="/HomeWork/css/bootstrap.min.css">
       
        
    </head>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<body ng-app="myApp">
     <div id = "login">
          <p>
              <a href="">Hello, Yu!</a>
          </p>
    </div>
    <div ng-app="myApp" ng-controller="myCtrl" id = "courseDashboard">
        <div>
            <h1>Course</h1>
        </div>
        <table>
            <tr ng-repeat="x in courses">
                <td><img ng-src = "{{x.img}}"/></td>
                <td> <h3><a href = ""/> {{x.name}}</h3></td>  
            </tr>
        </table>
        </div>
    <div id = "createcourse">
            <p>Create </p>
        </div>
    <script>
    var app = angular.module("myApp", []);
    app.controller("myCtrl", function($scope) {
      $scope.courses = [
        {
          "img" : "../img/nodeJS.jpg",
          "name" : "NodeJS"
        },
        {
          "img" : "../img/mongoDB.jpg",
          "name" : "mongoDB"
        },
        {
          "img" : "../img/js.jpg",
          "name" : "Javascript"
        },
        {
          "img" : "../img/angulerJS.jpg",
          "name" : "AngularJS"
        }
      ]
    });
    </script>

</body>
</html>