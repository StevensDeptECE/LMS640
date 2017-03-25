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
    var row = "";
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

    if (line == 5 || line == 4) {
        for (var i = 1; i <= 7 - verbose; i++) {
            row += "<td class='next'>"+i+"</td>";
        }
        row += "</tr>";
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
    var row = "";

    for (var i = 1; i <= days; i++) {
        row += "<td class='pre'>" + i + "</td>";

        if ((i + verbose) % 7 == 0) {
            row = "";
        }
    }
    return row;
}

function show(customDate) {
    var date = customDate.getDate();
    var days = getDays(customDate);
    var firstDayOfMonth = getFirstDayOfMonth(customDate);
    var verbose = firstDayOfMonth;
    var dateString = "";
    dateString += "<table>" + "<th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th>";
    var row = "";
    row = getEndOfPreMonth(customDate);
    for (var i = 1; i <= days; i++) {
        if(i == date){
            row += "<td class='today'>" + i + "</td>";
        }
        else{
            row += "<td class='current'>" + i + "</td>";
        }
        if ((i + verbose) % 7 == 0) {
            dateString += "<tr>" + row + "</tr>";
            row = "";
        }
    }

    var returnRow = getHeadOfNextMonth(customDate);

    dateString += "<tr>" + row + returnRow;
    dateString += "</table>";

    //var draw= document.createElement("calendarContainer");
    var calendarContainer = document.getElementById("content");
    calendarContainer.innerHTML = dateString;
}
function drawCalendar() {
    show(getRightNow());
    fillDate();
    changeWeekendStyle();
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
    var preMonth = getPreMonth();
    show(preMonth);
    fillDate();
    changeWeekendStyle();
}


function resume(){
    tempDate = getRightNow();
    show(tempDate);
    fillDate();
    changeWeekendStyle();
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
    fillDate();
    changeWeekendStyle();
}

function changeWeekendStyle(){

    $("th:gt(4)").
    css("color", "red");
    for (var i = 0; i < 7; i++) {
        $("tr:eq(" + i + ")>td:gt(4)").css("color", "red");
    }
}
function fillDate(){
    var display =  document.getElementById("displayDate");
    display.innerHTML = getTempDate().toLocaleDateString();
}

/*function launchCalendar(name,payload){
  console.log("launchCalendar");
  var x=new calendar(payload); // TODO calendar constructor
  var c= document.getElementById("content");
  x.draw(c);
}*/
