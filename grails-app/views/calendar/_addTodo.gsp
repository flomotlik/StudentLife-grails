<g:form name="myForm" update="content"
  url="[action:'add', controller:'todo']">
  <g:select name="courseId" from="${courses}" optionKey="id"
    optionValue="name" value="${courses[0]}" />
  <label for="year">Year</label>
  <input name="year" type="text" value="${year}" />
  <label for="month">Month</label>
  <input name="month" type="text" value="${month + 1}" />
  <label for="day">Day</label>
  <input name="day" type="text" value="${day}" />
  <label for="hour">Hour</label>
  <input name="hour" type="text" />
  <label for="minute">Minute</label>
  <input name="minute" type="text" />
  <label for="description">Description</label>
  <input name="description" type="text" />
  <input type="submit" value="Add" />
</g:form>
