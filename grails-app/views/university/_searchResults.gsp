<table>
  <tr>
    <th>${g.message(code:'name')}</th>
    <th>${g.message(code:'city')}</th>
    <th>${g.message(code:'join')}</th>
  </tr>
  <g:each in="${universities}" var="university">
    <tr>
      <td>${university.name}</td>
      <td>${university.city.name}</td>
      <td><g:link controller="user" action="joinUniversity" params="[university:university.id]">${g.message(code:'join')}</g:link></td>
    </tr>
  </g:each>
</table>