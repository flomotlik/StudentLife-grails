<g:remoteLink controller="university" action="join" update="content">Add University</g:remoteLink>
<g:remoteLink controller="course" action="renderAdd" update="content">Add Course</g:remoteLink>
<ul>
  <g:each in="${user.universities}" var="university">
    <li>${university.name}</li>
  </g:each>
</ul>
<g:formRemote name="searchForm" id="searchForm"
  url="[controller:'course', action:'search']" update="searchResults">
  <input name="q" type="text" id="searchText" />
  <input type="submit" value="Search" id="searchSubmit" />
</g:formRemote>
<div id="searchResults"><g:render
  template="/settings/searchResults" /></div>
