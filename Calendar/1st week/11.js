

    function calendar() {

        var today = new Date();

        var year = today.getFullYear();      //this year

        var month = today.getMonth() + 1;    //this month

        var day = today.getDate();           //today

        var startDay = new Date(year, month - 1, 1).getDay();

        var nDays = new Date(year, month, 0).getDate();

        var numRow = 0;  

        var i;      

        var html = '';

        html += '<table id="Body" width="212"><tbody>';


        html += '<tr>';

        for (i = 0; i < startDay; i++) {

            html += '<td></td>';

            numRow++;

        }

        for (var j = 1; j <= nDays; j++) {

           

            if (j == day) {

                html += '<td style="color:red" onclick="' + "alert('today is " + j + "');" + '">';

                html += j;  

            }

            else {

                html += '<td onclick="' + "alert('this is " + j + "');" + '">';

                html += j;    
            }

            html += '</td>';

            numRow++;

            if (numRow == 7) {  

                numRow = 0;

                html += '</tr><tr>';

            }

        }

 

        html += '</tbody></table>';

        document.getElementById("Container").innerHTML = html;

    }

