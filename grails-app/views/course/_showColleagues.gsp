<div id="showColleagues">
<div class="aa_container">
  <g:each in="${colleagues}" var="colleague">
    <div class="aa_box">
      <img class="aa_image" src="${userInfo[colleague.facebookId]?.image}"/>
      <div class="aa_name typeface-js"><a href="#link">${userInfo[colleague.facebookId]?.name}</a></div>
      <div class="aa_link"><a href="${userInfo[colleague.facebookId]?.url}" target="_top">Add as friend</a></div>
    </div>
    <img src="${resource(dir:'images',file:'columnborder.png')}" class="aa_separator"/>
  </g:each>
</div> <!-- aa_container-->
</div> <!-- showColleagues-->