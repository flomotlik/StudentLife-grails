<html>
<head>
  <title>Show Course ${course.name}</title>
  <link rel="stylesheet" type="text/css" href="${resource(dir:'css',file:'showCourse.css')}" />
  <meta content="showCourses" name="layout">
</head>
<body>
<div id="showCourse">
    <g:include action="showMessages" controller="course" id="${course.id}"/>
</div>
<g:render template="/course/showColleagues" model="['colleagues':colleagues]"/>
 
</body>
</html>
