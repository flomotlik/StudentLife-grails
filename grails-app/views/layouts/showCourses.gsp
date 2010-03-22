<g:applyLayout name="main">
<html>
  <head>
  <g:layoutHead />
  <link rel="stylesheet" type="text/css" href="${resource(dir:'css',file:'wall.css')}" />
  </head>
  <body>
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
    </body>
  </html>
</g:applyLayout>