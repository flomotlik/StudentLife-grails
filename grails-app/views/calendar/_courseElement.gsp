<ul>
  <g:each in="${it}" var="item">
    <li><g:formatDate date="${item.date}"/> -
      <g:remoteLink action="show" controller="${item.class.simpleName.toLowerCase()}" id="${item.id}" update="element">
        ${item.course.name}
      </g:remoteLink></li>
  </g:each>
</ul>