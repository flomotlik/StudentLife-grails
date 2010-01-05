<p>ShowCountries</p>
<g:formRemote name="selectCountry"
  url="[controller:'university', action:'join']" update="content">
  <select id="country" name="country" multiple="multiple">
    <g:each in="${country.states}" var="state">
      <option value="${state.id}">${state.name}</option>
    </g:each>
  </select>
  <g:submitButton name="select" value="Select"></g:submitButton>
</g:formRemote>
<g:formRemote name="addState"
  url="[controller:'university', action:'join']" update="content">
  <input name="name" type="text" id="name"></input>
  <g:submitButton name="add" value="Add"></g:submitButton>
</g:formRemote>