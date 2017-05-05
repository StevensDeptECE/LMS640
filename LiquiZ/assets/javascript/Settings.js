function settings(payload){
    this.payload = payload;
}
settings.prototype.draw = function(s) {
    clearElements("up3");
    clearElements("up2");
    var header = Util.h1("Settings","h02");
    document.getElementById("up2").appendChild(header);
    

	var p = document.getElementById("up3");
	console.log(settingsPayload);
	
	var q = new takeQuiz(settingsPayload);

	q.draw(p);
    clearClass("active");
    document.getElementById("settings").className = "active";
}


var settingsPayload = {
    title: "Settings",
    class: "L-quiz",
    time: null,
    questions: 
    [
        {
            id: "qc1008",
            title: "Visual Preferences",
            comp: [
                ["Instr", "Do you prefer a light or dark theme? ", "1"],
                ["MCDrop", ["Light","Dark"], "2"],
                ["Instr", "What size font do you prefer? ", "1"],
                ["MCDrop", ["Small","Medium", "Large"], "2"]
            ]
        },

        {
            id: "qc1010",
            title: "Quiz Defaults",
            comp: [
                ["Instr", "What is the standard time limit?", "1"],
                [ "FillIn", "2"],
                ["Instr", "How many attempts does a student get?", "1"],
                [ "FillIn", "2"],
                ["Instr", "What is the standard point value for a question?", "1"],
                [ "FillIn", "2"],
                ["Instr", "Should questions appear one at a time or all at once?", "1"],
                [ "MCDrop",["One at a time", "All at once"], "2"],
                ["Instr", "Will you require an access code to open the quiz?", "1"],
                [ "MC",["Yes", "No"], "2"],
                ["Instr", "Would you like to automatically publish new quizzes?", "1"],
                [ "MC",["Yes", "No"], "2"],
                ["Instr", "What is the standard amount of time between quiz open date and quiz due date?", "1"],
                [ "FillIn", "2"],
                ["Instr", "What is the standard amount of time between quiz due date and quiz close date?", "1"],
                [ "FillIn", "2"]
            ]
        }
    ]
};