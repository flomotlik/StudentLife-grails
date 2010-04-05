<g:applyLayout name="showCourses">
<html>
<head>
  <title>Show Course ${course.name}</title>
  <link rel="stylesheet" type="text/css" href="${resource(dir:'css',file:'showCourse.css')}" />
</head>
<body>
<h2>${course.name}</h2>
<div id="showCourse">
    <g:include action="showMessages" controller="course" id="${course.id}"/>
</div>
<g:render template="/course/showColleagues" model="['colleagues':colleagues]"/>
 
</body>
</html>
</g:applyLayout>