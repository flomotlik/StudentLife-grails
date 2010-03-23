<html>
<head>
  <meta content="settings" name="layout">
  <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'input.css')}"/>
</head>
<body>
<g:renderErrors bean="${event}" as="list" />
<g:form name="addCourse" action="add">
  <g:datePicker name="date" value="${new Date()}" precision="minute"/>
  <label for="description"><g:message code="description"/></label>
  <g:textField name="description"/>
  <label for="duration"><g:message code="durationInMinutes"/></label>
  <g:textField name="duration"/>
  <g:submitButton name="add" value="${g.message(code:'add')}"/>
  <g:render template="add/buttons"/>
</g:form>
<table>
  <tr>
    <th><g:message code="date"/></th>
    <th><g:message code="description"/></th>
    <th><g:message code="durationInMinutes"/></th>
    <th><g:message code="remove"/></th>
  </tr>
<g:each in="${course?.events?.sort{it.date}}" status="status" var="events">
 <tr>
   <td><g:formatDate date="${events.date}"/></td>
   <td>${events.description}</td>
   <td>${events.duration}</td>
   <td><g:link action="add" event="remove" id="${status}"><g:message code="remove"/></g:link></td>
 </tr>
</g:each>
</table>
</body>
</html>