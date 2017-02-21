function SubmitOnclick() {
    alert("Once you begin you can not close this page unless time up or you submit!");
}


AttemptHistory = [{number:"Attempt1",time:"3min18s",sore:5.5},
				  {number:"Attempt2",time:"2min58s",sore:8},
				  {number:"Attempt3",time:"1min18s",sore:7}
				 ]

Policy = {quiz_name: "quiz1", 
		  due_date:"Feb 7 at 11:59pm",
		  points:"8",
		  questions:"8",
		  available_date:"Jan 24 at 12am - Feb 7 at 11:59p",
		  time_limit:"none",
		  allowed_attempts:"4"
		 }

function drawAttempt() {
	if(AttemptHistory.length == 0) return;
	var i = 0;
	var hightest = AttemptHistory[0];
	var table ="<h2>Attempt History</h2><table><tr><th>Attempt</th><th>Time</th><th>Sore</th></tr>"
	for(i = 0; i < AttemptHistory.length; i++){
	 if(AttemptHistory[i].sore > hightest.sore) hightest = AttemptHistory[i];
	}
	table+="<tr><th>Kept</th><td>"+hightest.number+"</td><td>"+hightest.time+"</td><td>"+hightest.sore+"</td></tr>";
	for(i = 0; i < AttemptHistory.length; i++){
		if(i == 0){
			table+="<tr><th>Lastest</th><td>"+AttemptHistory[i].number+"</td><td>"+AttemptHistory[i].time+"</td><td>"+AttemptHistory[i].sore+"</td></tr>";	
		}
		table+="<tr><td></td><td>"+AttemptHistory[i].number+"</td><td>"+AttemptHistory[i].time+"</td><td>"+AttemptHistory[i].sore+"</td></tr>";
	}
	table+="</table>";
	document.getElementById("attempt_history").innerHTML = table;
	console.log(table);	
}

function drawPolicy() {
	var table = "<table><tr><th><b>Due</b></th><td>"+Policy.due_date+"</td><th><b>Points</b></th><td>"+Policy.points+"</td><th><b>Questions</b></th><td>"+Policy.questions+"</td></tr><tr><th><b>Available</b></th><td>"+Policy.available_date+"</td></tr><tr><th><b>Time Limit</b></th><td>"+Policy.time_limit+"</td><th><b>Allowed Attempts</b></th><td>"+Policy.allowed_attempts+"</td></tr></table>";
	document.getElementById("quiz_info").innerHTML = table;
}

function drawInstruction() {
	var ins = "<p><b>Instructions:</b></p>
                    <p>This quiz will test the basic knowledge of how to programming in C++. Make sure you have reviewed before taking this test. Good luck to you.</p>
                    <p><b>Caution:</b> once you start a time-limit quiz, unless the time out or you submit quiz the time counting will not stop.</p>";
	document.getElementById("instruction").innerHTML = ins;
}

function quizTitle(){
	
}