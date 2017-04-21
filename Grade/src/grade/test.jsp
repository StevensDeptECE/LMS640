<!doctype html>
<html>
<head>
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script>
$(document).ready(function() {
	$("#set-grade").click(function(event){
		$(".overlay").fadeToggle("fast");
      });
});
$(document).ready(function() {
    $(".close").click(function(){
        $(".overlay").fadeToggle("fast");
    });
});
$(document).ready(function() {
    $(document).keyup(function(e) {
        if(e.keyCode == 27 && $(".overlay").css("display") != "none" ) { 
            $(".overlay").fadeToggle("fast");
        }
    });
});
</script>
<style>

div.overlay {
    background-color: rgba(0,0,0,.25);
    bottom: 0;
    left: 0;
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    justify-content: center;
}
div.overlay > div.set-wrapper {
    align-self: center;
    background-color: rgba(0,0,0,.25);
    border-radius: 2px;
    padding: 6px;
    width: 450px;
}
div.overlay > div.set-wrapper > div.set-content {
	background-color: rgb(255,255,255);
    border-radius: 2px;
    padding: 24px;    
    position: relative;
}
div.overlay > div.set-wrapper > div.set-content > h1 {
    color: rgb(0,0,0);
    font-family: 'Varela Round', sans-serif;
    font-size: 1.8em;
    margin: 0 0 1.25em;
    padding: 0;
}
a.close {
    background-color: rgb(204,204,204);
    border-radius: 75%;
    color: rgb(255,255,255);
    display: block;
    font-family: 'Varela Round', sans-serif;
    font-size: .8em;
    padding: .1em .5em;
    position: absolute;
    top: 1.25rem;
    transition: all 400ms ease;
    right: 1.25rem;
}
     
a.close:hover {
    background-color: #1bc5b3;
    cursor: pointer;
}
form button {
    background-color: #50c1e9;
    border: 1px solid rgba(0,0,0,.1);
    color: rgb(255,255,255);
    font-family: 'Varela Round', sans-serif;
    font-size: .85em;
    padding: .55em .9em;
    transition: all 400ms ease;    
}
 
form button:hover {
     background-color: #1bc5b3;
     cursor: pointer;
}
</style>
</head>
<body>
<a id="set-grade">set</a>
<div class="overlay" style="display:none;">
	<div class="set-wrapper">
		<div class="set-content">
		<a class="close">x</a>
		<h1>Grade Setting</h1>
		<form method="post" action="set-grade.java">
			<label for="max-grade">
        		max-grade
        		<input type="text" name="max-grade" id="max-grade" placeholder="input the max grade" pattern="+\d" required="required" />
        	</label>
        	<br>
        	<label for="max-grade">
        		lowest-grade
        		<input type="text" name="lowest-grade" id="lowest-grade" placeholder="input the lowest grade" pattern="+\d" required="required" />
        	</label>
        	<br>
			<button type="submit" style="margin-top:20px;">Save</button>
		</form>
		</div>
	</div>
</div>
</body>
</html>