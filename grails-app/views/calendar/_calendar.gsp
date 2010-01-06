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
        <td><g:remoteLink controller="calendar"
          action="courseElements"
          params="[year:year, month:month, day:item]"
          update="courseElements">${item}</g:remoteLink></td>
      </g:each>
    </tr>
  </g:each>
</table>
