  var prompt = require('prompt');
  var fs = require('fs');
  //
  // Start the prompt
  //
  // prompt.start();
function getInfo(){
  prompt.start();
  const operation = {};
  const object = {};
  const quitPromt
  function stringToOperation(str){
    if (!str) return "something";
    return "another thing";
  }
  prompt.get([operation,object,quitPromt],function(err,result){
    if(result) {
      let object1 = result.object1;
      if(isNaN(object1)){

        return;
      }
    
      let quit = result.quit;
      let operation = stringToOperation(result.operation);
      if(!quit){
        getInfo();
      }
    }else if (err){
      console.error(err)
    }

  })

}
getInfo();
  //
  // Get two properties from the user: username and email
  //
  prompt.get(['username', 'email'], function (err, result) {
    //
    // Log the results.
    //
    console.log('Command-line input received:');
    console.log('  username: ' + result.username);
    console.log('  email: ' + result.email);
  });


  var schema = {
    properties: {
      name: {
        pattern: /^[a-zA-Z\s\-]+$/,
        message: 'Name must be only letters, spaces, or dashes',
        required: true
      },
      password: {
        hidden: true
      }
    }
  };

  //
  // Start the prompt
  //
  prompt.start();

  //
  // Get two properties from the user: email, password
  //
  prompt.get(schema, function (err, result) {
    //
    // Log the results.
    //
    console.log('Command-line input received:');
    console.log('  name: ' + result.name);
    console.log('  password: ' + result.password);
  });

  /*{
    description: 'Enter your password',     // Prompt displayed to the user. If not supplied name will be used.
    type: 'string',                 // Specify the type of input to expect.
    pattern: /^\w+$/,                  // Regular expression that input must be valid against.
    message: 'Password must be letters', // Warning message to display if validation fails.
    hidden: true,                        // If true, characters entered will either not be output to console or will be outputed using the `replace` string.
    replace: '*',                        // If `hidden` is set it will replace each hidden character with the specified string.
    default: 'lamepassword',             // Default value to use if no value is entered.
    required: true                        // If true, value entered must be non-empty.
    before: function(value) { return 'v' + value; } // Runs before node-prompt callbacks. It modifies user's input
  }*/
  let JsonFile;
  JsonFile.readJSON  = (fileName, callback) =>{
    fs.readFile(fileName,"utf-8",(error,data)=>{
      callback(error,JSON.parse(data));
    });
  };
  jsonFile.writeJSON = (fileName,data,callback) =>{
    fs.writeFile(fileName,JSON.stringify(data,null,4),callback)
  };