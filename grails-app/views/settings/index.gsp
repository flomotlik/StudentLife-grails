<html>
<head>
  <meta content="settings" name="layout"/>
</head>
<body>
<g:if test="${params['message'] != null}">
  <div class="message">${params['message']}</div>
</g:if>
<g:formRemote name="searchForm" id="searchForm"
        url="[controller:'course', action:'search']" update="searchResults">
  <input name="q" type="text" id="searchText"/>
  <input type="submit" value="Search" id="searchSubmit"/>
</g:formRemote>
<div id="searchResults"></div>
</body>
</html>