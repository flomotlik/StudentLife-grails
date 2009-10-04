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
  <g:form name="countryForm" url="[controller:'inscription', action:'addInscription']">
    <g:select from="${countries}" value="${country}" name="country" optionKey="id"
              optionValue="name"/>
    <g:submitButton name="select" value="Select Country"/>
    <g:textField name="newCountry" value="${newCountry}"/>
    <g:submitButton name="addCountry" value="Add Country"/>
  </g:form>
</body>
</html>
