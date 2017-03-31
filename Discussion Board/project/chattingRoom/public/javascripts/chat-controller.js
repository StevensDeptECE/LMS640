(function(window, angular, undefined){
    angular.module('chatApp')
        .controller("chatCtrl", ['$rootScope', '$scope', function($rootScope, $scope){
            var vm = this;
            var socket = window.io('localhost:3000/');
            vm.date = new Date().toTimeString().substr(0, 8);

            vm.newMessage = undefined;
            vm.messages=[];
                socket.on("receive-message", function(msg){

                    $scope.$apply(function(){
                                            console.log("received message", msg);
                        vm.messages.push(msg);
                    });
                    
                });
            
            vm.username = undefined;
            vm.sendMessage = function(){
                var newMessage = {
                    username: vm.username,
                    message: vm.newMessage,
                    date: vm.date
                };
                socket.emit("new-message", newMessage);
                vm.newMessage = undefined;
            };
            
            
            $rootScope.$on('modern-user', function(event, data){
                vm.username = data;                
            });
            $scope.$watch(function(){
                return vm.username;
            }, function(){
                if(vm.username){
                    console.log("this is value for username", vm.username);
                }
            })
        }])
})(window, window.angular);