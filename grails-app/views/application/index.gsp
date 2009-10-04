<!--
  To change this template, choose Tools | Templates
  and open the template in the editor.
-->

<%@ page contentType="text/html;charset=UTF-8" %>

<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Sample title</title>
  </head>
  <body>
    <p>You are logged in as ${session.user.name} with id ${session.user.facebookId}</p>
  <g:link controller="inscription" action="addInscription">Inscriptions</g:link>
  <table>
    <tr>
      <th>
        Name
      </th>
    </tr>
    <g:each in="${universities}">
      <tr>
        <td>${it.name}</td>
      </tr>
    </g:each>
  </table>
</body>
</html>
