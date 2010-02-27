<div style="position:none">
    <% fbId = it.creator.facebookId%>
	<% url = "http://www.facebook.com/profile.php?id=" + fbId  %>
    <div style="float:none">
	     <h3 style="margin:0px;padding:0px">
	     <a href="${url}" target="_blank">
	       <span class="wallpost_name">${it.creator.name}</span>
	     </a>
	    </h3>
        <p style="margin:0px;padding:0px">${it.message}</p>
        <span style="margin:0px;padding:0px">
      		<abbr class="timestamp" title="${it.dateCreated}">${it.dateCreated}</abbr>
      		<!-- TODO set timediff etc -->
    	</span>
    </div>
</div>