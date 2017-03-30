(function(window, angular, undefined){
    angular.module('chatApp')
        .controller("chatCtrl", ['$scope', function($scope){
            var vm = this;
            vm.test = "Yes chat is created!";
        }])
})(window, window.angular);