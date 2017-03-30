(function(window, angular, undefined){
    angular.module('chatApp', [])
        .controller("userCreationCtrl", ['$scope', function($scope){
            var vm = this;
            vm.test = "Yes user is created!";
        }])
})(window, window.angular);