<html>
<head>
  <title>
    <g:layoutTitle default="StudentLife"/>
  </title>
  <g:layoutHead/>
</head>
<body>
<g:applyLayout name="showCourses">
  <g:link controller="course" action="add">Add Course</g:link>
  <g:link controller="settings" action="index">Join Course</g:link>
  <g:link controller="university" action="index">Manage Universities</g:link>
  <g:layoutBody/>
</g:applyLayout>
</body>
</html>