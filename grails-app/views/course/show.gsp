<html>
<head>
  <title>Show Course ${course.name}</title>
  <meta content="main" name="layout">
</head>
<body>
<g:render template="/user/showCourses" model="['courses':courses]"/>
<div id="subContent">
<g:render template="/course/showCourse" model="['course':course]" />
<g:render template="/course/showColleagues" model="['colleagues':colleagues]"/>
</div>
</body>
</html>
