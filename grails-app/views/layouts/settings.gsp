<g:applyLayout name="showCourses">
  <html>
  <head>
  <link rel="stylesheet" type="text/css" href="${resource(dir:'css',file:'settings.css')}" />
  <g:layoutHead />
  </head>
  <body>
  <g:link controller="course" action="add"><g:message code="course.add"/></g:link>
  <g:link controller="settings" action="index"><g:message code="course.join"/></g:link>
  <g:link controller="university" action="index"><g:message code="university.manage"/></g:link>
  <g:layoutBody />
  </body>
  </html>
</g:applyLayout>