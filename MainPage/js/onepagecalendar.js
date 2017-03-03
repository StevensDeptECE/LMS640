function Calendar(payload) {
  this.payload = payload;
}

var tempDate;

function getRightNow() {
    return new Date();
}

function getDay(date){
    var day = date.getDay();
    if(0 == day){
        day = 7;
    }
    return day;
}

function getDays(date) {
    var month = date.getMonth() + 1;
    var currentDate = date.getDate();

    date.setMonth(month, 0);
    var days = date.getDate();

    date.setMonth(month - 1, currentDate);

    return days;
}

function getFirstDayOfMonth(date){
    var currentDate = date.getDate();
    date.setDate(1);
    var firstDayOfMonth = getDay(date);
    date.setDate(currentDate);
    return firstDayOfMonth;
}

function getLastDayOfMonth(date){
    var currentDate = date.getDate();
    var days = getDays(date);
    date.setDate(days);
    var lastDayOfMonth = getDay(date);
    date.setDate(currentDate);
    return lastDayOfMonth;
}

function getHeadOfNextMonth(date) {
    var days = getDays(date);
    var firstDayOfMonth = getFirstDayOfMonth(date);
    var verbose = firstDayOfMonth;
    var row = new Util.tr([]);
    var line = 0;

    for (var i = 1; i <= days; i++) {
        if ((i + verbose) % 7 == 0) {
            line++;
        }
    }

    var year = date.getFullYear();
    var month = date.getMonth();
    if (month == 11) {
        year += 1;
        month = 0;
    }
    else {
        month += 1;
    }

    var nextMonth = new Date(year, month);
    var firstDayOfNextMonth = getFirstDayOfMonth(nextMonth);
    verbose = firstDayOfNextMonth;

    var td;
    if (line == 5 || line == 4) {
        for (var i = 1; i <= 7 - verbose; i++) {
            //row += "<td class='next'>"+i+"</td>";
            td = new Util.td(i, 'next', '');
            row.appendChild(td);
        }
        //row += "</tr>";
    }
    return row;
}

function getEndOfPreMonth(date){
    var year = date.getFullYear();
    var month = date.getMonth();
    if (month == 0) {
        year -= 1;
        month = 11;
    }
    else {
        month -= 1;
    }
    var preMonth = new Date(year, month);
    var days = getDays(preMonth);
    var firstDayOfMonth = getFirstDayOfMonth(preMonth);
    var verbose = firstDayOfMonth;
    //var row = "";
    var row = new Util.tr([]);

    var td;
    for (var i = 1; i <= days; i++) {
        //row += "<td class='pre'>" + i + "</td>";
        td = new Util.td(i, 'pre', '');

        if ((i + verbose) % 7 == 0) {
            //clear row
            //row = "";
            row = new Util.tr([]);
        }
    }
    return row;
}

function show(customDate) {
    var date = customDate.getDate();
    var days = getDays(customDate);
    var firstDayOfMonth = getFirstDayOfMonth(customDate);
    var verbose = firstDayOfMonth;
    var dateString = new Util.tr([]); //might be wrong
    //dateString += "<table>" + "<th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th>";
    var calendarTable = new Util.table([]);
    dow = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    for (var i = 0; i < dow.length; i++) {
      var th = new Util.th(dow[i]);
      calendarTable.appendChild(th);
    }
    var row = new Util.tr([]);
    row = getEndOfPreMonth(customDate);
    for (var i = 1; i <= days; i++) {
        var td;
        if(i == date){
            //row += "<td class='today'>" + i + "</td>";
            td = new Util.td(i, 'today', '');
            row.appendChild(td);
        }
        else{
            //row += "<td class='current'>" + i + "</td>";
            td = new Util.td(i, 'current', '');
            row.appendChild(td);
        }
        if ((i + verbose) % 7 == 0) {
            //dateString += "<tr>" + row + "</tr>";
            //row = "";
            calendarTable.appendChild(row);
            dateString = row;
            row = new Util.tr([]);
        }
    }

    var returnRow = getHeadOfNextMonth(customDate); //should return object

    dateString += "<tr>" + row + returnRow;
    dateString += "</table>";


    var calendarContainer = document.getElementById("up3");
    //calendarContainer.innerHTML = dateString;
    //return calendarContainer;
    return calendarTable;
}

