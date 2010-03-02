<g:paginate controller="wall" action="index" total="${total}" next="Next" prev="Prev"/>
<ul class="wall_ul">
<g:each in="${news}">
  <li class="wall_li">
    <g:render template="${it.class.simpleName.toLowerCase()}" model="['it':it]"/>
  </li>
</g:each>
</ul>