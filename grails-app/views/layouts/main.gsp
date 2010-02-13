<html>
<head>
<title>
  <g:layoutTitle default = "StudentLife"/>
</title>

<link rel="stylesheet" type="text/css" href="${resource(dir:'css',file:'studentlife.css')}" />
  <g:layoutHead/>
<g:javascript library="prototype" />
</head>
<body>
<img id="logo" src="${resource(dir:'images',file:'logo.png')}" alt="StudentLife Logo" />
<div id="menu">
<div id="leftmenu"><g:link controller="calendar" action="index">
  <img class="menuimage" src="${resource(dir:'images',file:'menu-agenda.png')}" alt="Menu Agenda" />
</g:link> <g:link controller="wall" action="index">
  <img class="menuimage" src="${resource(dir:'images',file:'menu-courses.png')}"
    alt="Menu Courses" />
</g:link></div>
<!-- leftmenu -->
<div id="rightmenu"><g:link controller="settings" action="index">
  <img class="menuimage" src="${resource(dir:'images',file:'menu-coursesettings.png')}"
    alt="Menu Course Settings" style="padding: 4, 0, 0, 0" />
</g:link> <img class="menuimage" src="${resource(dir:'images',file:'menu-vborder.png')}"
  alt="border element" style="padding: 1, 6, 0, 6" /></div>
<!-- rightmenu --></div>
<!-- menu -->
<div id=content>
<g:layoutBody/>
  </div>
<!-- main -->
</body>
</html>