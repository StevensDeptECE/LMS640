const exec = require('child_process').exec;

// get files name in a specific directory
// const testFolder = __dirname;
const fs = require('fs');
// const TIME_LIMIT = 2000;

// main parameter: don't include the postfix of a file

// return a promise:
//      on resolved: return an array of filenames in string
//      on rejected: return an error message
function get_fileNames(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            console.log(`Getting files from dir: ${dir}`);
            if (err) {
                reject(err);
            }
            resolve(files);
        })
    })
}

function compile_java(dir, main) {
    return new Promise((resolve, reject) => {
        exec(`javac ${dir}/${main}.java`, (error, stdout, stderr) => {
            if (error || stderr) {
                reject(`exec error: ${error || stderr}`);
                return;
            }
            resolve(`stdout: ${stdout}`);
        });
    })
}

function run_java(dir, main, time_limit = 2000) {
    return new Promise((resolve, reject) => {
        let java_process = exec(`java -cp ${dir}/ ${main}`, (error, stdout, stderr) => {
            if (error || stderr) {
                reject(`exec error: ${error || stderr}`);
                return;
            }
            resolve(`stdout: ${stdout}`);
        });
        console.log(`Running java process with id: ${java_process.pid}`);
        setTimeout(function(){
            reject(`Timeout, killing process with id: ${java_process.pid}`)
            java_process.kill();
        }, time_limit);
    })
}

// don't include the .cpp into main paramter
function compile_cpp(dir, main) {
    return new Promise((resolve, reject) => {
        exec(`g++ -std=c++11 -o ${main}.out ${dir}/${main}.cpp`, (error, stdout, stderr) => {
            if (error || stderr) {
                reject(`exec error: ${error || stderr}`);
                return;
            }
            resolve(`stdout: ${stdout}`);
        });
    })
}

function run_cpp(dir, main, time_limit = 2000) {
    return new Promise((resolve, reject) => {
        let cpp_process = exec(`${dir}/${main}.out`, (error, stdout, stderr) => {
            if (error || stderr) {
                reject(`exec error: ${error || stderr}`);
                return;
            }
            resolve(stdout);
        });
        console.log(`Running cpp process with id: ${cpp_process.pid}`);
        setTimeout(function(){
            reject(`Timeout, killing process with id: ${cpp_process.pid}`)
            cpp_process.kill();
        }, time_limit);
    })
}

function run_python(dir, main, command, time_limit = 2000) {
    return new Promise((resolve, reject) => {
        let python_process = exec(`${command} ${dir}/${main}.py`, (error, stdout, stderr) => {
            if (error || stderr) {
                reject(`exec error: ${error || stderr}`);
                return;
            }
            resolve(stdout);
        });
        console.log(`Running python process with id: ${python_process.pid}`);
        setTimeout(function(){
            reject(`Timeout, killing process with id: ${python_process.pid}`)
            python_process.kill();
        }, time_limit);
    })

}

function run_command(command, time_limit = 2000) {
    return new Promise((resolve, reject) => {
        let child = exec(`${command}`, (error, stdout, stderr) => {
            if (error || stderr) {
                reject(`error: ${error || stderr}`);
            }
            resolve(stdout);
        })
        console.log(`Running process with id: ${child.pid}`);
        setTimeout(function(){
            reject(`Timeout, killing process with id: ${child.pid}`)
        }, time_limit);
    })
}

module.exports = exports = 
{
    compile_java: compile_java,
    compile_cpp: compile_cpp,
    run_java: run_java,
    run_cpp: run_cpp,
    run_python: run_python,
    run_command: run_command,
    get_fileNames: get_fileNames
}

function test() {
    console.log('Testing function: get_fileNames');
    get_fileNames(__dirname)
        .then(fileNames => {
            console.log(fileNames);
        })
        .catch(err => {
            console.log(err);
        })

    console.log('Testing compile_cpp function');
    compile_cpp(__dirname, 'test')
        .then(res => {
            console.log(res);
        })
        .then(() => {
            return run_cpp(__dirname, 'test', 2000);
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })

    console.log("Testing java compile/run functions");
    compile_java(__dirname, 'test')
        .then(res => {
            console.log(res);
            return run_java(__dirname, 'test', 2000);
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })

    console.log("Testing python compile/run functions");
    run_python(__dirname, 'test', 'python3', 2000)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
}

// test();