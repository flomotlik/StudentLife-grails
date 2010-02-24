<html>
<head>
  <meta content="settings" name="layout">
  <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'input.css')}"/>
</head>
<body>
<g:renderErrors bean="${todo}" as="list" />
<g:form name="addCourse" action="add">
  <g:datePicker name="date" value="${new Date()}" precision="minute"/>
  <label for="description">Description</label>
  <g:textField name="description"/>
  <g:submitButton name="add" value="Add Deadline"/>
  <g:submitButton name="save" value="Save"/>
</g:form>
<table>
  <tr>
    <th>Date</th>
    <th>Description</th>
    <th>Remove</th>
  </tr>
<g:each in="${course?.todos?.sort{it.date}}" status="status" var="todo">
 <tr>
   <td><g:formatDate date="${todo.date}"/></td>
   <td>${todo.description}</td>
   <td><g:link action="add" event="remove" id="${status}">Remove</g:link></td>
 </tr>
</g:each>
</table>
</body>
</html>