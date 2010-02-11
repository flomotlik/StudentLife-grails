<%@ page contentType="text/html;charset=UTF-8" %>
<div id="friends" class="rightcontainer">
  <h3><g: message code="studentlife.wall.friends"</h3><br/><br/>
  <g:each var="friend" in="${friends}">
  <div class="connectionContainer">
    <a href="${userinfo[friend.id].url}"><img src="${userinfo[friend.id].image}" alt="${friend.name}" class="portrait"><br/><span class="fname">${friend.name}</span></a>
  </div>
  </g:each>

  <div class="more">
    <a href="javascript:void(null);" class="morelink">More</a>
  </div>
</div>