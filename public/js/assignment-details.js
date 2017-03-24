// var homework = [];

// $.getJSON('homework.json',function(data){
//     $each(data.homework,function(i,f){
//         var text = JSON.stringify(value: any, replacer?: any, space?: any)
//     })
// })

$('#assi-query').submit(function(event) {
    event.preventDefault();    
    let hwname = $('#hwname').val();
    console.log(hwname);
    $.ajax({    
        url: `http://localhost:3000/homework/${hwname}`,
        type: 'GET',
        success: function(data) {
            console.log(JSON.stringify(data));
            $('#result').text(JSON.stringify(data));
        }
    })
    .done(function() {
        console.log("success");
    })
    .fail(function(err) {
        console.log(err);
    })
    .always(function() {
        console.log("complete");
    });
})