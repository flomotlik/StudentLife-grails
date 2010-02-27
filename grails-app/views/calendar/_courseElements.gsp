<div id="deadlines">
  <p><g:message code="deadlines"/><span class="todo">&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
  <g:if test="${year != null && month != null && day != null}">
    <g:remoteLink controller="calendar" action="addDeadline"
            params="[date_day:day, date_month:month, date_year:year]" update="calendar">Add</g:remoteLink>
  </g:if>
  <g:render template="courseElement" bean="${todos}"/>
</div>
<div id="dates">
  <p><g:message code="dates"/><span class="event"/>&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
  <g:if test="${year != null && month != null && day != null}">
    <g:remoteLink controller="calendar" action="addCourseDate"
            params="[date_day:day, date_month:month, date_year:year]" update="calendar">Add</g:remoteLink>
  </g:if>
  <g:render template="courseElement" bean="${events}"/>
</div>
<div id="both">
  <p><g:message code="both"/><span class="both"/>&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
</div>