<html>
<head>
  <title>Show Course ${course.name}</title>
  <meta content="showCourses" name="layout">
</head>
<body>
<div id="showCourse">
    <g:include action="showMessages" controller="course" id="${course.id}"/>
</div>
<g:render template="/course/showColleagues" model="['colleagues':colleagues]"/>
 
</body>
</html>
