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
    <h1>Selected Country: ${country.name}</h1>
  <g:form name="stateForm" url="[controller:'inscription', action:'addInscription']">
    <g:select from="${states}" value="${state}" name="state" optionKey="idKey"
              optionValue="name"/>
    <g:submitButton name="select" value="Select State"/>
    <g:textField name="newState" value="${newCountry}"/>
    <g:submitButton name="addState" value="Add State"/>
  </g:form>
</body>
</html>
