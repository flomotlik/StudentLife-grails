<table>
  <tr>
    <th>Name</th>
    <th>City</th>
    <th>Join</th>
  </tr>
  <g:each in="${universities}" var="university">
    <tr>
      <td>${university.name}</td>
      <td>${university.city.name}</td>
      <td><g:link controller="user" action="joinUniversity" params="[university:university.id]">Join</g:link></td>
    </tr>
  </g:each>
</table>