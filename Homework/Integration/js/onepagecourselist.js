function CourseList(payload) {
  this.payload = payload;
}

CourseList.prototype.draw = function(content) {
  console.log("draw");
  var up2 = document.getElementById("up2");
  clearElements("up2");
  var header = Util.h1("Courses");
  up2.appendChild(header);

  clearElements('up3');
  //create a new table from a course list with a courseList class name
  var newTable = Util.table([], false, "courseList", "");
  for (var i = 1; i <= this.payload.length; i++)
  {
    var row = Util.tr([]);
      var element = Util.td("");
        var link = Util.button(this.payload[i], "javascript:launch(HomeworkCourse, this.payload[i], 'up3')",  "", "");
        var c_name= this.payload[i-1];
        element.appendChild(link);
      row.appendChild(element);
    newTable.appendChild(row);
  }
  content.appendChild(newTable);
}

courses = ["Software Engineering", "Data Structures", "C++", "Java", "Python"];





  