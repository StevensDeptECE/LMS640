const inputField = $('#inputField');

(function($) {
    console.log('post.js');
    
    $('#postForm').submit((e) => {
        e.preventDefault();
        // console.log(marked);
        console.log(e);
        let post = $('#inputField').val();
        console.log(marked(post));
        // post = $('#status-box').data('markdown').parseContent();
        // console.log(post);
    })


    // inputField.bind('input propertychange', function(e) {
    // 	console.log(inputField.val());
    // 	console.log(inputField.prop("selectionStart"));
    // });


    // console.log('userbtn.val() is ' + userbtn.val());
    // if (userbtn.val().length > 0) {
    //     console.log('in front, userbtn length >0');
    //     loginbtn.addClass("hidden");
    //     userbtn.removeClass("hidden");
    // } else {
    //     console.log('in front, userbtn length does not>0');
    //     $("#post-form").addClass('hidden');

    //     $("#post-form-alert").text('Please login first');
    //     $("#post-form-alert").removeClass('hidden');
    // }


})($)


var storage = firebase.storage();
var storageRef = storage.ref();
var imagesRef = storageRef.child('images-web');

function insertAtCursor(myField, myValue) {
    //IE support
    if (document.selection) {
        myField.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (myField.selectionStart || myField.selectionStart == '0') {
        var startPos = myField.selectionStart;
        var endPos = myField.selectionEnd;
        myField.value = myField.value.substring(0, startPos) +
            myValue +
            myField.value.substring(endPos, myField.value.length);
    } else {
        myField.value += myValue;
    }
}

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
    var file = files[0];
    // TODO: 
    // 1.prevent multiple files
    // 2.file can only be image.jpg
    // 3.change the image size to some thing normal

    imagesRef.child(guid()).put(file).then(function(snapshot) {

        // ![enter image description here](http://cdn.aixifan.com/dotnet/20130418/umeditor/dialogs/emotion/images/ac/8.gif  "enter image title here")
        insertAtCursor(document.getElementById('inputField'), "![enter image description here](" + snapshot.downloadURL + '  "enter image title here")');
        console.log(snapshot.downloadURL);
        console.log('Uploaded a blob or file!');
    });
}

function rangeEnterHandler(enter) {
    enter.preventDefault();
    enter.stopPropagation();

    console.log('entering: ', enter);
}