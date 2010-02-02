<html>
<head>
  <meta content="main" name="layout">
  <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'input.css')}"/>
</head>
<body>
<g:formRemote name="addCourse" update="content"
        url="[controller: 'course', action: 'save']">
  <g:select name="university" from="${universities}" optionKey="id"
          optionValue="name" value="${universities[0]}"/>
  <label for="name">Name</label>
  <input id="name" name="name" type="text"/>
  <label for="professor">Professor</label>
  <input id="professor" name="professor" type="text"/>
  <label for="identificator">Identificator</label>
  <input id="identificator" name="identificator" type="text"/>
  <label for="type">Type</label>
  <input id="type" name="type" type="text"/>
  <input type="submit" value="Add"/>
</g:formRemote>
</body>
</html>