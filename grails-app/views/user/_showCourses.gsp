<div id="showCourses" class="typeface-js"><img
  src="images/mycourses.png" alt="my courses" />
<ul>
  <g:each in="${courses}" var="course">
    <li><g:remoteLink controller="course" action="show"
      id="${course.id}" update="course">${course.name}</g:remoteLink></li>
  </g:each>
</ul>
</div>