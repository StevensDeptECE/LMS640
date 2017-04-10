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

  var newDiv3 = Util.div("LoginT","");
    var newDiv3_2 = Util.div("","LoginTeacher");
      var newP3_2 = Util.p("", "", "");
        var newA3_2 = Util.a("javascript:launch(Homework, [], 'up3')", "Teacher Login", "", ""); /* doubt*/
      newP3_2.appendChild(newA3_2);
    newDiv3_2.appendChild(newP3_2);
  newDiv3.appendChild(newDiv3_2);

  var newDiv4 = Util.div("LoginS","");
    var newDiv4_2 = Util.div("","LoginStudent");
      var newP4_2 = Util.p("", "", "");
        var newA4_2 = Util.a("javascript:launch(Homework, [], 'up3')", "Student Login", "", ""); /* doubt*/
      newP4_2.appendChild(newA4_2);
    newDiv4_2.appendChild(newP4_2);
  newDiv4.appendChild(newDiv4_2);

  content.appendChild(newDiv1);
  content.appendChild(newDiv2);
  content.appendChild(newDiv3);
  content.appendChild(newDiv4);
}


/* Homework page constructor after HW main page */
function Homework(payload) {
  this.payload = payload;
}


Homework.prototype.draw = function(content) {
  clearElements('up2');
  var up2 = document.getElementById('up2');
  var newHeader = Util.h1("Homework", "", "");
  up2.appendChild(newHeader);
  clearElements('up3');

  
  var courses = ["Software Engg", "Machine Learning" , "Algorithms", "Data Programming", "French"];
  var newDiv2 = Util.div("","courseDashboard");
    var newDiv2_2 = Util.div("coursetitle","");
      var newP2 = Util.p("", "", "");
      newDiv2_2.appendChild(newP2);
    newDiv2.appendChild(newDiv2_2);
    var newDiv2_3 = Util.div("course", "");
      var newTable = Util.table([], false, "table table-hober", "");
      for (var i = 0; i < courses.length; i++) {
        var newTr = Util.tr([]);
        var newTh = Util.th("","","");
        var newA = Util.a("javascript:launch(HomeworkCourse, [], 'up3')", courses[i], "", "");
        newTh.appendChild(newA);
        newTr.appendChild(newTh);
        newTable.appendChild(newTr);
      }


        /**var newTr1 = Util.tr([]);
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
        var newTr4 = Util.tr([]);
        var newTh4 = Util.th("", "", "");
        var newA5 = Util.a("../Homework/Canvas-Homework/page5(Assignment-S).html", "Data Programming", "", "");
        newTh4.appendChild(newA5);
        newTr4.appendChild(newTh4);
        var newTr5 = Util.tr([]);
        var newTh5 = Util.th("", "", "");
        var newA6 = Util.a("../Homework/Canvas-Homework/page5(Assignment-S).html", "French", "", "");
        newTh5.appendChild(newA6);
        newTr5.appendChild(newTh5);
      newTable.appendChild(newTr1);
      newTable.appendChild(newTr2);
      newTable.appendChild(newTr3);
      newTable.appendChild(newTr4);
      newTable.appendChild(newTr5); **/
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
  this.payload = payload;
}

