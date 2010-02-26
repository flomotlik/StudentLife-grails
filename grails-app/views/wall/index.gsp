<html>
<head>
  <meta content="showCourses" name="layout">
</head>
<body>
<g:include action="news" controller="wall" params="[offset:offset, max:max]"/>
<g:render template="/course/showColleagues" model="['colleagues':colleagues]"/>
</body>
</html>