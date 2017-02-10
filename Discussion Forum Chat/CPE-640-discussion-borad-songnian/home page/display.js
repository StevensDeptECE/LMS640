$(function() {
   var people = [];

   $.getJSON('people.json', function(data) {
       $.each(data.project, function(i, f) {
          var tblRow = "<div class='col-xs-6 col-lg-6'>" + "<h2>" + f.projectName + "</h2>" +
           "<p>" + f.projectInfo + "</p>" + "<br>" + "<p>" + f.project_start_time + "</p>" + "<br>" + "<p>" + f.project_end_time + "</p>" + "</div>"
           $(tblRow).appendTo("#userdata tbody");
           
//           for(var i = 0 ; i < f.projectMemberInfo.length; i ++)
//               {
//                   var name = "<a href='#'>" +f.projectMemberInfo[i] +"</a>";
//                   $(name).appendTo("#discussion div");
//               }
     });
       
   });

});