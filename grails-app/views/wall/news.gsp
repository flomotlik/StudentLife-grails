<g:paginate controller="wall" action="index" total="${total}" next="Next" prev="Prev"/>
<ul style="list-style-type:none;padding: 0px;margin: 0px;">
<g:each in="${news}">
  <li style="background-image: url('${userInfo[it.creator.facebookId]?.image}');background-repeat: no-repeat;background-position: 0px 5px;padding-left: 50px;">
    <g:render template="${it.class.simpleName.toLowerCase()}" model="['it':it, 'userInfo':userInfo]"/>
  </li>
</g:each>
</ul>