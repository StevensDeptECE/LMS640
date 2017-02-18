function draw(){
    show(textarea);
    show(drawButton);
}

function textArea() {
    var input = document.createElement('textarea');
    input.name = 'post';
    input.maxLength = 5000;
    input.cols = 80;
    input.rows = 40;
    input.className = 'myCustomTextarea';
   
    var oBody = document.getElementById("textarea");
    while (oBody.childNodes.length > 0) {
        oBody.removeChild(oBody.childNodes[0]);
    }
    oBody.appendChild(input);
 }
 function drawButton(){
     var button = document.createElement('button');
     var oBody = document.getElementById("button");
     while (oBody.childNodes.length > 0) {
        oBody.removeChild(oBody.childNodes[0]);
    }
    oBody.appendChild(button);
 }