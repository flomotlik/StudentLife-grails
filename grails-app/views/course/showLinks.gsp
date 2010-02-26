<g:render template="tablinks" model="[course:course]"/>
<g:if test="${course}">
  <g:formRemote name="addLinks" update="showCourse"
    url="[action:'add', controller:'link']">
    <input name="id" type="hidden" value="${course?.id}" />
    <input name="description" type="text" />
    <input name="link" type="text" />
    <input type="submit" value="Post Link" />
  </g:formRemote>
</g:if>
<ul>
  <g:each in="${course?.links}" var="links">
    <li>${links.description}</li>
  </g:each>
</ul>
