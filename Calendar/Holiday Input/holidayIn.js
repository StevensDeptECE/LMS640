var date= new Date();
var year= date.getFullYear();
document.getElementById("year").innerHTML = year; //prints out current year
var holidays=[{"Name": "New Years", "Month": "1", "Day": "1"}, {"Name":"Christmas", "Month": "12", "Day": "25"}];
document.getElementById("holidays").innerHTML = JSON.stringify(holidays, null, " ");
function limit(){ //sets month limit for input dates
  var monthLength=[31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 == 0) && !(year % 100 == 0)|| (year % 400 == 0)){ //checks feb for leap year
      monthLength[2]=29;
    }
  var cmonth=document.getElementById("month").value;
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
  return element.name && element.value;
}

var formToJSON = function formToJSON(elements) {
  return [].reduce.call(elements, function (data, element) {
    if (isValidElement(element)) {
        data[element.name] = element.value;
    }
    return data;
  }, {});
};

var handleFormSubmit = function handleFormSubmit(event) {
  event.preventDefault();
  var data = formToJSON(form.elements);
  var dataContainer = document.getElementsByClassName('resultsDisplay')[0];
  dataContainer.textContent = JSON.stringify(data, null, "  ");
  holidays.push(data);
  console.log("the new holiday is added");
};

function displayHolidays(){
  var h=document.getElementById('holidays');
  for(var i=0; i<holidays.length; i++){
      document.getElementById('holidays').innerHTML += ('<li>'+ holidays[i] +'</li>');
  }
}

var form = document.getElementsByClassName('holiday')[0];
form.addEventListener('submit', handleFormSubmit);
