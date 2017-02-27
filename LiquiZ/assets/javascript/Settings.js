function load() {
	var p = document.getElementById("content");
	console.log(p);
	
	var test = [1,2,3,4];
	console.log(typeof(test));
	console.log(test);
	
	
	var settings = [


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
    id: "qc1009",
	title: "Drag and Drop",
	comp: [
		["Instr", "Locate the parts of the cat ",'1'],
		["dragDrop", "cat.jpg",["Ear","Eye","Nose","Tongue"], [ {"left":215,"top":30}, {"left":255,"top":120},{"left":285,"top":160},{"left":285,"top":220}], 7]
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
	var json = {
  		title: "test",
 		class: "L-quiz",
 		questions: quest
	}
	var q = new Quiz(p, json);

	q.drawQuiz();
}
