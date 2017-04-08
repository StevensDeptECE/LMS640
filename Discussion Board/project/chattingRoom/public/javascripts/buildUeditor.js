var APP = angular.module('chatApp', ["ng.ueditor"]); 
APP.controller("CTRL", ["$scope", function($S) {
    console.log("im working");
   $S._simpleConfig = {
     toolbars: [
       ['FullScreen', 'Source', 'Undo', 'Redo', 'Bold', 'test']
     ],
     autoClearinitialContent: true,
     wordCount: false,
     elementPathEnabled: false
   };

   $S.content = 'Hello Ueditor';

 }]);