<%@ page language="java" import="java.text.SimpleDateFormat,java.util.List,net.sf.json.JSONArray,net.sf.json.JSONObject,net.sf.json.JsonConfig,net.sf.json.JSONObject" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>My first json page</title>
<%            
	List<Assignment> list1 = new ArrayList<Assignment>();//TO DO
	list1.add(assignment1);
	
	JSONArray jsonarray = JSONArray.fromObject(list1);
    %>
<script type="text/javascript" src="js/json2.js"></script>
<script type="text/javascript">
    var xmlHttp;
    function createXmlHttpRequest() {
        if (window.ActiveXObject) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }
    }
    //回调
    function handleStateChange() {
        if (xmlHttp.readyState == 4) {
            if (xmlHttp.status == 200) {
                parseResults();
            }
        }
    }
    //将后台返回的数据显示在层serverResponse中
    function parseResults() {
        var result=xmlHttp.responseXML.getElementsByTagName("result")[0].firstChild.data;
        alert(result);
    }
    function doJSON() {
        var athletehead={athlete_id:1,tablename:"athlete"};
        var myobj=eval(athletehead);
        var str1=JSON.stringify(myobj);//str1以后可用来识别数据库中的表
        var str2='<%=jsonarray%>';
        var url = "servlet/JsonServlet";
        createXmlHttpRequest();
        xmlHttp.open("POST", url, true);
        xmlHttp.onreadystatechange = handleStateChange;//回调
        xmlHttp.setRequestHeader("Content-Type",
                "application/x-www-form-urlencoded;text/xml;charset=utf-8"); //text/xml;charset=utf-8：解决汉字封装json问题
        xmlHttp.send("assignmenthead="+str1+"&assignment="+str2);//传送了两个对象
    }
</script>
</head>
<body>
<form id="form1">
<table>
 <tr>
   <td align="center"><input type="button" name="submit" value="提交" onClick="doJSON()"></td>
 </tr>
</table>
</form>
</body>
</html>