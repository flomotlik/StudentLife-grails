<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>StudentLife - Wall</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <link rel="stylesheet" type="text/css" href="css/wall.css" />
    <link rel="stylesheet" type="text/css" href="css/Facebook.css"/>

    <script type="text/javascript" src="js/prototype/prototype.js"></script>
    <script type="text/javascript" src="js/userVoice.js"></script>

  </head>
  <body>
    <div class="fbbody">
      <div id="header">
        <div id="wallmenu">
          <a href="javascript:void(null)">Agenda</a> | <a href="javascript:void(null)">Courses</a>
        </div>
        <img id="logo" src="/studentlife/images/logo.png" alt="Student Life logo">
      </div>

      <div id="contents">

        <div id="leftCol" class="clearfix">
          <g:render template="filters" model="${model}"/>

          <a href="javascript:void(null);" class="addLink">+ Add Courses</a>
          <span class="copyright">&copy; 2009-2010 StudentLife</span>
        </div>

        <div id="middle" class="clearfix">
          <g:render template="stream"/>
        </div> <!-- /middle -->

        <div id="rightCol" class="clearfix">
          <g:render template="friends"/>
          <g:render template="colleagues"/>
        </div>

      </div>
    </div>
  </body>
</html>