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
    var row = Util.tr([]);
      var element = Util.td("");
        var link = Util.a("javascript:launch(HomeworkCourse, [], 'up3')", this.payload[i], "", "");
        element.appendChild(link);
      row.appendChild(element);
    newTable.appendChild(row);
  }
  content.appendChild(newTable);
  clearClass("active");
  //set active to some other class
  document.getElementById("course").className = "active";
}

courses = ["Software Engineering", "Data Structures", "C++", "Java", "Python"];
