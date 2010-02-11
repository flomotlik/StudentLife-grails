<script type="text/javascript" src="js/stream.js"/>

<!-- Wall header -->
<div class="stream_header clearfix">
  <span class="stream_header_content">
    <g:remoteLink controller="course" action="messages"
                  params=""
                  update="stream"><g:message code="studentlife.wall.messages"/></g:remoteLink>
    <g:remoteLink controller="course" action="links"
                  params=""
                  update="stream"><g:message code="studentlife.wall.links"/></g:remoteLink>
  </span>
</div>
<!-- /Wall header -->

<!-- Composer -->
<div id="composer" class="Composer clearfix"">
     <form action="javascript:void(null);">
    <div class="Composer_Content">
      <div class="Composer_InputArea_Base Composer_InputArea clearfix">
        <div class="Composer_InputShadow">
          <textarea id="composer_input" onfocus="showButtons();" onblur="hideButtons();" class="Composer_TextArea" name="status" title="What's new?" placeholder="What's new?"></textarea>
        </div>
      </div>
    </div>

    <div id="composer_buttons" class="Composer_ButtonArea hidden">
      <span style="float: right;">
        <span>
          <input value="Share" type="submit" class="Button" onclick="return checkForm();">
        </span>
      </span>
    </div>
  </form>
</div>
<!-- /composer -->

<!-- stream messages -->
<g:render template="streamMessages" collection="messages" />

<!-- Pager -->
<div id="pagerbox">
  <div class="pagerbox_inner">
    <!-- get older posts via ajax -->
    <a href="javascript:void(null);" class="pager_more_link" onclick="showLoader();">Older Posts <i class="arrow_down"></i></a>
    <img src="http://static.ak.fbcdn.net/rsrc.php/zBS5C/hash/7hwy7at6.gif" id="pagerloader" class="pagerloader hidden" style="height:11px;width:16px;" alt="loading">
  </div>
</div> <!-- /pager -->