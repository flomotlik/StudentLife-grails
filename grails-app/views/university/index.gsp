<html>
<head>
  <meta name="layout" content="settings"/>
  <title>Manage your universities</title>
</head>
<body>
<h2><g:message code="university.join"/></h2>
<g:if test="${user?.universities?.size() > 0}">
  <ul>
    <g:each in="${user.universities.sort{it.name}}" var="university">
      <li>${university.name}</li>
    </g:each>
  </ul>
</g:if>
<p><g:message code="university.join.description"/></p>
<g:formRemote name="searchForm" id="searchForm"
        url="[controller:'university', action:'search']" update="searchResults">
  <input name="q" type="text" id="searchText"/>
  <input type="submit" value="${g.message(code:'search') }" id="searchSubmit"/>
</g:formRemote>
<div id="searchResults"></div>
</body>
</html>