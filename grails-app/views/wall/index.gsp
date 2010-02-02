<html>
<head>
  <meta content="main" name="layout">
</head>
<body>
<g:render template="/user/showCourses" model="['courses':courses]"/>
<g:render template="/course/showColleagues" model="['colleagues':colleagues]"/>
<div id="subContent"></div>
<div id="ad">
  <div class="ad-item, ad-line"></div>
  <img class="ad-item" id="adlogo" src="../images/payedAD.png" alt="Ad"/>
  <div class="ad-item, ad-line"></div>
  <div class="ad-item, typeface-js">paid ad</div>
</div>
</body>
</html>