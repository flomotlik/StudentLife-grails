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
    <h1>Selected State: ${state.name}</h1>
  <g:form name="stateForm" url="[controller:'inscription', action:'addInscription']">
    <g:select from="${cities}" value="${city}" name="city" optionKey="idKey"
              optionValue="name"/>
    <g:submitButton name="select" value="Select City"/>
    <g:textField name="newCity" value="${newCity}"/>
    <g:submitButton name="addCity" value="Add City"/>
  </g:form>
</body>
</html>
