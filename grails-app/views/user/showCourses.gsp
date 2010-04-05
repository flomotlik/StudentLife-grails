<div id="showCourses" class="typeface-js"><img
  src="${resource(dir:'images',file:'mycourses.png')}" alt="my courses" />
<ul>
  <g:each in="${courses}" var="course">
    <li><g:link controller="course" action="show"
      id="${course.id}">
      <sl:subString value="${course.name}" max="14" attach="..." />
      </g:link></li>
  </g:each>
</ul>
</div>