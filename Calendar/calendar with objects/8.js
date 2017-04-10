var holiday = [
	{ "style":"holiday","name":"Christmas","notes":"Merry Christmas!","day":25,"month":12,"year":2017},
	{ "style":"holiday","name":"President's Day","notes":"Have a good day!","day":20,"month":2,"year":2017},
	{ "style":"mid","name":"EE575 mid-exam","notes":"EE575 midterm exam","day":10,"month":3,"year":2017},
	{ "style":"quiz","name":"EE552 test2","notes":"EE552 test2","day":20,"month":3,"year":2017},
	{ "style":"class","name":"CPE-640","notes":"CPE-640 12:00-14:30","day":24,"month":3,"year":2017}];

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

function getHeadOfNextMonthWithObjects(date) {
	var days = getDays(date);
  var firstDayOfMonth = getFirstDayOfMonth(date);
  var verbose = firstDayOfMonth;
  //var row = "";
	var elements=[];
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
    	//row += "<td class='next'>"+i+"</td>";
			elements.push(Util.td(i, "next", ""));
    }
    //row += "</tr>";
  }
  //return row;
	return elements;
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

function getEndOfPreMonthWithObjects(date){
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
	var elements=[];

  for (var i = 1; i <= days; i++) {
  	//row += "<td class='pre'>" + i + "</td>";
		elements.push(Util.td(i, "pre", ""));

    if ((i + verbose) % 7 == 0) {
    	//row = "";
			elements=[];
    }
  }
	return elements;
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
			for(var j = 0; j < holiday.length; j++){
				if( i == holiday[j].day && customDate.getMonth() + 1 == holiday[j].month && customDate.getFullYear() == holiday[j].year){
					row += '\n' + "<button class='createholiday' onclick='createwindow("+j+")'>"+holiday[j].name+"</button>";
				}
			}
			row += "</td>";
		}
		else{
			row += "<td class='current'>" + i;
			for(var j = 0; j < holiday.length; j++){
				if( i == holiday[j].day && customDate.getMonth() + 1 == holiday[j].month && customDate.getFullYear() == holiday[j].year){
					row += '\n'+ "<button class='createholiday' onclick='createwindow("+j+")'> " + holiday[j].name + " </button>";
				}
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

function showWithObjects(customDate) {
	var today = getRightNow();
	var date = customDate.getDate();
  var days = getDays(customDate);
  var firstDayOfMonth = getFirstDayOfMonth(customDate);
  var verbose = firstDayOfMonth;
	var cal=document.getElementById("testObjects");
	while(cal.firstChild){
		cal.removeChild(cal.firstChild);
	}
  //var dateString = "";
  //dateString += "<table><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th>";
	var calTable= document.createElement("table");
	var dayOfWeekId=["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	var tr1= document.createElement("tr");
	for(var i=0; i<dayOfWeekId.length; i++){
		tr1.appendChild(Util.th(dayOfWeekId[i], "", ""));
	}
	calTable.appendChild(tr1);
	//var row = "";
	var tags=[];
  //row = getEndOfPreMonth(customDate);
	for(var q=0; q<getEndOfPreMonthWithObjects(customDate).length; q++){
		tags.push(getEndOfPreMonthWithObjects(customDate)[q]);
	}
	//tags.concat(getEndOfPreMonthWithObjects(customDate));
	for (var i = 1; i <= days; i++) {
		if(i == today.getDate() && customDate.getMonth() == today.getMonth() && customDate.getFullYear() == today.getFullYear()){
			//row += "<td class='today'>" + i;
			tags.push(Util.td(i, "today", ""));
			for(var j = 0; j < holiday.length; j++){
				if( i == holiday[j].day && customDate.getMonth() + 1 == holiday[j].month && customDate.getFullYear() == holiday[j].year){
					//row += '\n' + "<button class='createholiday' onclick='createwindow("+j+")'>"+holiday[j].name+"</button>";
					tags.push(Util.button(holiday[j].name, createwindow(j), "createholiday", ""));
				}
			}
			//row += "</td>";
		}
		else{
			//row += "<td class='current'>" + i;
			tags.push(Util.td(i, "current", ""));
			for(var j = 0; j < holiday.length; j++){
				if( i == holiday[j].day && customDate.getMonth() + 1 == holiday[j].month && customDate.getFullYear() == holiday[j].year){
					//row += '\n'+ "<button class='createholiday' onclick='createwindow("+j+")'> " + holiday[j].name + " </button>";
					tags.push(Util.button(holiday[j].name, createwindow(j), "createholiday", ""));
				}
			}
			//row += "</td>";
		}
    if ((i + verbose) % 7 == 0) {
    	//dateString += "<tr>" + row + "</tr>";
			var tr=document.createElement("tr");
			for(var n=0; n<tags.length; n++){
				tr.appendChild(tags[n]);
			}
			calTable.appendChild(tr);
      //row = "";
			tags=[];
    }
  }

  //var returnRow = getHeadOfNextMonth(customDate);

  //dateString += "<tr>" + row + returnRow;
	var tr2= document.createElement("tr");
	for(var m=0; m<tags.length; m++){
		tr2.appendChild(tags[m]);
	}
	for(var p=0; p<getHeadOfNextMonthWithObjects(customDate).length; p++){
		tr2.appendChild(getHeadOfNextMonthWithObjects(customDate)[p]);
	}

	calTable.appendChild(tr2);
  //dateString += "</table>";


  cal.appendChild(calTable);

}

function createwindow(n){
	var para = document.createElement("div");
	para.setAttribute("class","divholiday");
	para.setAttribute("id", "divholiday");
  var node = document.createTextNode(holiday[n].notes);
  para.appendChild(node);
  document.body.appendChild(para);
}

document.onclick = function(e) {
	if(document.getElementById("divholiday")){
		if(e.target.id != "divholiday" && e.target.className != "createholiday") {
			var holiday = document.getElementById("divholiday");
			holiday.parentNode.removeChild(holiday);
		}
	}
}

function setCalendar() {
	//show(getRightNow());
	showWithObjects(getRightNow());
  //fillDate();
	chooseDate();
  //changeWeekendStyle();
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
  //show(preMonth);
	showWithObjects(preMonth);
  //fillDate();
	chooseDate();
  //changeWeekendStyle();
}

function resume(){
	tempDate = getRightNow();
  //show(tempDate);
	showWithObjects(tempDate);
  //fillDate();
	chooseDate();
  //changeWeekendStyle();
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
  //show(nextMonth);
	showWithObjects(nextMonth);
  //fillDate();
	chooseDate();
  //changeWeekendStyle();
}

function fillDate(){
	var display =  document.getElementById("displayDate");
  display.innerHTML = getTempDate().toLocaleDateString();
}

var monthId=["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul",
	"Aug", "Sep", "Oct", "Nov", "Dec"];
var fullMonthId=["January", "February", "March", "April", "May", "June",
	"July", "August", "Septempber", "October", "November", "December"];

function changeMonth(){
	var elements = document.getElementsByTagName("a");
	for(var i=0; i<elements.length; i++){
         elements[i].onclick = function(){
           //alert("you chose "+ this.innerHTML);
					 tempDate=getTempDate();
					 tempDate.setMonth(this.id);
					 //show(tempDate);
					 showWithObjects(tempDate);
					 chooseDate();
 			 	}
	}
}

function chooseDate(){
	var a= getTempDate();
	var m= a.getMonth();
	var y= a.getFullYear();
	var display= fullMonthId[m];

	var disp=document.getElementById("displayDate");//span
	var dropdiv= Util.div("dropdown","");
	var niceDate = Util.span(display, "dropbtn", "niceDate");
	while(disp.firstChild){
		disp.removeChild(disp.firstChild);
	}
	disp.appendChild(niceDate);

	var dropdown= Util.div("dropdownMenu", "");
	for(var i=0; i<monthId.length; i++){
		var opt= Util.a("javascript:void(0)", monthId[i], "changeMonth", i);
		opt.setAttribute("onclick", "changeMonth()");
		dropdown.appendChild(opt);
	}
	niceDate.appendChild(dropdown);
	dropdiv.appendChild(niceDate);
	disp.appendChild(dropdiv);

	disp.appendChild(Util.text(' '+y));
}

//makes the popup for form
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
	popup.style.display = "none";
	//show(tempDate);
	showWithObjects(tempDate);
	var frm = document.getElementsByClassName("holidayForm")[0];
  frm.reset();  // Reset
  return false;
}

var form = document.getElementsByClassName("holidayForm")[0];
form.addEventListener('submit', handleFormSubmit);
