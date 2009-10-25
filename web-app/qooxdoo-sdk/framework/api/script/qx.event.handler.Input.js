{type:"class",attributes:{"name":"Input","interfaces":"qx.event.IEventHandler","superClass":"qx.core.Object","fullName":"qx.event.handler.Input","type":"class","packageName":"qx.event.handler"},children:[{type:"desc",attributes:{"text":"<p>This handler provides an &#8220;change&#8221; event for all form fields and an\n&#8220;input&#8221; event for form fields of type &#8220;text&#8221; and &#8220;textarea&#8221;.</p>\n\n<p>To let these events work it is needed to create the elements using\n{@link qx.bom.Input}</p>"}},{type:"constructor",children:[{type:"method",attributes:{"docFrom":"qx.core.Object","overriddenFrom":"qx.core.Object","isCtor":"true","name":"ctor"}}]},{type:"constants",children:[{type:"constant",attributes:{"name":"PRIORITY"},children:[{type:"desc",attributes:{"text":"<p>Priority of this handler</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]},{type:"constant",attributes:{"name":"TARGET_CHECK"},children:[{type:"desc",attributes:{"text":"<p>Which target check to use</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]},{type:"constant",attributes:{"type":"Boolean","name":"IGNORE_CAN_HANDLE","value":"false"},children:[{type:"desc",attributes:{"text":"<p>Whether the method &#8220;canHandleEvent&#8221; must be called</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]},{type:"constant",attributes:{"name":"SUPPORTED_TYPES"},children:[{type:"desc",attributes:{"text":"<p>Supported event types</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]}]},{type:"methods",children:[{type:"method",attributes:{"access":"private","name":"__changeEventOnEnterFix"},children:[{type:"params",children:[{type:"param",attributes:{"name":"target"},children:[{type:"desc",attributes:{"text":"<p>The event target</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Element"}}]}]},{type:"param",attributes:{"name":"elementType"},children:[{type:"desc",attributes:{"text":"<p>The type of element</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"desc",attributes:{"text":"<p>Fix the different behavior when pressing the enter key.</p>\n\n<p>FF and Safari fire a &#8220;change&#8221; event if the user presses the enter key.\nIE and Opera fire the event only if the focus is changed.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"_onChangeChecked"},children:[{type:"params",children:[{type:"param",attributes:{"name":"e"},children:[{type:"desc",attributes:{"text":"<p>Native <span class=\"caps\">DOM</span> event</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Event"}}]}]}]},{type:"desc",attributes:{"text":"<p>Internal function called by input elements created using {@link qx.bom.Input}.</p>"}}]},{type:"method",attributes:{"access":"protected","name":"_onChangeValue"},children:[{type:"params",children:[{type:"param",attributes:{"name":"e"},children:[{type:"desc",attributes:{"text":"<p>Native <span class=\"caps\">DOM</span> event</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Event"}}]}]}]},{type:"desc",attributes:{"text":"<p>Internal function called by input elements created using {@link qx.bom.Input}.</p>"}}]},{type:"method",attributes:{"access":"protected","name":"_onInput"},children:[{type:"params",children:[{type:"param",attributes:{"name":"e"},children:[{type:"desc",attributes:{"text":"<p>Native <span class=\"caps\">DOM</span> event</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Event"}}]}]}]},{type:"desc",attributes:{"text":"<p>Internal function called by input elements created using {@link qx.bom.Input}.</p>"}}]},{type:"method",attributes:{"access":"protected","name":"_onProperty"},children:[{type:"params",children:[{type:"param",attributes:{"name":"e"},children:[{type:"desc",attributes:{"text":"<p>Native <span class=\"caps\">DOM</span> event</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Event"}}]}]}]},{type:"desc",attributes:{"text":"<p>Internal function called by input elements created using {@link qx.bom.Input}.</p>"}}]},{type:"method",attributes:{"docFrom":"qx.event.IEventHandler","name":"canHandleEvent"},children:[{type:"params",children:[{type:"param",attributes:{"name":"target"}},{type:"param",attributes:{"name":"type"}}]}]},{type:"method",attributes:{"docFrom":"qx.event.IEventHandler","name":"registerEvent"},children:[{type:"params",children:[{type:"param",attributes:{"name":"target"}},{type:"param",attributes:{"name":"type"}},{type:"param",attributes:{"name":"capture"}}]}]},{type:"method",attributes:{"docFrom":"qx.event.IEventHandler","name":"unregisterEvent"},children:[{type:"params",children:[{type:"param",attributes:{"name":"target"}},{type:"param",attributes:{"name":"type"}}]}]}]}]}