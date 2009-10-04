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
    <h1>Selected City: ${city.name}</h1>
  <g:form name="stateForm" url="[controller:'inscription', action:'addInscription']">
    <g:select from="${universities}" value="${university}" name="university" optionKey="idKey"
              optionValue="name"/>
    <g:submitButton name="select" value="Inscribe to University"/>
    <g:textField name="newUniversity" value="${newUniversity}"/>
    <g:submitButton name="addUniversity" value="Add University"/>
  </g:form>
</body>
</html>
