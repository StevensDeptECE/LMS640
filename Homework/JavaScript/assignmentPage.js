var courseId;
var assignmentId;
var userId;
var token;
var url;
var filename;
var targetURL;
var output;

//TODO: get the url where the documents are
function DownloadAssignment(courseId1, assignmentId1, studentId1) {
    courseId = courseId1;
    assignmentId = assignmentId1;
    userId = studentId1;
    targetURL = "https://sit.instructure.com/api/v1" + "/courses/" + courseId1 + "/assignments/" + assignmentId1 +  "/submissions/" + userId1 + "?access_token=" + token1;
}
/* function to show the assigment on the page
TODO: how can we get the assignment*/
function showAssignment() {
  window.location.assign(userIdurl);
}
//TODO: run the assignment, define .cpp/.java
function compileAssigment(){
    
}

//TODO:pop out the result
function resultAssignment(){
    
}