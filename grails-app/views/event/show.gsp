<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Description</th>
      <th>Duration</th>
      <th>Course</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><g:formatDate date="${event.date}" /></td>
      <td>${event.description}</td>
      <td>${event.duration} </td>
      <td>${event.course.name}</td>
    </tr>
  </tbody>
</table>