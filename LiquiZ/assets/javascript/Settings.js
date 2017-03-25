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
    questions: 
    [
        {
            id: "qc1008",
            title: "Visual Preferences",
            comp: [
                ["Instr", "Do you prefer a light or dark theme? ", "1"],
                ["MCDrop", ["Light","Dark"], "2"]
            ]
        },

        {
            id: "qc1010",
            title: "Quiz Defaults",
            comp: [
                ["Instr", "What is the standard time limit?", "1"],
                [ "Fillin", "2"],
                ["Instr", "How many tries does a student get?", "1"],
                [ "Fillin", "2"]
            ]
        }
    ]
};