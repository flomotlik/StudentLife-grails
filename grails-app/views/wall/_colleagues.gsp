<%@ page contentType="text/html;charset=UTF-8" %>
<div id="colleagues" class="rightcontainer">
  <h3><g: message code="studentlife.wall.colleagues"</h3><br/><br/>
  <g:each var="colleague" in="${colleagues}">
  <div class="connectionContainer">
    <a href="${userinfo[colleague.id].url}"><img src="${userinfo[colleague.id].image}" alt="${colleague.name}" class="portrait"><br/><span class="fname">${colleague.name}</span></a>
  </div>
  </g:each>

  <div class="more">
    <a href="javascript:void(null);" class="morelink">More</a>
  </div>
</div>