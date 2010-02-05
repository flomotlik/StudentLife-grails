<html>
<head>
  <meta content="main" name="layout">
  <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'calendar.css')}"/>
  <link rel="stylesheet" type="text/css" href="${resource(dir: 'css', file: 'input.css')}"/>
</head>
<body>
<div id="courseElements"><g:render
        template="/calendar/courseElements"
        model="['todos':todos, 'events':events]"/></div>
<div id="calendar"><g:include action="calendar" controller="calendar" params="[year:year, month:month]"/></div>
</body>
</html>