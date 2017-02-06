  // 'JSON' data included as above
   data = '[{"blue" : "is ok", "red" : "is my fave color"}]';

  // Function to 'load JSON' data
   function load() {
    var someData_notJSON = JSON.parse(data);
    console.log(someData_notJSON[0].red); // Will log "is my fave color"
    }