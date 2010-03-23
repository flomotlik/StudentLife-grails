<div>
<!-- Can't add disabled Attribute to tag so has 
to be called as a function with am map of attributes -->
<% 
  def backAttributes = [name:"back", value:"Back", tabindex:"2"] 
  if(backDisabled){
    backAttributes.disabled = "disabled"
    backAttributes.tabindex = 0
  }
%>
${g.submitButton(backAttributes)}
<g:submitButton name="next" value="${next?: 'Next' }" tabindex="1"/>
<g:submitButton name="cancel" value="Cancel" tabindex="3"/>
</div>