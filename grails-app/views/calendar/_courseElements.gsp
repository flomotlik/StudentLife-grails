<ul>
  <g:each in="${todos}" var="todo">
    <li>${todo.description} - <g:formatDate date="${todo.date}"
      type="date" style="SHORT" /></li>
  </g:each>
</ul>
<ul>
  <g:each in="${events}" var="event">
    <li>${event.description} - <g:formatDate date="${event.date}"
      type="date" style="SHORT" /></li>
  </g:each>
</ul>