<table>
  <tr>
    <th>${g.message(code:'name')}</th>
    <th>${g.message(code:'type')}</th>
    <th>${g.message(code:'professor')}</th>
    <th>${g.message(code:'university')}</th>
    <th>${g.message(code:'join')}</th>
  </tr>
  <g:each in="${courses}" var="eachCourse">
    <tr>
      <td>${eachCourse.name}</td>
      <td>${eachCourse.type}</td>
      <td>${eachCourse.professor}</td>
      <td>${eachCourse.university.name}</td>
      <td><g:link controller="user" action="joinCourse" params="[course:eachCourse.id]">${g.message(code:'join')}</g:link></td>
    </tr>
  </g:each>
</table>