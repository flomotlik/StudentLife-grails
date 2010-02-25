<html>
<head>
  <meta content="settings" name="layout">
  <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'input.css')}"/>
</head>
<body>
<g:renderErrors bean="${event}" as="list" />
<g:form name="addCourse" action="add">
  <g:datePicker name="date" value="${new Date()}" precision="minute"/>
  <label for="description">Description</label>
  <g:textField name="description"/>
  <label for="duration">Duration in Minutes</label>
  <g:textField name="duration"/>
  <g:submitButton name="add" value="Add Date"/>
  <g:render template="add/buttons"/>
</g:form>
<table>
  <tr>
    <th>Date</th>
    <th>Description</th>
    <th>Duration</th>
    <th>Remove</th>
  </tr>
<g:each in="${course?.events?.sort{it.date}}" status="status" var="events">
 <tr>
   <td><g:formatDate date="${events.date}"/></td>
   <td>${events.description}</td>
   <td>${events.duration}</td>
   <td><g:link action="add" event="remove" id="${status}">Remove</g:link></td>
 </tr>
</g:each>
</table>
</body>
</html>