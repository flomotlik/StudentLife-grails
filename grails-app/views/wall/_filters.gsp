<script type="text/javascript" src="js/filters.js"/>

<h2><g:message code="studentlife.wall.filters"/></h2> <!-- filters -->
<ul class="uiSideNav" id="sidenav">
  <li class="selected" id="navigation_item_all">
    <a class="item" href="javascript:void(null);" onClick="setActivation('navigation_item_all');">
      <span><g:message code="studentlife.wall.all"/></span> <!-- All messages -->
      <!--        <span class="count hidden">(<span class="countValue">0</span>)</span> -->
    </a>
    <span class="loadingIndicator"></span>
  </li>

  <g: each var="course" in ="${courses}">

    <li id="navigation_item_${course.id}">
      <a class="item" href="javascript:void(null)" onClick="setActivation('navigation_item_${course.id}');">
        <span>${course.name}</span>
        <!-- <span class="count hidden">(<span class="countValue">0</span>)</span> -->
      </a>
      <span class="loadingIndicator"></span>
    </li>

    </g:each>
</ul>