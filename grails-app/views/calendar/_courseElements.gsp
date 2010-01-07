<g:if test="${year && month && day}">
  <g:remoteLink controller="calendar" action="addCourseDate"
    params="[year:year, month:month, day:day]" update="calendar">Add Course Date</g:remoteLink>
</g:if>
<ul class="courseElements">
  <g:each in="${events}" var="event">
    <li>${event.description} - <g:formatDate date="${event.date}"
      type="date" style="SHORT" /></li>
  </g:each>
</ul>
<g:if test="${year && month && day}">
  <g:remoteLink controller="calendar" action="addDeadline"
    params="[year:year, month:month, day:day]" update="calendar">Add Deadline</g:remoteLink>
</g:if>
<ul class="courseElements">
  <g:each in="${todos}" var="todo">
    <li>${todo.description} - <g:formatDate date="${todo.date}"
      type="date" style="SHORT" /></li>
  </g:each>
</ul>