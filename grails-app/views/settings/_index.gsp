<g:formRemote name="searchForm" id="searchForm"
  url="[controller:'course', action:'search']" update="searchResults">
  <input name="q" type="text" id="searchText" />
  <input type="submit" value="Search" id="searchSubmit" />
</g:formRemote>
<div id="searchResults"><g:render
  template="/settings/searchResults" /></div>
