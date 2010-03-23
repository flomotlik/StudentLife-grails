<div>
<!-- Can't add disabled Attribute to tag so has 
to be called as a function with am map of attributes -->
<% 
  def backMessage = g.message(code:"back")
  def backAttributes = [name:"back", value:backMessage, tabindex:"2"]
  if(backDisabled){
    backAttributes.disabled = "disabled"
    backAttributes.tabindex = 0
  }
%>
${g.submitButton(backAttributes)}
<g:submitButton name="next" value="${g.message(code:next?: 'next')}" tabindex="1"/>
<g:submitButton name="cancel" value="${g.message(code:'cancel')}" tabindex="3"/>
</div>