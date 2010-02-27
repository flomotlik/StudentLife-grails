<div>
    <% fbId = it.creator.facebookId%>
	<% url = "http://www.facebook.com/profile.php?id=" + fbId  %>
    <div>
	     <h3 class="zero_m_p">
	     <a href="${url}" target="_blank">
	       <span class="wallpost_name">${it.creator.name}</span>
	     </a>
	    </h3>
        <p class="zero_m_p">${it.message}</p>
        <span class="zero_m_p">
      		<abbr class="timestamp" title="${it.dateCreated}">${it.dateCreated}</abbr>
      		<!-- TODO set timediff etc -->
    	</span>
    </div>
</div>