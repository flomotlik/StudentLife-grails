<g:paginate controller="wall" action="index" total="${total}" next="Next" prev="Prev"/>
<ul class="wall_ul">
<g:each in="${news}" var="newsItem">
  <%def url = "http://www.facebook.com/profile.php?id=$newsItem.creator.facebookId" %>
  <li class="wall_li" style="background-image: url('${userInfo[newsItem.creator.facebookId]?.image}');">
   <h3><sl:facebookProfileLink facebookId="${newsItem.creator.facebookId}" text="${newsItem.creator.name}"/>
      <span>-</span>
      <g:link controller="course" action="show"
      id="${newsItem.course.id}">${newsItem.course.name}</g:link>
   </h3>
    <g:render template="${newsItem.class.simpleName.toLowerCase()}" model="['it':newsItem, 'userInfo':userInfo]"/>
    <div class="dateCreated"><g:formatDate date="${newsItem.dateCreated}"/></div>
  </li>
</g:each>
</ul>
