var today= new Date();
var year= today.getFullYear();
var month= today.getMonth();
var day= today.getDay();
var monthName=["January", "February", "March", "April", "May", "June","July",
	"August", "September", "October", "November", "December"];
var weekdayName=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
document.getElementById("year").innerHTML = year; //prints out current year
var holidays=new Array({"Name":"New Years", "Month":"1", "Day":"1"},
{"Name":"Christmas", "Month":"12", "Day":"25"});
displayHolidays();

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
  holidays.push(data);
  displayHolidays();
}

function displayHolidays(){	//prints holidays
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
    var text= document.createTextNode(JSON.stringify(holidays[i], null, " "));
    h.appendChild(input);
    h.appendChild(text);
    h.appendChild(label);
    label.appendChild(text);
    label.appendChild(br);
  }
}

function removeHolidays(){	//deletes holidays
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



//buttons and functions
var form = document.getElementsByClassName("holiday")[0];
form.addEventListener('submit', handleFormSubmit);
var remove=document.getElementById("remove");
remove.addEventListener('click', removeHolidays);
var sortName=document.getElementById("sortName");
sortName.addEventListener('click', sortByName);
var sortDate=document.getElementById("sortDate");
sortDate.addEventListener('click', sortByDate);
