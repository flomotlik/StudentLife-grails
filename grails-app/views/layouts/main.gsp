<html>
<head>
<title>
  <g:layoutTitle default = "StudentLife"/>
</title>
<link rel="stylesheet" type="text/css" href="${resource(dir:'css',file:'main.css')}" />
  <g:layoutHead/>
<g:javascript library="prototype" />
</head>
<body>
<div id="header">
<ul id="navigation">
  <li><g:link controller="calendar" action="index"><g:message code="calendar"/></g:link> |</li>
  <li><g:link controller="wall" action="index"><g:message code="courses"/></g:link> |</li>
  <li><g:link controller="settings" action="index"><g:message code="settings"/></g:link></li>
</ul>
<img id="logo" src="${resource(dir:'images',file:'logo.png')}" alt="StudentLife Logo" />
</div>

</div>

<div id=content>
<g:layoutBody/>
  </div>
<!-- main -->
<!-- Facebook Resizable JavaScript Code -->
<!-- Note: Include this div markup as a workaround for a known bug in this release on IE where you may get a "operation aborted" error -->
<div id="FB_HiddenIFrameContainer" style="display:none; position:absolute; left:-100px; top:-100px; width:0px; height: 0px;"></div> 
<script src="http://static.ak.connect.facebook.com/js/api_lib/v0.4/FeatureLoader.js.php" type="text/javascript"></script> 
<script type="text/javascript"> 
   FB_RequireFeatures(["CanvasUtil"], 
       function(){ 
       FB.XdComm.Server.init('${resource(file:'xd_receiver.html')}');
       FB.CanvasClient.startTimerToSizeToContent(); 
   });
</script>
</body>
</html>