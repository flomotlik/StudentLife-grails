<html>
<head>
  <title>Show Course ${course.name}</title>
  <meta content="showCourses" name="layout">
</head>
<body>
<g:render template="/course/showCourse" model="['course':course]"/>
<g:render template="/course/showColleagues" model="['colleagues':colleagues]"/>
</body>
</html>
