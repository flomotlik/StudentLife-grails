<html>
<head>
  <meta content="settings" name="layout">
  <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'input.css')}"/>
</head>
<body>
<g:form name="addCourse" action="add">
  <g:select name="university" from="${universities?.sort{it.name}}" optionKey="id"
          optionValue="name" value="${universities?.getAt(0)}"/>
  <label for="name">Name</label>
  <input id="name" name="name" type="text"/>
  <label for="professor">Professor</label>
  <input id="professor" name="professor" type="text"/>
  <label for="identificator">Identificator</label>
  <input id="identificator" name="identificator" type="text"/>
  <label for="type">Type</label>
  <input id="type" name="type" type="text"/>
  <g:submitButton name="dates" value="Dates"/>
  <g:submitButton name="cancel" value="Cancel"/>
</g:form>
</body>
</html>