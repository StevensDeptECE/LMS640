	var holiday = [
	{ "style":"holiday","name":"Christmas","notes":"Merry Christmas!","day":25,"month":12,"year":2017},
	{ "style":"holiday","name":"President's Day","notes":"Have a good day!","day":20,"month":2,"year":2017},
	{ "style":"mid","name":"EE575 mid-exam","notes":"EE575 midterm exam","day":10,"month":3,"year":2017},
	{ "style":"quiz","name":"EE552 test2","notes":"EE552 test2","day":20,"month":3,"year":2017},
	{ "style":"class","name":"CPE-640","notes":"CPE-6400 12:00-14:30","day":24,"month":3,"year":2017}];
	
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
        var today = getRightNow();
		var date = customDate.getDate();
        var days = getDays(customDate);
        var firstDayOfMonth = getFirstDayOfMonth(customDate);
        var verbose = firstDayOfMonth;
        var dateString = "";
        dateString += "<table><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th>"; 
        var row = "";
        row = getEndOfPreMonth(customDate);
        for (var i = 1; i <= days; i++) {
            if(i == today.getDate() && customDate.getMonth() == today.getMonth() && customDate.getFullYear() == today.getFullYear()){
                row += "<td class='today'>" + i;
				for(var j = 0; j < 5; j++){
					if( i == holiday[j].day && customDate.getMonth() + 1 == holiday[j].month && customDate.getFullYear() == holiday[j].year)
					row += '\n' + "<button class='createholiday' onclick='createwindow("+j+")'>"+holiday[j].name+"</button>";
				}
				row += "</td>";
            }
            else{
                row += "<td class='current'>" + i;
				for(var j = 0; j < 5; j++){
					if( i == holiday[j].day && customDate.getMonth() + 1 == holiday[j].month && customDate.getFullYear() == holiday[j].year)
					row += '\n'+ "<button class='createholiday' onclick='createwindow("+j+")'> " + holiday[j].name + " </button>";
				}
				row += "</td>";
            }
            if ((i + verbose) % 7 == 0) {
                dateString += "<tr>" + row + "</tr>";
                row = "";
            }
        }

        var returnRow = getHeadOfNextMonth(customDate);
 
        dateString += "<tr>" + row + returnRow;
        dateString += "</table>";
        var calendarContainer = document.getElementById("calendarContainer");
        calendarContainer.innerHTML = dateString;
    }
    
    function createwindow(n){
    	var para = document.createElement("div");
		para.setAttribute("class","holiday");
		para.setAttribute("id", "holiday");
    	var node = document.createTextNode(holiday[n].notes);
    	para.appendChild(node);
    	document.body.appendChild(para);
    }
	
	function createEventwindow(){
    	var para = document.createElement("div");
		para.setAttribute("class","event");
		para.setAttribute("id", "event");
    	var node = document.createTextNode("please add your event");
    	para.appendChild(node);
    	document.body.appendChild(para);
		var linktest = document.createElement("a");
		linktest.setAttribute("href","http://my.stevens.edu");
		node = document.createTextNode("MyStevens");
		linktest.appendChild(node);
		document.getElementById("event").appendChild(linktest);
		console.log("i made a window");
    }
	
	window.onclick = function(e) {
		if(document.getElementById("holiday")){
			if(e.target.id != "holiday" && e.target.className != "createholiday") {
			var holiday = document.getElementById("holiday");
			holiday.parentNode.removeChild(holiday);
		}
		}if(document.getElementById("event")){
		if(e.target.id != "event" && e.target.id != "createevent") {
			var event = document.getElementById("event");
			event.parentNode.removeChild(event);
			console.log("i took away the window");
		}
		}
	}
	
    function setCalendar() {
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

        $("th:gt(4)").css("color", "red");
        for (var i = 0; i < 6; i++) {
            $("tr:eq(" + i + ")>td:gt(4)").css("color", "red");
        }
    }
    function fillDate(){
        var display =  document.getElementById("displayDate");
        display.innerHTML = getTempDate().toLocaleDateString();
    }
 
