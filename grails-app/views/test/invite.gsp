<html xmlns="http://www.w3.org/1999/xhtml" xmlns:fb="http://www.facebook.com/2008/fbml"> 
<head><head>
<body>
<fb:serverFbml style="width: 755px;">  
  <script type="text/fbml">  
    <fb:fbml>  
      <fb:request-form 
           action="<url for post invite action, see wiki page for fb:request-form for details>" 
           method="POST" 
           invite="true" 
           type="XFBML" 
           content="This is a test invitation from XFBML test app <fb:req-choice url='see wiki page for fb:req-choice for details' label='Ignore the Connect test app!' />"
           />
           <fb:multi-friend-selector showborder="false" actiontext="Invite your friends to use Connect."></fb:multi-friend-selector>  
      </fb:request-form>  
    </fb:fbml>  
  </script>  
</fb:serverFbml>
</body>
</html>