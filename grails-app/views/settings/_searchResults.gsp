<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Professor</th>
    <th>University</th>
    <th>Join</th>
  </tr>
  <g:each in="${courses}" var="eachCourse">
    <tr>
      <td>${eachCourse.name}</td>
      <td>${eachCourse.type}</td>
      <td>${eachCourse.professor}</td>
      <td>${eachCourse.university.name}</td>
      <td><g:link controller="user" action="joinCourse" params="[course:eachCourse.id]">Join</g:link></td>
    </tr>
  </g:each>
</table>