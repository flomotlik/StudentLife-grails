<p>ShowCountries</p>
<p>${selected?.name} - ${selected?.id}</p>
<g:formRemote name="selectCountry"
  url="[controller:'university', action:'join']" update="content">
  <select id="item" name="item" multiple="multiple">
    <g:each in="${collection}" var="item">
      <option value="${item.id?: item.name}">${item.name}</option>
    </g:each>
  </select>
  <g:submitButton name="select" value="Select"></g:submitButton>
</g:formRemote>
<g:formRemote name="add" url="[controller:'university', action:'join']"
  update="content">
  <input name="name" type="text" id="name"></input>
  <g:submitButton name="add" value="Add"></g:submitButton>
</g:formRemote>