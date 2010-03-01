<p id="monthSelector">
<g:remoteLink controller="calendar" action="calendar"
  params="[year:(month == 0 ?year - 1 : year), month:(month == 0? 11 : month - 1)]"
  update="calendar"><</g:remoteLink>
  ${year} - ${month + 1}
  <g:remoteLink controller="calendar" action="calendar"
  params="[year:(month == 11 ?year + 1 : year), month:(month == 11? 0 : month + 1)]"
  update="calendar">></g:remoteLink>
  </p>
<table id="calendarTable">
  <tr>
    <th>Mon.</th>
    <th>Tue.</th>
    <th>Wed.</th>
    <th>Thu.</th>
    <th>Fri.</th>
    <th>Sat.</th>
    <th>Sun.</th>
  </tr>
  <g:each in="${rows}" var="row">
    <tr>
      <g:each in="${row}" var="item">
        <td><g:remoteLink
          controller="calendar" action="courseElements"
          params="[date_year:year, date_month:month + 1, date_day:item.day]"
          update="courseElements"><p class="${item.type}">${item.day}</p></g:remoteLink></td>
      </g:each>
    </tr>
  </g:each>
</table>
<div id="element"></div>