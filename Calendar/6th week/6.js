var holiday=new Array({"Name":"New Years", "Month":"1", "Day":"1"},
{"Name":"Christmas", "Month":"12", "Day":"25"});

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

//add holiday code
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
  var dataContainer = document.getElementsByClassName("resultsDisplay")[0];
  dataContainer.textContent = JSON.stringify(data, null, "  ");
  holiday.push(data);
  //displayHolidays();
}

/*function displayHolidays(){	//prints holidays
  var h=document.getElementById("holidays");

  //clear list
  while(h.firstChild){
    h.removeChild(h.firstChild);
  }
  for(var i=0; i<holidays.length; i++){
    var li=document.createElement("li");
    var input= document.createElement("input");
    var label= document.createElement("label");
    var br= document.createElement("br");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "dates");
		var text=Util.text(JSON.stringify(holidays[i], null, " "));
		//var text= document.createTextNode(JSON.stringify(holidays[i], null, " "));
		h.appendChild(input);
    h.appendChild(text);
    h.appendChild(label);
    label.appendChild(text);
    label.appendChild(br);
  }
}

function removeHolidays(){	//deletes checked holidays
  var boxes= document.getElementsByName("dates");
	var count=0;
  for(var i=0; i<boxes.length;i++){
    if(boxes[i].checked){
      holidays.splice(i-count,1);
			count++;
    }
  }
	displayHolidays();
}

function sortByName(){
	holidays.sort(function(a,b){
      if( a["Name"] > b["Name"]){
          return 1;
      }
			else if( a["Name"] < b["Name"] ){
          return -1;
      }
		return 0;
	});
	displayHolidays();
}

function sortByDate(){
	 holidays.sort(function(a,b){
      if( parseInt(a["Month"],10) > parseInt(b["Month"],10)){
          return 1;
      }
			else if( parseInt(a["Month"],10) < parseInt(b["Month"],10) ){
          return -1;
      }
			else if( parseInt(a["Month"],10) == parseInt(b["Month"],10)){
					if( parseInt(a["Day"],10) > parseInt(b["Day"],10)){
						return 1;
					}
					else if( parseInt(a["Day"],10) < parseInt(b["Day"],10) ){
						return -1;
					}
			}
      return 0;
   });
	 displayHolidays();
}

var popup = document.getElementById("popup");
var btn = document.getElementById("calendar");
var span = document.getElementsByClassName("close")[0];
btn.onclick = function() {
	popup.style.display = "block";
}
span.onclick = function() { //close button
	popup.style.display = "none";
}
window.onclick = function(event) {	//click away close
	if (event.target == popup) {
		popup.style.display = "none";
	}
}

var displayMonth= month;
var counter=0;
var back=document.getElementById("back");
back.onclick= function(){
	if(displayMonth==0){
		displayMonth=11;
	}
	displayMonth--;
}
var forward=document.getElementById("forward");

*/

//buttons and functions

/*var remove=document.getElementById("remove");
remove.addEventListener('click', removeHolidays);
var sortName=document.getElementById("sortName");
sortName.addEventListener('click', sortByName);
var sortDate=document.getElementById("sortDate");
sortDate.addEventListener('click', sortByDate);
var range=document.getElementById("rangedHoliday");
range.addEventListener('click', dateRange);
var repeat=document.getElementById("repeatHoliday");
repeat.addEventListener('click', dateRepeat);
*/
