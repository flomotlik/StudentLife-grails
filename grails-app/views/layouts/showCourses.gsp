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
  </div>
    </body>
  </html>
</g:applyLayout>