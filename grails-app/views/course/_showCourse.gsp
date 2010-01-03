<div id="showCourse">
<g:if test="${course}">
<g:formRemote name="addMessage"
	update="showCourse" url="[action:'add', controller:'message']">
	<input name="id" type="hidden" value="${course?.id}" />
	<input name="message" type="text" />
	<input type="submit" value="Post Message"/>
</g:formRemote>
</g:if>
<ul>
	<g:each in="${course?.messages}" var="message">
		<li>${message.message}</li>
	</g:each>
</ul>
</div>