<g:render template="/course/showCourse" model="['course':course]" />
<div id="showColleagues">
<ul>
	<g:each in="${colleagues}" var="colleague">
		<li>${colleague.name}</li>
	</g:each>
</ul>
</div>