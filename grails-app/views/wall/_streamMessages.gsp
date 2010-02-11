<%@ page contentType="text/html;charset=UTF-8" %>
<div class="stream clearfix">
  <g:each var="message" in="${messages}">
  <div class="wallpost clearfix" style="height: auto">
    <a href="${userInfo[message.student.id].url}">
      <img src="${userInfo[message.student.id].image}" alt="${message.student.name}" class="wall-portrait">
    </a>
    <div class="wallpost_message clearfix">
      <h3>
        <a href="${userInfo[message.student.id].url}" class="wallpost_name" target="_blank">
          <span class="wallpost_name">${message.student.name}</span>
        </a>
      </h3>${message.message}
    </div>
    <span class="wallpost_data">
      <abbr class="timestamp" title="${message.dateCreated}">${message.dateCreated}</abbr>
      <!-- TODO set timediff etc -->
    </span>
  </div>
  </g:each>
  
</div>