<g:applyLayout name="showCourses">
  <html>
  <head>
  <link rel="stylesheet" type="text/css" href="${resource(dir:'css',file:'settings.css')}" />
  <g:layoutHead />
  </head>
  <body>
  <g:link controller="course" action="add">Add Course</g:link>
  <g:link controller="settings" action="index">Join Course</g:link>
  <g:link controller="university" action="index">Manage Universities</g:link>
  <g:layoutBody />
  </body>
  </html>
</g:applyLayout>