function drawCalendarButtons() {
  console.log("Draw Calendar Buttons");
  var btn_left = Util.button("<", preButton, "", "");      // Create a <button> element
  document.getElementById("up3").appendChild(btn_left);    // Append <button> to <body>
  fillDate();                                              // write current date
  var btn_today = Util.button("Today", resume, "", "");    // Create a <button> element
  var btn_right = Util.button(">", nextButton, "", "");    // Create a <button> element
  document.getElementById("up3").appendChild(btn_today);   // Append <button> to <body>
  document.getElementById("up3").appendChild(btn_right);   // Append <button> to <body>
}


Calendar.prototype.draw = function(content) {
    console.log("Draw Calendar");
    clearElements("up2");

    var newHeader = Util.h1("Calendar", "", "");
    document.getElementById("up2").appendChild(newHeader);


    clearElements("up3");
    drawCalendarButtons();
    var calendar = show(getRightNow());
    content.appendChild(calendar);

    //fillDate();
    changeWeekendStyle();
    //onclickClass("active", launch)
    clearClass("active"); //previously highlighed field in left meny bar is no longer highlighted
    document.getElementById("calendar").className = "active"; //highlighs calendar field in left menu bar
}

function getTempDate(){
    if(tempDate == undefined) {
        tempDate = getRightNow();
    }
    return tempDate;
}

function getPreMonth() {
    tempDate = getTempDate();

    var year = tempDate.getFullYear();
    var month = tempDate.getMonth();
    var date = tempDate.getDate();

    if (month == 0) {
        year -= 1;
        tempDate.setFullYear(year, 11, 1);
    }
    else {
        month -= 1;
        tempDate.setMonth(month, 1);
    }
    var preDays = getDays(tempDate);
    if(date >= preDays){
        date = preDays;
    }
    tempDate.setDate(date);
    return tempDate;
}

function preButton(){
    console.log("Pre Button");
    var preMonth = getPreMonth();
    show(preMonth);
    //fillDate();
    changeWeekendStyle();
    //drawCalendarButtons();
}


function resume(){
    tempDate = getRightNow();
    show(tempDate);
    //fillDate();
    changeWeekendStyle();
    //drawCalendarButtons();
}

function getNextMonth() {
    tempDate = getTempDate();

    var year = tempDate.getFullYear();
    var month = tempDate.getMonth();
    var date = tempDate.getDate();

    if (month == 11) {
        year += 1;
        tempDate.setFullYear(year, 0, 1);
    }
    else {
        month += 1;
        tempDate.setMonth(month, 1);
    }

    var nextDays = getDays(tempDate);

    if(date >= nextDays){
        date = nextDays;
    }
    tempDate.setDate(date);

    return tempDate;
}

function nextButton() {
    var nextMonth = getNextMonth();
    show(nextMonth);
    //fillDate();
    changeWeekendStyle();
    //drawCalendarButtons();
}

function changeWeekendStyle(){

    $("th:gt(4)").css("color", "red");
    for (var i = 0; i < 7; i++) {
        $("tr:eq(" + i + ")>td:gt(4)").css("color", "red");
    }
}


function fillDate(){
/*
    var display =  document.getElementById("displayDate");
    display.innerHTML = getTempDate().toLocaleDateString();
*/
  var t_todayDate = getTempDate().toLocaleDateString()
  var todayDate = Util.span(t_todayDate, "", "displayDate");
  document.getElementById("up3").appendChild(todayDate);
}



/*function launchCalendar(name,payload){
  console.log("launchCalendar");
  var x=new calendar(payload); // TODO calendar constructor
  var c= document.getElementById("content");
  x.draw(c);
}*/
