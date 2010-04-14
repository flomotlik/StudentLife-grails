<div id="showColleagues">
  <ul>
    <g:each in="${colleagues}" var="colleague">
      <li>
        <sl:facebookProfileLink facebookId="${colleague.facebookId}" text="${colleague.name}"/>
      </li>
    </g:each>
  </ul>
</div>