<div class="calendar">
  <div class="calendar_row">
    <div class="calendar_item">Mon.</div>
    <div class="calendar_item">Tue.</div>
    <div class="calendar_item">Wed.</div>
    <div class="calendar_item">Thu.</div>
    <div class="calendar_item">Fri.</div>
    <div class="calendar_item">Sat.</div>
    <div class="calendar_item">Sun.</div>
  </div>
  <g:each in="${rows}" var="row">
    <div class="calendar_row">
      <g:each in="${row}" var="item">
      	<div class="calendar_item">
      	<sl:calendarItem item="${item}" year="${year}" month="${month}"/>
      	</div>
      </g:each>
    </div>
  </g:each>
</div>
<div class="calendar_links">

<g:remoteLink controller="calendar" action="calendar"
  params="[year:(month == 0 ?year - 1 : year), month:(month == 0? 11 : month - 1)]"
  update="calendar">Before</g:remoteLink>
<g:remoteLink controller="calendar" action="calendar"
  params="[year:(month == 11 ?year + 1 : year), month:(month == 11? 0 : month + 1)]"
  update="calendar">Next</g:remoteLink>
<p>${year} - ${month + 1}</p>
</div>
  