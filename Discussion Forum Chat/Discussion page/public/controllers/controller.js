function AppCtrl($scope,$http) { 
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

$scope.remove = function(id){
	console.log(id);
	$http.delete('/discussionlist/'+id).success(function(response){
		refresh();
	});
};

}