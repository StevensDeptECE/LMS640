function settings(payload){
    this.payload = payload;
}
settings.prototype.draw = function(s) {
    clearElements("up3");
    clearElements("up2");
    var header = Util.h1("Settings","h02");
    document.getElementById("up2").appendChild(header);
    

	var p = document.getElementById("up3");
	
	var q = new QC(p, settingsPayload);

	q.drawQuiz();
    clearClass("active");
    document.getElementById("settings").className = "active";
}


var settingsPayload = [
    title: "Settings",
    class: "L-quiz",
    questions: 

        {
            id: "qc1008",
            title: "Addition",
            comp: [
                ["Instr", "What is ", "1"],
                ["Eqn", "2+2", "2"],
                ["MCDrop", [1,2,3,4], "3"]
            ]
        },

        {
            id: "qc1010",
            title: "Match",
            comp: [
                ["Instr", "Match the types", "1"],
                ["Match",["animal","number","food"],["ice cream", "dog", "three"], "2" ]
            ]
        }
    ];