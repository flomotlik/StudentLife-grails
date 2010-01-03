<html>
<head>
<title>StudentLife</title>
<link rel="stylesheet" type="text/css" href="css/studentlife.css" />
<g:javascript library="prototype" />
</head>
<body>
<img id="logo" src="images/logo.png" alt="StudentLife Logo" />
<div id="menu">
<div id="leftmenu"><img class="menuimage"
  src="images/menu-agenda.png" alt="Menu Agenda"
  style="padding: 3, 0, 0, 4" /> <img class="menuimage"
  src="images/menu-courses.png" alt="Menu Courses"
  style="padding: 3, 0, 0, 1" /></div>
<!-- leftmenu -->
<div id="rightmenu"><img class="menuimage"
  src="images/menu-coursesettings.png" alt="Menu Course Settings"
  style="padding: 4, 0, 0, 0" /> <img class="menuimage"
  src="images/menu-vborder.png" alt="border element"
  style="padding: 1, 6, 0, 6" /></div>
<!-- rightmenu --></div>
<!-- menu -->
<div id=content><g:render template="/user/showCourses"
  model="['courses':courses]" />
<div id="course"><g:render template="/course/show" /></div>
<div id="ad">
<div class="ad-item, ad-line"></div>
<img class="ad-item" id="adlogo" src="images/payedAD.png" alt="Ad" />
<div class="ad-item, ad-line"></div>
<div class="ad-item, typeface-js">paid ad</div>
</div>
<!-- ad --></div>
<!-- main -->
</body>
</html>