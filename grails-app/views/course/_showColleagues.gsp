<div id="showColleagues">
<div class="aa_container">
  <g:each in="${colleagues}" var="colleague">
    <div class="aa_box">
      <img class="aa_image" src="images/testprofilepic1.png"/>
      <div class="aa_name typeface-js"><a href="#link">${colleague.name}</a></div>
      <div class="aa_info">attending x equal courses</div>
      <div class="aa_link"><a href="#link">Add as friend</a></div>
    </div>
    <img src="images/columnborder.png" class="aa_separator"/>
  </g:each>
</div> <!-- aa_container-->
</div> <!-- showColleagues-->