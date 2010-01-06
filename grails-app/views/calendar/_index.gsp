<div id="courseElements"><g:render
  template="/calendar/courseElements"
  model="['todos':todos, 'events':events]" /></div>
<div id="calendar"><g:render template="/calendar/calendar"
  model="['rows':rows, 'year':year, 'month':month]" /></div>