function CourseList(payload) {
  this.payload = payload;
}

CourseList.prototype.draw = function(content) {
  console.log("draw");
  var up2 = document.getElementById("up2")
  clearElements("up2");
  var header = Util.h1("Courses");
  up2.appendChild(header);

  clearElements('up3');
  //create a new table from a quizClass list with a courseList class name
  var newTable = Util.table([], false, "courseList", "");
  for (var i = 0; i < this.payload.length; i++)
  {
    console.log("i: " + i);
    var row = Util.tr([]);
      var element = Util.td("");
        var link = Util.a("javascript:launch(HomeworkCourse, this.payload[i], 'up3')", this.payload[i], "", "");
        //var currentCourse = this.payload[i];
        //var link = Util.button(this.payload[i], function() {launch(HomeworkCourse, currentCourse, 'up3')},  "", "course" + i);
        //link.onclick = function() {launch(HomeworkCourse, currentCourse, 'up3')}
        element.appendChild(link);
      row.appendChild(element);
    newTable.appendChild(row);
  }
  content.appendChild(newTable);
  clearClass("active");
  //set active to some other class
  document.getElementById("course").className = "active";

/*
  for (var i = 0; i < this.payload.length; i++)
  {
    document.getElementById("course" + i).onclick = function() {launch(HomeworkCourse, this.payload[i], 'up3')}
  }
  */
}


courses = ["Software Engineering", "Data Structures", "C++", "Java", "Python"];
