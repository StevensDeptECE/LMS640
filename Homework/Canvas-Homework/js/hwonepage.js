/* Homework constructor for main page */
function HomeworkMain(payload) {
  this.payload = payload;
}

HomeworkMain.prototype.draw = function(content) {
  clearElements('up2');
  var up2 = document.getElementById('up2');
  var newHeader = Util.h1("Homework", "", "");
  up2.appendChild(newHeader);

  clearElements('up3');
  var newDiv1 = Util.div("","");
    var newDiv1_2 = Util.div("","Grade");
      var newP1_2 = Util.p("", "", "");
        var newA1_2 = Util.a("#", "Grade", "", "");
      newP1_2.appendChild(newA1_2);
    newDiv1_2.appendChild(newP1_2);
  newDiv1.appendChild(newDiv1_2);

  var newDiv2 = Util.div("shake shake-constant","");
    var newDiv2_2 = Util.div("","Homework");
      var newP2_2 = Util.p("", "", "");
        var newA2_2 = Util.a("javascript:launch(Homework, [], 'up3')", "Homework", "", "");
      newP2_2.appendChild(newA2_2);
    newDiv2_2.appendChild(newP2_2);
  newDiv2.appendChild(newDiv2_2);

  content.appendChild(newDiv1);
  content.appendChild(newDiv2);

  clearClass("active");
  //set active to some other class
  document.getElementById("groups").className = "active";
}

/* Homework page construcotr after HW main page */
function Homework(payload) {
  this.payload = payload;
}


Homework.prototype.draw = function(content) {
  clearElements('up2');
  var up2 = document.getElementById('up2');
  var newHeader = Util.h1("Homework", "", "");
  up2.appendChild(newHeader);
  clearElements('up3');

  var newDiv1 = Util.div("","login");
  var newP = Util.p("", "", "");
  var newA = Util.a("Grades", "", "", "");
  newP.appendChild(newA);
  newDiv1.appendChild(newP);
  content.appendChild(newDiv1);

  var newDiv2 = Util.div("","courseDashboard");
    var newDiv2_2 = Util.div("coursetitle","");
      var newP2 = Util.p("Course", "", "");
      newDiv2_2.appendChild(newP2);
    newDiv2.appendChild(newDiv2_2);
    var newDiv2_3 = Util.div("course", "");
      var newTable = Util.table([], false, "table table-hober", "");
        var newTr1 = Util.tr([]);
        var newTh1 = Util.th("", "", "");
        var newA2 = Util.a("javascript:launch(HomeworkCourse, [], 'up3')", "Software Engineering", "", "");
        newTh1.appendChild(newA2);
        newTr1.appendChild(newTh1);
        var newTr2 = Util.tr([]);
        var newTh2 = Util.th("", "", "");
        var newA3 = Util.a("../Homework/Canvas-Homework/page5(Assignment-S).html", "Machine Learning", "", "");
        newTh2.appendChild(newA3);
        newTr2.appendChild(newTh2);
        var newTr3 = Util.tr([]);
        var newTh3 = Util.th("", "", "");
        var newA4 = Util.a("../Homework/Canvas-Homework/page5(Assignment-S).html", "Algorithms", "", "");
        newTh3.appendChild(newA4);
        newTr3.appendChild(newTh3);
      newTable.appendChild(newTr1);
      newTable.appendChild(newTr2);
      newTable.appendChild(newTr3);
    newDiv2_3.appendChild(newTable);
    newDiv2.appendChild(newDiv2_3);
    content.appendChild(newDiv2);

  //var link = Util.a("../Homework/Canvas-Homework/page2(CourseList).html", "link1", "","");
  //content.appendChild(link);
}


/* Homework Course page construcotr. This object represents a page within Homework
 * for a specific Course
 */


function HomeworkCourse(payload) {
  //need to keep track of course name
  //var course = payload[i];
  this.payload = payload;
}

HomeworkCourse.prototype.draw = function(content) {
  clearElements('up2');
  var up2 = document.getElementById('up2');
  var newHeader = Util.h1("Course Name", "", "");
  up2.appendChild(newHeader);
  clearElements('up3');

  var divCourseDash = Util.div("","courseDashboard");
    //var divCourseTitle = Util.div("coursetitle","");
      //var newP = Util.p("Course Name", "", "");
      //divCourseTitle.appendChild(newP);
    //divCourseDash.appendChild(divCourseTitle);
    var divCourse1 = Util.div("course", "");
      var divComingHw = Util.div("comingHW", "");
        var pComing = Util.p("Coming...", "", "");
        var hwTable1 = Util.table([], false, "table table-hover", "");
          var tr1_1 = Util.tr([]);
            var th1_1 = Util.th("", "", "");
              var a1_1 = Util.a("../Homework/Canvas-Homework/page6(AssignmentDetail).html", "HW1", "", "");
            th1_1.appendChild(a1_1);
          tr1_1.appendChild(th1_1);
          var tr1_2 = Util.tr([], "active", "");
            var th1_2 = Util.th("", "", "");
              var a1_2 = Util.a("javascript:launch(HomeworkAssignment, [], 'up3')", "HW2", "", "");
            th1_2.appendChild(a1_2);
          tr1_2.appendChild(th1_2);
        hwTable1.appendChild(tr1_1);
        hwTable1.appendChild(tr1_2);
      divCourse1.appendChild(pComing);
      divCourse1.appendChild(hwTable1);
    divCourseDash.appendChild(divCourse1);

    content.appendChild(divCourseDash);
  }

  /* Homework constructor for main page */
  function HomeworkAssignment(payload) {
    this.payload = payload;
  }

  HomeworkAssignment.prototype.draw = function(content) {
    clearElements('up2');
    var up2 = document.getElementById('up2');
    //innerHTML should be dynamic - not hardcoded to "Homework A"
    //may need a parameter for which assignment it is
    var newHeader = Util.h1("Homework A", "", "");
    up2.appendChild(newHeader);

    clearElements('up3');
    //create submission button and everything else needed
  }
