$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });
    //login panel:
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//upload file button
$('#filecount').filestyle({
 input : false,
 buttonName : 'btn-danger',
 iconName : 'glyphicon glyphicon-folder-close'
}); 
    
//pick up time 
$('#datetimepicker2').datetimepicker({
  language: 'en',
  pick12HourFormat: true
});
    

});
// choose time button / form
//        $(document).ready(function(){
//      var date_input=$('input[name="date"]'); //our date input has the name "date"
//      var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
//      var options={
//        format: 'mm/dd/yyyy',
//        container: container,
//        todayHighlight: true,
//        autoclose: true,
//		language: 'en',
//		autoclose: true,
//		
//      };
//      date_input.datepicker(options);
//    })
