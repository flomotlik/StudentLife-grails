<html>
<head>
<title>StudentLife</title>
<link rel="stylesheet" type="text/css" href="css/studentlife.css" />
<link rel="stylesheet" type="text/css" href="css/calendar.css" />
<link rel="stylesheet" type="text/css" href="css/settings.css" />
<g:javascript library="prototype" />
</head>
<body>
<img id="logo" src="images/logo.png" alt="StudentLife Logo" />
<div id="menu">
<div id="leftmenu"><g:remoteLink controller="menu" action="agenda"
  update="content">
  <img class="menuimage" src="images/menu-agenda.png" alt="Menu Agenda" />
</g:remoteLink> <g:remoteLink controller="menu" action="course" update="content">
  <img class="menuimage" src="images/menu-courses.png"
    alt="Menu Courses" />
</g:remoteLink></div>
<!-- leftmenu -->
<div id="rightmenu"><g:remoteLink controller="menu"
  action="settings" update="content">
  <img class="menuimage" src="images/menu-coursesettings.png"
    alt="Menu Course Settings" style="padding: 4, 0, 0, 0" />
</g:remoteLink> <img class="menuimage" src="images/menu-vborder.png"
  alt="border element" style="padding: 1, 6, 0, 6" /></div>
<!-- rightmenu --></div>
<!-- menu -->
<p>${user.name} - ${user.id} - ID ${user.facebookId}</p>
<div id=content><g:render template="/course/index" /></div>
<!-- main -->
</body>
</html>