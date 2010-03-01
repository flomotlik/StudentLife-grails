<table>
  <thead>
    <tr>
      <th>Date</th>
      <th>Description</th>
      <th>Course</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><g:formatDate date="${todo.date}" /></td>
      <td>${todo.description}</td>
      <td>${todo.course.name}</td>
    </tr>
  </tbody>
</table>