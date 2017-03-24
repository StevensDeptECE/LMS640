var app = angular.module('chatRoom', [])
app.controller('chatContentCtrl',function($scope){
    $scope.names = [
        {name:'John', text:'Hello', createBy:'12:31'},
        {name:'Killer', text:'World', createBy:'12:32'},
        {name:'Kevin', text:'world',createBy:'12:33'},
        {name:'Martha', text:'hello',createBy:'12:34'}
    ];
    $scope.chat=[];     // this is going to store every chat from others!! 
    $scope.newChat={createBy:'', text:'', createAt:''}
    
});
