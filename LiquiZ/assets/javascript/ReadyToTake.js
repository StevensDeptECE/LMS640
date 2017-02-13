function SubmitOnclick() {
    document.getElementById("questions").innerHTML = "123132131";
    alert("Once you begin you can not close this page unless time up or you submit!");
}

function myfunction() {
    console.log("test");
}

AttemptHistory = [{number:"Attempt1",time:"3min18s",sore:5.5},
				  {number:"Attempt2",time:"2min58s",sore:6},
				  {number:"Attempt3",time:"1min18s",sore:7}
				 ]

function drawAttempt() {
	if(AttemptHistory.length == 0) return;
	var i = 0;
	var hightest = AttemptHistory[0];
	var table ="<table><tr><th>Attempt</th><th>Time</th><th>Sore</th></tr>"
	for(i = 0; i < AttemptHistory.length; i++){
	 if(AttemptHistory[i].sore > hightest.sore) hightest = AttemptHistory[i];
	}
	table.append("<tr><th>Kept</th><td>"+hightest.number+"</td><td>"+hightest.time+"</td><td>"+hightest.sore+"</td></tr>");
	for(i = 0; i < AttemptHistory.length; i++){
		if(i == 0){
			table.append("<tr><th>Lastest</th><td>"+AttemptHistory[i].number+"</td><td>"+AttemptHistory[i].time+"</td><td>"+AttemptHistory[i].sore+"</td></tr>");	
		}
		table.append("<tr><td>"+AttemptHistory[i].number+"</td><td>"+AttemptHistory[i].time+"</td><td>"+AttemptHistory[i].sore+"</td></tr>");
	}
	table.append("</table>");
}