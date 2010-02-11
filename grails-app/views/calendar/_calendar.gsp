<table>
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
        <td class="${item.type}"><g:remoteLink
          controller="calendar" action="courseElements"
          params="[date_year:year, date_month:month + 1, date_day:item.day]"
          update="courseElements">${item.day}</g:remoteLink></td>
      </g:each>
    </tr>
  </g:each>
</table>
<g:remoteLink controller="calendar" action="calendar"
  params="[year:(month == 0 ?year - 1 : year), month:(month == 0? 11 : month - 1)]"
  update="calendar">Before</g:remoteLink>
<g:remoteLink controller="calendar" action="calendar"
  params="[year:(month == 11 ?year + 1 : year), month:(month == 11? 0 : month + 1)]"
  update="calendar">Next</g:remoteLink>
<p>${year} - ${month + 1}</p>