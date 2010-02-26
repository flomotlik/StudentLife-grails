<g:paginate controller="wall" action="index" total="${total}" next="Next" prev="Prev"/>
<ul>
<g:each in="${news}">
  <li>
    <g:render template="${it.class.simpleName.toLowerCase()}" bean="${it}"/>
  </li>
</g:each>
</ul>