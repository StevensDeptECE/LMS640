console.log('demo.js')

var storage = firebase.storage();
var storageRef = storage.ref();
var imagesRef = storageRef.child('images-web');

function guid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random() * 16 | 0,
			v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
}

function dropHandler(drop) {
	drop.preventDefault();
	drop.stopPropagation();
	var dt = drop.dataTransfer
	var files = dt.files
	for (let i = 0; i < files.length; ++i) {
		console.log(typeof files[i]);
		console.log(files[i]);
	}

	var file = files[0];

	imagesRef.child(guid()).put(file).then(function(snapshot) {
		console.log(snapshot.downloadURL);
		console.log('Uploaded a blob or file!');
	});
}

function rangeEnterHandler(enter) {
	enter.preventDefault();
	enter.stopPropagation();

	console.log('entering: ', enter);
}