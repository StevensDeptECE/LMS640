/* Login construcotr. It currently takes no arguments */
function Homework(payload) {
  this.payload = payload;
}


Homework.prototype.draw = function(content) {
  clearElements('up2');
  var up2 = document.getElementById('up2');
  var newHeader = Util.h1("Homework", "", "");
  up2.appendChild(newHeader);
  clearElements('up3');

/*
  var newDiv1 = Util.div("","");
  var newDiv2 = Util.div("", "Grade");
  var newP = Util.p("", "", "");
  var newA = Util.a("Grades", "", "", "");
  newP.appendChild(newA);
  newDiv2.appendChild(newP);
  newDiv1.appendChild(newDiv2);
  content.appendChild(newDiv1);
*/

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
    var newDiv3 = Util.div("course", "");
      var newTable = Util.table([], false, "table table-hober", "");
      var newTr1 = Util.tr([], "", "");
      var newTh1 = Util.th("", "", "");
      var newA2 = Util.a("../Homework/Canvas-Homework/page5(Assignment-S).html", "Software Engineering", "", "");
      newTh1.appendChild(newA2);
      newTh1.appendChild(newButton);
      newTr1.appendChild(newTh1);
      newTable.append(newTr1);
    newDiv2.appendChild(newTable);

    content.appendChild(newDiv2);


  //var link = Util.a("../Homework/Canvas-Homework/page2(CourseList).html", "link1", "","");
  //content.appendChild(link);
}
