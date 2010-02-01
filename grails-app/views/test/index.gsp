<%--
  Created by IntelliJ IDEA.
  User: mike
  Date: Feb 1, 2010
  Time: 2:54:05 PM
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" %>
<html>
  <head><title>Simple GSP page</title></head>
  <body>
  <img src="${my.image}"/> <br/>
  My facebook id: ${my.id} <br/>
  My name: ${my.name}           <br/>

  Friends:<br/>
  <ul>
  <g:each var="friend" in="${friends}" >
       <li><img src="${friend.image}"/>
         ${friend.id} : ${friend.name}
       </li>
  </g:each>
  </ul>
  </body>
</html>