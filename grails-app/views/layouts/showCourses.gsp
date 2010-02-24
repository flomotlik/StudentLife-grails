<html>
<head>
</head>
<body>
<g:applyLayout name="main">
  <g:include controller="user" action="showCourses" />
  <div id="subcontent">
    <g:layoutBody/>
    <div id="ad">
      <div class="ad-item, ad-line"></div>
      <img class="ad-item" id="adlogo" src="${resource(dir:'images',file:'payedAD.png')}" alt="Ad"/>
      <div class="ad-item, ad-line"></div>
      <div class="ad-item, typeface-js">paid ad</div>
    </div>
  </div>
</g:applyLayout>
</body>
</html>