<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
<script type="text/javascript" src="js/jquery-1.4.2.min.js"></script>
<script type="text/javascript">
    function test(){
      $.ajax({
        type:"POST", //请求方式
        url:"servlet/JsonFromServlet",//请求路径
        cache: false,
        data:"name=zah", /传参
        dataType: 'json',//返回值类型
      success:function(json){
        alert(json[1].username+" "+ json[1].password);//弹出返回过来的List对象
                }
       });
      }
</script>
  </head>
  <body>
    <input type="button" name="b" value="test">
  </body>
</html>