<div id="deadlines">
  <p><g:message code="deadlines"/></p>
  <g:if test="${year != null && month != null && day != null}">
    <g:remoteLink controller="calendar" action="addDeadline"
            params="[date_day:day, date_month:month, date_year:year]" update="calendar">Add</g:remoteLink>
  </g:if>
  <g:render template="courseElement" bean="${todos}"/>
</div>
<div id="dates">
  <p><g:message code="dates"/></p>
  <g:if test="${year != null && month != null && day != null}">
    <g:remoteLink controller="calendar" action="addCourseDate"
            params="[date_day:day, date_month:month, date_year:year]" update="calendar">Add</g:remoteLink>
  </g:if>
  <g:render template="courseElement" bean="${events}"/>
</div>