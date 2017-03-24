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


const maxFileNum = 5;
let curFileNum = 0;

function compile() {
	$('#console').text("running program ...");
	$.ajax({
		url: `http://localhost:3000/compile/test${curFileNum}.java`,
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
	alert("run successfully");
}

function next() {
	$.ajax(
			{
				url: `http://localhost:3000/code/test${++curFileNum}.java`,
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














