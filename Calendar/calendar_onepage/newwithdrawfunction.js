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
				for(var j = 0; j < holiday.length; j++){
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

				var calendarContainer = document.getElementById("up3");
        calendarContainer.innerHTML = dateString;

    }

    function createwindow(n){
    	var para = document.createElement("div");
		para.setAttribute("class","divholiday");
		para.setAttribute("id", "divholiday");
    	var node = document.createTextNode(holiday[n].notes);
    	para.appendChild(node);
    	document.body.appendChild(para);
    }


	/*function createEventwindow(){
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
    }*/

	document.onclick = function(e) {
		if(document.getElementById("divholiday")){
			if(e.target.id != "divholiday" && e.target.className != "createholiday") {
			var holiday = document.getElementById("divholiday");
			holiday.parentNode.removeChild(holiday);
			//console.log("i took away the window");
		}
		}
	}


		function setCalendar() {
        show(getRightNow());
        //fillDate();
        //changeWeekendStyle();
				drawCalendarButtons();
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
        //fillDate();
				drawCalendarButtons();
        //changeWeekendStyle();
    }


    function resume(){
        tempDate = getRightNow();
        show(tempDate);
        //fillDate();
				drawCalendarButtons();
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
        show(nextMonth);
        //fillDate();
				drawCalendarButtons();
        //changeWeekendStyle();
    }


/*    function changeWeekendStyle(){
        $("th:gt(4)").css("color", "red");
        for (var i = 0; i < 6; i++) {
            $("tr:eq(" + i + ")>td:gt(4)").css("color", "red");
        }
    }*/
    function fillDate(){
			var t_todayDate = getTempDate().toLocaleDateString()
			var todayDate = Util.span(t_todayDate, "", "displayDate");
			document.getElementById("up3").appendChild(todayDate);
    }

		var monthId=["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul",
			"Aug", "Sep", "Oct", "Nov", "Dec"];
		var fullMonthId=["January", "February", "March", "April", "May", "June",
			"July", "August", "Septempber", "October", "November", "December"];
		function chooseDate(){
			var a= getTempDate();
			var m= a.getMonth();
			var y= a.getFullYear();

			var display= fullMonthId[m] +' '+ y;

			var niceDate = Util.span(display, "", "niceDate");
			document.getElementById("up3").appendChild(niceDate);

		}

		function drawCalendarButtons() {
		  console.log("Draw Calendar Buttons");
		  var btn_left = Util.button("<", preButton, "", "");      // Create a <button> element
		  document.getElementById("up3").appendChild(btn_left);    // Append <button> to <body>
		  //fillDate();
			chooseDate();                                             // write current date
		  var btn_today = Util.button("Today", resume, "", "");    // Create a <button> element
		  var btn_right = Util.button(">", nextButton, "", "");    // Create a <button> element
		  document.getElementById("up3").appendChild(btn_today);   // Append <button> to <body>
		  document.getElementById("up3").appendChild(btn_right);   // Append <button> to <body>
			var btn_event= Util.button("Add Event", drawEventForm, "eventBtn", "eventBtn");
			document.getElementById("up3").appendChild(btn_event);
		}

		function drawCalendar() {
		    console.log("Draw Calendar");
		    clearElements("up2");

		    var newHeader = Util.h1("Calendar", "", "");
		    document.getElementById("up2").appendChild(newHeader);

		    clearElements("up3");
		    show(getRightNow());
		    //fillDate();
		    //changeWeekendStyle();
		    drawCalendarButtons();
		    //onclickClass("active", launch)
		    clearClass("active"); //previously highlighed field in left meny bar is no longer highlighted
		    document.getElementById("calendar").className = "active"; //highlighs calendar field in left menu bar
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
				option.setAttribute("value", i);
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
			dayInput.setAttribute("id", "year");
			dayInput.setAttribute("class", "holidayForm");
			dayInput.setAttribute("name", "year");
			dayInput.setAttribute("type", "number");
			form.appendChild(yearInput);
			var enter=document.createElement("br");
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

		}

//makes the popup for form
		/*var popup = document.getElementById("eventWindow");
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
		}*/

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
			show(tempDate);
		}
		var form = document.getElementsByClassName("holidayForm")[0];
		form.addEventListener('submit', handleFormSubmit);
