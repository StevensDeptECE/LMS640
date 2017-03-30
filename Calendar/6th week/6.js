var holiday=new Array({"Name":"New Years", "Month":"1", "Day":"1"},
{"Name":"Christmas", "Month":"12", "Day":"25"});

var tempDate;
//returns current date and time object in tempDate var
function getTempDate(){
  if(tempDate == undefined) {
    tempDate = getRightNow();
  }
  return tempDate;
}

//returns current date and time object
function getRightNow() {
  return new Date();
}

//returns day of the week SUN-SAT 1-7
function getDay(date){
  var day = date.getDay();
  if(0 == day){
    day = 7;
  }
  return day;
}

//returns day of the month
function getDays(date) {
  var month = date.getMonth(); //gets month 0-11
  var currentDate = date.getDate(); //gets day 1-31
  date.setMonth(month-1, currentDate); //sets date to last month today
  return currentDate;
}

//returns what day of the week the 1st is
function getFirstDayOfMonth(date){
  var currentDay = date.getDate(); ///gets day of the month
  date.setDate(1); //set day to the 1st
  var firstDayOfMonth = getDay(date); //gets day of week
  date.setDate(currentDay); //set date back to current day
  return firstDayOfMonth;
}

/*//return what day of the week the last day is: getLastDayOfMonth(date)
function getLastDayOfMonth(date){
  var currentDate = date.getDate(); //get day of the month
  var days = getDays(date); //gets day of the week
  date.setDate(days); //set day to 0-6
  var lastDayOfMonth = getDay(date);
  date.setDate(currentDate);
  return lastDayOfMonth;
}
*/

//html string to make end of month data table
function getHeadOfNextMonth(date) {
  var days = getDays(date); //day of the month
  var firstDayOfMonth = getFirstDayOfMonth(date); //day of the week of 1st
  var verbose = firstDayOfMonth;
  var row = "";
  var line = 0;

  for (var i = 1; i <= days; i++) { //count how many lines there are
    if ((i + verbose) % 7 == 0) {
      line++;
    }
  }

  var year = date.getFullYear(); //gets year
  var month = date.getMonth(); //gets month
  if (month == 11) { //if month is dec, next month is jan of next year
    year += 1;
    month = 0;
  }
  else { //else move month to be next month
    month += 1;
  }

  var nextMonth = new Date(year, month); //date object month/1/year
  var firstDayOfNextMonth = getFirstDayOfMonth(nextMonth); //where to start next month
  verbose = firstDayOfNextMonth;

  if (line == 5 || line == 4) {
    for (var i = 1; i <= 7 - verbose; i++) { //make table data for next month
      row += "<td class='next'>"+i+"</td>"; //class= next for css styling
    }
    row += "</tr>";
  }
  return row;
}


function getEndOfPreMonth(date){
  var year = date.getFullYear();
  var month = date.getMonth();
  if (month == 0) { //if month is jan, previous month is dec of last year
    year -= 1;
    month = 11;
  }
  else {
    month -= 1;
  }
  var preMonth = new Date(year, month); //new date obj month/1/year
  var days = getDay(preMonth); //get day of prev month BUT ALWAYS GONNA BE 1
  var firstDayOfMonth = getFirstDayOfMonth(preMonth); //day of week of 1st of prev month
  var verbose = firstDayOfMonth;
  var row = "";

  for (var i = 1; i <= days; i++) {
    row += "<td class='prev'>" + i + "</td>";

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
				for(var j = 0; j < 2; j++){
					if( i == holiday[j].day && customDate.getMonth() + 1 == holiday[j].month && customDate.getFullYear() == holiday[j].year)
					row += '\n' + "<button class='createholiday' onclick='createwindow("+j+")'>"+holiday[j].name+"</button>";
				}
				row += "</td>";
            }
            else{
                row += "<td class='current'>" + i;
				for(var j = 0; j < 2; j++){
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
    	var node = document.createTextNode(holiday[n].name);
    	para.appendChild(node);
    	document.body.appendChild(para);
    }

		function createEventwindow(){
	    	var para = document.createElement("form");
				para.setAttribute("class","event");
				para.setAttribute("id", "event");
				para.innerHTML = document.getElementById("addHoliday").innerHTML;
	    	document.body.appendChild(para);

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
        //changeWeekendStyle();
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

/*    function changeWeekendStyle(){

        $("th:gt(4)").css("color", "red");
        for (var i = 0; i < 6; i++) {
            $("tr:eq(" + i + ")>td:gt(4)").css("color", "red");
        }
    }*/
    function fillDate(){
        var display =  document.getElementById("displayDate");
        display.innerHTML = getTempDate().toLocaleDateString();
    }

//code that makes popup form
var popup = document.getElementById("eventWindow");
var btn = document.getElementById("eventBtn");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
  popup.style.display = "block";
}
span.onclick = function() {
  popup.style.display = "none";
}
window.onclick = function(event) {
  if (event.target == popup) {
    popup.style.display = "none";
  }
}

//add holiday code
var today= new Date();
var year= today.getFullYear();
var month= today.getMonth();
var day= today.getDate();

var monthId=["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul",
	"Aug", "Sep", "Oct", "Nov", "Dec"];
document.getElementById(monthId[month]).setAttribute("selected", "select");
document.getElementById("day").setAttribute("value", day);
document.getElementById("year").setAttribute("value", year);

function limit(){ //sets month limit for input dates
  	var monthLength=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 == 0) && !(year % 100 == 0)|| (year % 400 == 0)){ //checks feb for leap year
      monthLength[2]=29;
    }
  	var cmonth=document.getElementById("month").value; //cmonth= chosen month
  	var maxday=monthLength[cmonth-1];
  	var cday=document.getElementById("day");
  	cday.max=maxday;
	}

function capitalize(inStr) { //look for word, nonwhitespace characters, global match
  return inStr.replace(/\w\S*/g, function(tStr) {
     return tStr.charAt(0).toUpperCase() + tStr.substr(1).toLowerCase();
    });
}

function isValidElement(element){ //checks for non-empty name and values
  element.value=capitalize(element.value);
  return element.name && element.value;
}

function formToJSON(elements) {
  return [].reduce.call(elements, function (data, element) {
    if (isValidElement(element)) {
        data[element.name] = element.value;
    }
    return data;
  }, {});
}

function handleFormSubmit(event) {	//adds holiday as JSON obj
  event.preventDefault();
  var data = formToJSON(form.elements);
  holiday.push(data);
  console.log(data);
  popup.style.display = "none";
}
var form = document.getElementsByClassName("holiday")[0];
form.addEventListener('submit', handleFormSubmit);
