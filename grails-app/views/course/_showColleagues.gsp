<div id="showColleagues">
  <ul>
    <g:each in="${colleagues}" var="colleague">
      <li>
        <a href="#link">${colleague.name}</a>
      </li>
    </g:each>
  </ul>
</div>