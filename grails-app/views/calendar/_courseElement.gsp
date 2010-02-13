<ul>
  <g:each in="${it}" var="item">
    <li><g:formatDate date="${item.date}"/> -
      <g:link action="show" controller="course" id="${item.course.id}">${item.course.name}</g:link></li>
  </g:each>
</ul>