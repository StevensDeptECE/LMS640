var myApp= angular.module('myApp',[]);
myApp.controller('AppCtrl',['$scope','$http',function($scope,$http){
	console.log("hello world from controller");
	$http.get('/projectlist')

		{
		"Pnames":[
        {
            "Name":"DiscussionForum",
            "Info":"This is e-platform where students can have discussions about their projects.",
            "Teams" : ["team1","team2"],
            "teammembers" : ["Yang bai, Bhavitha"]


        },

        {
            "Name":"Calender",
            "Info":"This is e-platform where students can have discussions about their projects.",
            "Teams" : ["team1","team2"],
            "teammembers" : ["Amulya", "charith"] 
            
        },

        {
            "Name":"Homework",
            "Info":"This is e-platform where students can have discussions about their projects.",
            "Teams" :["team1","team2"],
            "teammembers" : ["Rajesh", "Aravind"]
            
        },

        {
            "Name":"C++ Server",
            "Info":"This is e-platform where students can have discussions about their projects.",
            "Teams" : ["team1","team2"],
            "teammembers": ["sreeman" ,"sri Nidh"]
        },

        {
            "Name":"LiQuiz",
            "Info":"This is e-platform where students can have discussions about their projects.",
            "Teams" :["team1","team2"],
            "teammembers" : ["Rajesh", "Aravind"]
            
        }
]}
	var projectlist =[Pnames[0].Name,Pnames[1].Name,Pnames[2].Name];
	$scope.projectlist = projectlist;
}]);