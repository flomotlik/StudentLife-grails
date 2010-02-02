<div id="showCourses" class="typeface-js"><img
  src="${resource(dir:'images',file:'mycourses.png')}" alt="my courses" />
<ul>
  <g:each in="${courses.sort{it.name}}" var="course">
    <li><g:link controller="course" action="show"
      id="${course.id}">${course.name}</g:link></li>
  </g:each>
</ul>
</div>