HomeworkCourse.prototype.draw = function(content) {
  clearElements('up2');
  var up2 = document.getElementById('up2');
  var newHeader = Util.h1("c", "", "");
  up2.appendChild(newHeader);
  clearElements('up3');

  var divCourseDash = Util.div("","courseDashboard");
    //var divCourseTitle = Util.div("coursetitle","");
      //var newP = Util.p("Course Name", "", "");
      //divCourseTitle.appendChild(newP);
    //divCourseDash.appendChild(divCourseTitle);
    var divCourse1 = Util.div("course", "");
      var divComingHw = Util.div("comingHW", "");
        var pComing = Util.p("Coming Up", "", "");
        /**var hwTable1 = Util.table([], false, "table table-hover", "");
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
      divCourse1.appendChild(hwTable1); */
      var hwcoming = ["Homework1", "Homework2" , "Homework3"];
      
          var newTable1 = Util.table([], false, "table table-hober", "");
          for (var i = 0; i < hwcoming.length; i++) {
            var newTr1 = Util.tr([]);
            var newTh1 = Util.th("","","");
            var newA1 = Util.a("javascript:launch(HomeworkAssignment, [], 'up3')", hwcoming[i], "", "");
            var c = hwcoming[i];
            newTh1.appendChild(newA1);
            newTr1.appendChild(newTh1);
            newTable1.appendChild(newTr1);
      }
      divCourse1.appendChild(pComing);
      divCourse1.appendChild(newTable1);
    
    var divNextweekHw = Util.div("NextweekHw", "");
      var pNextweek = Util.p("Next Week", "", "");
        /** var hwTable2 = Util.table([], false, "table table-hover", "");
          var tr2_1 = Util.tr([]);
            var th2_1 = Util.th("", "", "");
              var a2_1 = Util.a("../Homework/Canvas-Homework/page6(AssignmentDetail).html", "HW3", "", "");
            th2_1.appendChild(a2_1);
          tr2_1.appendChild(th2_1);
          var tr2_2 = Util.tr([], "active", "");
            var th2_2 = Util.th("", "", "");
              var a2_2 = Util.a("javascript:launch(HomeworkAssignment, [], 'up3')", "HW4", "", "");
            th2_2.appendChild(a2_2);
          tr2_2.appendChild(th2_2);
        hwTable2.appendChild(tr2_1);
        hwTable2.appendChild(tr2_2);  */
        var hwnextweek = ["Homework4", "Homework5" , "Homework6"];
      
          var newTable2 = Util.table([], false, "table table-hober", "");
          for (var i = 0; i < hwnextweek.length; i++) {
            var newTr2 = Util.tr([]);
            var newTh2 = Util.th("","","");
            var newA2 = Util.a("javascript:launch(HomeworkAssignment, [], 'up3')", hwnextweek[i], "", "");
            var c = hwnextweek[i];
            newTh2.appendChild(newA2);
            newTr2.appendChild(newTh2);
            newTable2.appendChild(newTr2);
      }
      
      divCourse1.appendChild(pNextweek);
      divCourse1.appendChild(newTable2); 
    

    var divSubmittedHw = Util.div("SubmittedHw", "");
        var pSubmitted = Util.p("Submitted", "", "");
        var hwsubmitted = ["Homework7", "Homework8"];
      
          var newTable3 = Util.table([], false, "table table-hober", "");
          for (var i = 0; i < hwsubmitted.length; i++) {
            var newTr3 = Util.tr([]);
            var newTh3 = Util.th("","","");
            var newA3 = Util.a("javascript:launch(HomeworkAssignment, [], 'up3')", hwsubmitted[i], "", "");
            newTh3.appendChild(newA3);
            newTr3.appendChild(newTh3);
            newTable3.appendChild(newTr3);
      }

      divCourse1.appendChild(pSubmitted);
      divCourse1.appendChild(newTable3);
    var divOverdueHw = Util.div("OverdueHw", "");
      var pOverdue = Util.p("OverDue", "", "");
      var hwoverdue = ["Homework9", "Homework10","Homework11"];
      
          var newTable4 = Util.table([], false, "table table-hober", "");
          for (var i = 0; i < hwoverdue.length; i++) {
            var newTr4 = Util.tr([]);
            var newTh4 = Util.th("","","");
            var newA4 = Util.a("javascript:launch(HomeworkAssignment, [], 'up3')", hwoverdue[i], "", "");
            newTh4.appendChild(newA4);
            newTr4.appendChild(newTh4);
            newTable4.appendChild(newTr4);
      }
      divCourse1.appendChild(pOverdue);
      divCourse1.appendChild(newTable4);

    divCourseDash.appendChild(divCourse1);

    content.appendChild(divCourseDash);
  }


  /* Homework constructor for main page */
  function HomeworkAssignment(c) {
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
