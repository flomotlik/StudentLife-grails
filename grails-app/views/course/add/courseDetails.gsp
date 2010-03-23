<html>
<head>
  <meta content="settings" name="layout">
  <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'input.css')}"/>
</head>
<body>
<g:form name="addCourse" action="add">
  <g:select name="university" from="${universities}" optionKey="id"
          optionValue="name" value="${university?.id}"/>
  <label for="name">Name</label>
  <input id="name" name="name" type="text" value="${course?.name}"/>
  <label for="professor">Professor</label>
  <input id="professor" name="professor" type="text" value="${course?.professor}"/>
  <label for="identificator">Identificator</label>
  <input id="identificator" name="identificator" type="text" value="${course?.identificator}"/>
  <label for="type">Type</label>
  <input id="type" name="type" type="text" value="${course?.type}"/>
  <g:render template="add/buttons" model="[backDisabled:true]"/>
</g:form>
</body>
</html>