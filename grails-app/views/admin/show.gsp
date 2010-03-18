<html>
<head>
<title>Show</title>
</head>
<body>
<ul>
  <li>Country: ${country?.name }</li>
  <li>State: ${state?.name }</li>
  <li>City: ${city?.name}</li>
</ul>
<g:formRemote name="select"
  url="[controller:'admin', action:'addUniversity']" update="content">
  <select id="item" name="item" multiple="multiple">
    <g:each in="${collection}" var="item">
      <option value="${item.id?: item.name}">
      ${item.name}
      </option>
    </g:each>
  </select>
  <g:submitButton name="select" value="Select"></g:submitButton>
</g:formRemote>
Not in list?
<g:formRemote name="add"
  url="[controller:'admin', action:'addUniversity']" update="content">
  <input name="name" type="text" id="name"></input>
  <g:submitButton name="add" value="Add"></g:submitButton>
</g:formRemote>
</body>
</html>