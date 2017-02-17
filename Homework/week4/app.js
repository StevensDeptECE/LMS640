function handleFileSelect(evt) {
	var files = evt.target.files;
	var output = [];
	// for (var i = 0; f; f = files[i]; i++) {
	//     output.push('<li><strong>', escape(f.name), '<strong>(', f.type || 'n/a', ') -'
	//                f.size.' bytes, last modified:',   f.lastModifiedDate.toLocaleDateString(), '</li>');
	// }
	// document.getElementById('list').innerHTML = '<ul>' + output.join('') + '</ul>';
}
document.getElementById('files').addEventListener('change', handleFileSelect, false);

const maxFileNum = 3;
let curFileNum = 0;
let fileNames = ['Bus','Car','Main'];

function compile() {
	$('#console').text("running program ...");
	$.ajax({
		// url: `http://localhost:3000/compile/${fileNames[curFileNum]}.java`,
		url: `http://localhost:3000/compile/Main.java`,
		data: {
			format: 'json'
		},
		error: function(err) {
			console.log(err);
		},
		success: (data) => {
			$('#console').text(data.output);
		},
		type: 'GET'
	})
}


function run() {
	alert("run successfully(not implementated)");
}

function next() {
	console.log('running ')
	$.ajax(
			{
				url: `http://localhost:3000/code/${fileNames[curFileNum++]}.java`,
				data: {
					format: 'text'
				},
				error: function(err) {
					// $('#info').html('<p>An error has occurred</p>');
					console.log(err);
				},
				success: function(data) {
					$('#code').text(data);
				},
				type: 'GET'
			}
		)
	if (curFileNum == maxFileNum) {
		curFileNum = 0;
	}
}
next();