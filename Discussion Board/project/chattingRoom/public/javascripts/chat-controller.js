(function(window, angular, undefined){
    angular.module('chatApp', ['ng.ueditor','infinite-scroll','luegg.directives'])

        .controller('chatCtrl', ['$rootScope', '$scope', function($rootScope, $scope, $S){
            $scope._simpleConfig = {
                toolbars: [['Undo', 'Redo', 'Bold', 'emotion', 'fontsize']],
                autoHeightEnabled:false,
                autoFloatEnabled:true,
                elementPathEnabled:false,
                enableContextMenu:false,
                initialFrameHeight:150,
                enableAutoSave:false,
                autoClearinitialContent: true,
                focus:true,
                wordCount: false
               };
                $scope.content = 'hello world!!';
            $scope.glued = true;
            var temp = undefined;
            var vm = this;
            var socket = window.io('localhost:3000/');
            vm.username = undefined;
   

            vm.newMessage = undefined;
            vm.messages=[];

            // how should we do when new message hit
                socket.on("receive-message", function(msg){
                    var temp1 = angular.fromJson(msg);
                    console.log("received message");
                    $scope.$apply(function(){
                        vm.messages.push(temp1);
                    });
                    
                });
                
            vm.username = "admin";
            
            // send message with username and content
            vm.sendMessage = function(){
                vm.date = new Date().toTimeString().substr(0, 8);
                
                var newMessage = {
                    "username": vm.username,
                    "message": $scope.content,
                    "date": vm.date
                };
                // shot out when data is ready
                socket.emit("new-message", angular.toJson(newMessage));
                $scope.content = "";
                // clear the variable since we are good developer
                temp = undefined;
            
            };
            
            // get username from modern-user which is adopted in another module called user-controller-creation.js
            /*$rootScope.$on('modern-user', function(event, data){
                vm.username = data;                
            });
            */
            $rootScope.$on('send-message', function(event, msg){
                console.log("come on dude!");
                vm.newMessage = msg;
                console.log("come on dude!", vm.newMessage);
            });
            $scope.$watch(function(){
                return vm.username;
            }, function(){
                if(vm.username){
                    console.log("this is value for username", vm.username);
                }
            })
            // create username and give it to vm.username
            vm.createUserName = function(username){
                console.log("I got username haha!!");
                vm.username = username;
            };
        }])
        // implement html code into page, so that page can show the right content
        .filter('to_trusted', ['$sce', function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text);
            };
        }])

})(window, window.angular);