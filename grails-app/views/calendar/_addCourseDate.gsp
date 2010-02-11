<g:form name="myForm" update="content"
  url="[action:'add', controller:'event']">
  <g:select name="courseId" from="${courses}" optionKey="id"
    optionValue="name" value="${courses[0]}" />
  <g:datePicker name="date" value="${date}"/>
  <label for="description">Description</label>
  <input name="description" type="text" />
  <label for="duration">Duration</label>
  <input name="duration" type="text" />
  <input type="submit" value="Add" />
</g:form>