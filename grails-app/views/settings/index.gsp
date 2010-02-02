<html>
<head>
  <meta content="main" name="layout">
  <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'settings.css')}"/>
</head>
<body>
<g:render template="/user/showCourses" model="['courses':user.inscriptions*.course]"/>
<div id="subContent">
  <g:link controller="course" action="add">Add Course</g:link>
  <g:link controller="university" action="index">Manage Universities</g:link>

  <g:if test="${params['message'] != null}">
    <div class="message">${params['message']}</div>
  </g:if>
  <g:formRemote name="searchForm" id="searchForm"
          url="[controller:'course', action:'search']" update="searchResults">
    <input name="q" type="text" id="searchText"/>
    <input type="submit" value="Search" id="searchSubmit"/>
  </g:formRemote>
  <div id="searchResults"></div>
</div>
</body>
</html>