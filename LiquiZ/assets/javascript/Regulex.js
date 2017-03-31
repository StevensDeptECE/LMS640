$(document).ready(function(){

   // jQuery methods go here...
	$(function() {
		$(".example").each(function() {
			$.data(this, 'default', this.value);
		}).css("color","black")
		.focus(function() {
			if (!$.data(this, 'edited')) {
				this.value = "";
				$(this).css("background-color","white");
			}
		}).change(function() {
			$.data(this, 'edited', this.value != "");
			if(!judgement()){
				alert(this.value);
				$(this).css("background-color","red");
			}
		}).blur(function() {
			if (!$.data(this, 'edited')) {
				this.value = $.data(this, 'default');
				$(this).css("background-color","white");
			}
		});
	});
	
    $("button").click(function(){
        $("p").hide();
    });

});

function judgement(var matching){
	var reg = $(".inregex").value;
	alert(reg);
	 return reg.exec(matching)
}