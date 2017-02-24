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


    var calendarContainer = document.getElementById("up3");
    calendarContainer.innerHTML = dateString;
    //calendarContainer.appendChild(ateString);
}

function drawCalendarButtons() {
  console.log("Draw Calendar Buttons");
  var btn_left = Util.button("<", preButton, "", "");        // Create a <button> element
  //var t_left = document.createTextNode("<");       // Create a text node
  //btn_left.appendChild(t_left);                                // Append the text to <button>
  document.getElementById("up3").appendChild(btn_left);                    // Append <button> to <body>

  //in fillDate() function
  //var t_todayDate = getTempDate().toLocaleDateString()
  //var todayDate = Util.span(t_todayDate, "", "displayDate");

  fillDate();

  var btn_today = Util.button("Today", resume, "", "");        // Create a <button> element
  //var btn_today = document.createElement("BUTTON");        // Create a <button> element
  //var t_today = document.createTextNode("Today");       // Create a text node
  //btn_today.appendChild(t_today);                                // Append the text to <button>

  var btn_right = Util.button(">", nextButton, "", "");        // Create a <button> element
  //var btn_right = document.createElement("BUTTON");        // Create a <button> element
  //var t_right = document.createTextNode(">");       // Create a text node
  //btn_right.appendChild(t_right);                                // Append the text to <button>

  document.getElementById("up3").appendChild(btn_today);                    // Append <button> to <body>
  document.getElementById("up3").appendChild(btn_right);                    // Append <button> to <body>
}


function drawCalendar() {
    console.log("Draw Calendar");
    clearElements("up2");

    var newHeader = Util.h1("Calendar", "", "");
    document.getElementById("up2").appendChild(newHeader);

    clearElements("up3");
    show(getRightNow());
    //fillDate();
    changeWeekendStyle();
    drawCalendarButtons();
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
    drawCalendarButtons();
}


function resume(){
    tempDate = getRightNow();
    show(tempDate);
    //fillDate();
    changeWeekendStyle();
    drawCalendarButtons();
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
    drawCalendarButtons();
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
