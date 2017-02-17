const express = require('express');
const cmd = require('node-cmd');
const app = express();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/main.html');
})

app.get('/:filename', (req, res) => {
	let filename = req.params.filename;
	res.sendFile(__dirname + "/" + filename);
})

app.get('/code/:filename', (req, res) => {
	let filename = req.params.filename;
	res.sendFile(__dirname + `/java/${filename}`);
})  
    	
app.get('/compile/:filename', (req, res) => {
	// let filename = req.params.filename;
	console.log('in compiling');
	filename = 'Main.java';
	runCmd(__dirname + '/java', 'javac', filename)
		.then((resp) => {
			console.log("after compiling: " + resp);
			return runCmd(__dirname + '/java', 'java -cp', " " + filename.split('.')[0]);
		})
		.then((resp) => {
			console.log("after running: " + resp);
			res.json({output: resp});
		})
		.catch(err => {
			res.json({err: err});
		})
})

let runCmd = (path, command, filename) => {
	return new Promise((resolve, reject) => {
		try {
			cmd.get(
				`${command} ${path}/${filename}`,
				function(data) {
					console.log(`${command} ${path}/${filename}`);
					resolve(data);
				}
			);
		} catch(err) {
			reject(err);
		}
	})
}



app.listen(3000, () => {
	console.log('server running on: http://localhost:3000');
});