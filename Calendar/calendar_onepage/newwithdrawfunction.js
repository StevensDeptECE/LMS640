var holiday = [
	{ "style":"holiday","name":"Christmas","notes":"Merry Christmas!","day":25,"month":12,"year":2017},
	{ "style":"holiday","name":"President's Day","notes":"Have a good day!","day":20,"month":2,"year":2017},
	{ "style":"mid","name":"EE575 mid-exam","notes":"EE575 midterm exam","day":10,"month":3,"year":2017},
	{ "style":"quiz","name":"EE552 test2","notes":"EE552 test2","day":20,"month":3,"year":2017},
	{ "style":"class","name":"CPE-640","notes":"CPE-640 12:00-14:30","day":24,"month":3,"year":2017}];

var tempDate;
//get current date object
function getRightNow() {
	return new Date();
}
//get day of week
function getDay(date){
	var day = date.getDay();
  if(0 == day){
  	day = 7;
  }
  return day;
}
//get day in month
function getDays(date) {
	var month = date.getMonth() + 1;
  var currentDate = date.getDate();
  date.setMonth(month, 0);
  var days = date.getDate();
  date.setMonth(month - 1, currentDate);
  return days;
}
//get day of week of first day of the month
function getFirstDayOfMonth(date){
	var currentDate = date.getDate();
  date.setDate(1);
  var firstDayOfMonth = getDay(date);
  date.setDate(currentDate);
  return firstDayOfMonth;
}
//get day of week of last day of the month
function getLastDayOfMonth(date){
	var currentDate = date.getDate();
  var days = getDays(date);
  date.setDate(days);
  var lastDayOfMonth = getDay(date);
  date.setDate(currentDate);
  return lastDayOfMonth;
}
//get day objects to fill in end of calendar
function getHeadOfNextMonth(date) {
	var days = getDays(date);
  var firstDayOfMonth = getFirstDayOfMonth(date);
  var verbose = firstDayOfMonth;
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
			elements.push(Util.td(i, "next", ""));
    }
  }
	return elements;
}
//get day objects to fill in beginning of calendar
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
//create calendar object
function show(customDate) {
	var today = getRightNow();
	var date = customDate.getDate();
  var days = getDays(customDate);
  var firstDayOfMonth = getFirstDayOfMonth(customDate);
  var verbose = firstDayOfMonth;
  var calTable= document.createElement("table");
	calTable.setAttribute("class", "calTable");
	var dayOfWeekId=["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	var tr1= document.createElement("tr");
	for(var i=0; i<dayOfWeekId.length; i++){
		tr1.appendChild(Util.th(dayOfWeekId[i], "", ""));
	}
	calTable.appendChild(tr1);
	var tags=[];
	for(var q=0; q<getEndOfPreMonth(customDate).length; q++){
		tags.push(getEndOfPreMonth(customDate)[q]);
	}
	for (var i = 1; i <= days; i++) {
		if(i == today.getDate() && customDate.getMonth() == today.getMonth() && customDate.getFullYear() == today.getFullYear()){
			tags.push(Util.td(i, "today", ""));
			for(var j = 0; j < holiday.length; j++){
				if( i == holiday[j].day && customDate.getMonth() + 1 == holiday[j].month && customDate.getFullYear() == holiday[j].year){
					var temp=tags.pop();
					var thing= document.createElement("button");
					thing.setAttribute("onclick", "createwindow("+j+")");
					thing.setAttribute("class", "createholiday");
					thing.innerHTML= holiday[j].name;
					temp.appendChild(thing);
					tags.push(temp);
				}
			}
		}
		else{
			tags.push(Util.td(i, "current", ""));
			for(var j = 0; j < holiday.length; j++){
				if( i == holiday[j].day && customDate.getMonth() + 1 == holiday[j].month && customDate.getFullYear() == holiday[j].year){
					var temp=tags.pop();
					var thing= document.createElement("button");
					thing.setAttribute("onclick", "createwindow("+j+")");
					thing.setAttribute("class", "createholiday");
					thing.innerHTML= holiday[j].name;
					temp.appendChild(thing);
					tags.push(temp);
				}
			}
		}
    if ((i + verbose) % 7 == 0) {
			var tr=document.createElement("tr");
			for(var n=0; n<tags.length; n++){
				tr.appendChild(tags[n]);
			}
			calTable.appendChild(tr);
			tags=[];
    }
  }

	var tr2= document.createElement("tr");
	for(var m=0; m<tags.length; m++){
		tr2.appendChild(tags[m]);
	}
	for(var p=0; p<getHeadOfNextMonth(customDate).length; p++){
		tr2.appendChild(getHeadOfNextMonth(customDate)[p]);
	}

	calTable.appendChild(tr2);
	var cal=document.getElementById("up3");
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
	//console.log('push calendar');
	visitedPages.push(['calendar', setCalendar]);
	drawCalendar(getRightNow());
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
	drawCalendar(preMonth);
}

function resume(){
	tempDate = getRightNow();
	drawCalendar(tempDate);
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
	drawCalendar(nextMonth);
  }

var monthId=["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul",
	"Aug", "Sep", "Oct", "Nov", "Dec"];
var fullMonthId=["January", "February", "March", "April", "May", "June",
	"July", "August", "Septempber", "October", "November", "December"];

function changeMonth(){
	var elements = document.getElementsByTagName("a");
	for(var i=0; i<elements.length; i++){
		elements[i].onclick = function(){
			tempDate=getTempDate();
			tempDate.setMonth(this.id);
			drawCalendar(tempDate);
	 	}
	}
}

function changeYear(){
	var yearView= document.getElementById("changeYear");
	yearView.style.display= "none";
	var tempYear= yearView.innerHTML;
	var inputYear= document.createElement("input");
	inputYear.setAttribute("type", "number");
	tempDate=getTempDate();
	var tempYear=tempDate.getFullYear();
	inputYear.setAttribute("value", tempYear);
	yearView.parentNode.insertBefore(inputYear, yearView);
	inputYear.onblur= function(){
		tempYear=inputYear.value;
		yearView.innerHTML=tempYear;
		yearView.parentNode.removeChild(inputYear);
		yearView.style.display = "";
		tempDate.setFullYear(tempYear);
		drawCalendar(tempDate);
	};
}

function chooseDate(){
	var a= getTempDate();
	var m= a.getMonth();
	var y= a.getFullYear();
	var mName= fullMonthId[m];
	var dropdiv= Util.div("dropdown","");
	var niceDate = Util.span(mName, "dropbtn", "niceDate");

	var dropdown= Util.div("dropdownMenu", "");
	for(var i=0; i<monthId.length; i++){
		var opt= Util.a("javascript:void(0)", monthId[i], "changeMonth", i);
		opt.setAttribute("onclick", "changeMonth()");
		dropdown.appendChild(opt);
	}
	niceDate.appendChild(dropdown);
	dropdiv.appendChild(niceDate);

	var editYear=Util.span(' '+y, "changeYear", "changeYear");
	editYear.setAttribute("onclick", "changeYear()");

	document.getElementById("up3").appendChild(dropdiv);
	document.getElementById("up3").appendChild(editYear);
}

function drawCalendar(date) {
	console.log("Draw Calendar");
	clearElements("up2");

	var newHeader = Util.h1("Calendar", "", "");
	document.getElementById("up2").appendChild(newHeader);

	clearElements("up3");
	var btn_left = Util.button("<", preButton, "", "");      // Create a <button> element
	document.getElementById("up3").appendChild(btn_left);    // Append <button> to <body>
	chooseDate();                                             // write current date
	var btn_today = Util.button("Today", resume, "", "");    // Create a <button> element
	var btn_right = Util.button(">", nextButton, "", "");    // Create a <button> element
	document.getElementById("up3").appendChild(btn_today);   // Append <button> to <body>
	document.getElementById("up3").appendChild(btn_right);   // Append <button> to <body>
	var btn_event= Util.button("Add Event", drawEventForm, "eventBtn", "eventBtn");
	document.getElementById("up3").appendChild(btn_event);

	show(date);

	clearClass("active"); //previously highlighed field in left meny bar is no longer highlighted
	document.getElementById("calendar").className = "active"; //highlighs calendar field in left menu bar
}

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

function drawEventForm() {
	console.log("Draw Form");
	var windo = Util.div("addEvent","eventWindow");
	document.getElementById("up3").appendChild(windo);
		var div= Util.div("addEvent-content","");
		windo.appendChild(div);
		var close= Util.span("&times;", "close", "");
		div.appendChild(close);
			var form= document.createElement("form");
			form.setAttribute("class", "holidayForm");

			var holidayName= document.createElement("label");
			holidayName.appendChild(Util.text("Holiday Name: "))
			form.appendChild(holidayName);
			var nameInput= document.createElement("input");
			nameInput.setAttribute("id","name");
			nameInput.setAttribute("class","holidayForm");
			nameInput.setAttribute("name","name");
			nameInput.setAttribute("type","text");
			form.appendChild(nameInput);
			var br=document.createElement("br");
			form.appendChild(br);

			var dateInLabel= document.createElement("label");
			dateInLabel.appendChild(Util.text("Date: "));
			form.appendChild(dateInLabel);
			var select= document.createElement("select");
			select.setAttribute("id", "month");
			select.setAttribute("class", "holidayForm");
			select.setAttribute("name", "month");
			select.setAttribute("onload", "limit()");
			select.setAttribute("onchange", "limit()");
			for(var i=0; i<12; i++){
				var option= document.createElement("option");
				option.setAttribute("value", i+1);
				option.setAttribute("class", "holidayForm");
				option.setAttribute("id", monthId[i]);
				option.appendChild(Util.text(fullMonthId[i]));
				select.appendChild(option);
			}
			form.appendChild(select);
			var dayInput=document.createElement("input");
			dayInput.setAttribute("id", "day");
			dayInput.setAttribute("class", "holidayForm");
			dayInput.setAttribute("name", "day");
			dayInput.setAttribute("type", "number");
			dayInput.setAttribute("min", "1");
			dayInput.setAttribute("max", "31");
			form.appendChild(dayInput);
			var yearInput=document.createElement("input");
			yearInput.setAttribute("id", "year");
			yearInput.setAttribute("class", "holidayForm");
			yearInput.setAttribute("name", "year");
			yearInput.setAttribute("type", "number");
			form.appendChild(yearInput);
			var enter= document.createElement("br");
			form.appendChild(enter);

			var notesLabel= document.createElement("label");
			notesLabel.appendChild(Util.text("Notes: "));
			form.appendChild(notesLabel);
			var notesInput= document.createElement("input");
			notesInput.setAttribute("id", "notes");
			notesInput.setAttribute("class", "holidayForm");
			notesInput.setAttribute("name", "notes");
			notesInput.setAttribute("type", "text");
			form.appendChild(notesInput);
			form.appendChild(br);

			var submit=document.createElement("button");
			submit.setAttribute("type", "submit");
			submit.appendChild(Util.text("Add it!"));
			form.appendChild(submit);

			div.appendChild(form);

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

		var today= new Date();
		var year= today.getFullYear();
		var month= today.getMonth();
		var day= today.getDate();

		document.getElementById(monthId[month]).setAttribute("selected", "select");
		document.getElementById("day").setAttribute("value", day);
		document.getElementById("year").setAttribute("value", year);

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
			drawCalendar(tempDate);
			//var frm = document.getElementsByClassName("holidayForm")[0];
   		//frm.reset();  // Reset
		}
		var form = document.getElementsByClassName("holidayForm")[0];
		form.addEventListener('submit', handleFormSubmit);
}
