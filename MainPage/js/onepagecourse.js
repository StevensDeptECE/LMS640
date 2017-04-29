function Course(payload) {
  var courseID = payload["courseID"];
  var courseName = payload["courseName"];
}

Course.prototype.draw = function(content) {
  //create div box for a course
  var newDiv = Util.div(); //TODO
  var courseName = Util.p(this.coureName); //TODO
  var semester = Util.p("Sprint 2017");
  newDiv.appendChild(courseName);
  newDiv.appendChild(semester);
  content.appendChild(newDiv);
}

function Dashboard(payload) {
  this.payload = payload;
}

Dashboard.prototype.draw = function(content) {
  console.log("draw dashboard");
  var up2 = document.getElementById('up2');
  clearElements('up2');
  var header = Util.h1("Dashboard");
  up2.appendChild(header);

  clearElements('up3');

  //eventually will be new objects (notifications)
  //draw notifications
  var rem1 = Util.h3("2017 Summer and Fall Enrollment");
  var p1 = Util.p("Opens on May 5");
  content.appendChild(rem1);
  content.appendChild(p1);

  var newObject;
  for (int i = 0; i < this.payload.length; i++) {
    newObject = new Course(this.payload[i]); // grade object
    newObject.draw(content);
  }
}


var courseList2 = [{"courseID":1, "courseName":"Software Engineering 1"},
                   {"courseID":2, "courseName":"Data Structures"}
                   {"courseID":3, "courseName":"C++"}
                   {"courseID":4, "courseName":"Java"}
                   {"courseID":5, "courseName":"Python"}];
