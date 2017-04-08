(function(window, angular, undefined){
    angular.module('chatApp', ["ng.ueditor"])
        .service('shareProperties', function(){
            var property = 'welcome';
        
            return{
                getProperty: function(){
                    return this.property;
                },
                setProperty: function(value){
                    this.property = this.value;
                }
            };
    })
        .controller("CTRL", ["$scope","$rootScope", function($S, $rootScope, shareProperties) {
            console.log("im working");
               $S._simpleConfig = {
                toolbars: [['Undo', 'Redo', 'Bold', 'emotion']],
                autoHeightEnabled:false,
                autoFloatEnabled:true,
                elementPathEnabled:false,
                enableContextMenu:false,
                initialFrameHeight:200,
                enableAutoSave:false,
                autoClearinitialContent: false,
                focus:true,
                wordCount: false
               };

                $S.content = 'Hello Ueditor';
                shareProperties.setProperty('whe');
             }])
    
        .controller('chatCtrl', ['$rootScope', '$scope', function($rootScope, $scope, shareProperties){
            var vm = this;
            var socket = window.io('localhost:3000/');
            vm.username = undefined;
            vm.date = new Date().toTimeString().substr(0, 8);

            vm.newMessage = undefined;
            vm.messages=[];
            // how should we do when new message hit
                socket.on("receive-message", function(msg){

                    $scope.$apply(function(){
                        console.log("received message", msg);
                        vm.messages.push(msg);
                    });
                    
                });
            
            vm.username = "admin";
            // send message with username and content
            vm.sendMessage = function(){
                console.log("start to shot!");
                var newMessage = {
                    username: vm.username,
                    message: vm.newMessage,
                    date: vm.date
                };
                // shot out when data is ready
                socket.emit("new-message", newMessage);
                // clear the variable since we are good developer
                vm.newMessage = undefined;
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

})(window, window.angular);