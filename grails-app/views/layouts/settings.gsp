<html>
<head>
  <meta content="main" name="layout"/>
  <title>
    <g:layoutTitle default="StudentLife"/>
  </title>
</head>
<body>
<g:applyLayout name="main">
  <g:render template="/user/showCourses" model="['courses':user.inscriptions*.course]"/>
  <div id="subcontent">
  <g:link controller="course" action="add">Add Course</g:link>
  <g:link controller="university" action="index">Manage Universities</g:link>
  <g:layoutBody/>
</g:applyLayout>
</div>
</body>
</html>