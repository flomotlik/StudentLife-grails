<html>
<head>
  <meta name="layout" content="main"/>
  <title>Manage your universities</title>
</head>
<body>
<g:render template="/user/showCourses" model="['courses':user.inscriptions*.course]"/>
<div id="subcontent">
  <ul>
    <g:each in="${user.universities.sort{it.name}}" var="university">
      <li>${university.name}</li>
    </g:each>
  </ul>
  <g:formRemote name="searchForm" id="searchForm"
          url="[controller:'university', action:'search']" update="searchResults">
    <input name="q" type="text" id="searchText"/>
    <input type="submit" value="Search" id="searchSubmit"/>
  </g:formRemote>
  <div id="searchResults"></div>
</div>
</body>
</html>