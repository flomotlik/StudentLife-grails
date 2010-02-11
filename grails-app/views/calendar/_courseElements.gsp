<g:if test="${year != null && month != null && day != null}">
  <g:remoteLink controller="calendar" action="addCourseDate"
          params="[date_day:day, date_month:month, date_year:year]" update="calendar">Add Course Date</g:remoteLink>
</g:if>
<ul class="courseElements">
  <g:each in="${events}" var="event">
    <li>${event.description} - <g:formatDate date="${event.date}"
            type="date" style="SHORT"/></li>
  </g:each>
</ul>
<g:if test="${year != null && month != null && day != null}">
  <g:remoteLink controller="calendar" action="addDeadline"
          params="[date_day:day, date_month:month, date_year:year]" update="calendar">Add Deadline</g:remoteLink>
</g:if>
<ul class="courseElements">
  <g:each in="${todos}" var="todo">
    <li>${todo.description} - <g:formatDate date="${todo.date}"
            type="date" style="SHORT"/></li>
  </g:each>
</ul>