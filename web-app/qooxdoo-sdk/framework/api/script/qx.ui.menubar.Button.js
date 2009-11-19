{type:"class",attributes:{"name":"Button","packageName":"qx.ui.menubar","superClass":"qx.ui.form.MenuButton","childClasses":"qx.ui.toolbar.MenuButton","fullName":"qx.ui.menubar.Button","type":"class"},children:[{type:"desc",attributes:{"text":"<p>A menubar button</p>"}},{type:"constructor",children:[{type:"method",attributes:{"docFrom":"qx.ui.form.MenuButton","overriddenFrom":"qx.ui.form.MenuButton","isCtor":"true","name":"ctor"},children:[{type:"params",children:[{type:"param",attributes:{"name":"label"}},{type:"param",attributes:{"name":"icon"}},{type:"param",attributes:{"name":"menu"}}]}]}]},{type:"properties",children:[{type:"property",attributes:{"name":"appearance","docFrom":"qx.ui.core.Widget","defaultValue":"\"menubar-button\"","refine":"true","propertyType":"new","overriddenFrom":"qx.ui.form.Button"}},{type:"property",attributes:{"name":"focusable","docFrom":"qx.ui.core.Widget","defaultValue":"false","refine":"true","propertyType":"new","overriddenFrom":"qx.ui.form.Button"}},{type:"property",attributes:{"name":"show","docFrom":"qx.ui.basic.Atom","defaultValue":"\"inherit\"","refine":"true","propertyType":"new","overriddenFrom":"qx.ui.basic.Atom"}}]},{type:"methods",children:[{type:"method",attributes:{"access":"protected","overriddenFrom":"qx.ui.form.MenuButton","name":"_onMenuChange"},children:[{type:"params",children:[{type:"param",attributes:{"name":"e"},children:[{type:"desc",attributes:{"text":"<p>Property change event</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.event.type.Data"}}]}]}]},{type:"desc",attributes:{"text":"<p>Listener for visibility property changes of the attached menu</p>"}}]},{type:"method",attributes:{"access":"protected","overriddenFrom":"qx.ui.form.MenuButton","name":"_onMouseOver"},children:[{type:"params",children:[{type:"param",attributes:{"name":"e"},children:[{type:"desc",attributes:{"text":"<p>mouseover event object</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.event.type.Mouse"}}]}]}]},{type:"desc",attributes:{"text":"<p>Event listener for mouseover event</p>"}}]},{type:"method",attributes:{"name":"getMenuBar"},children:[{type:"desc",attributes:{"text":"<p>Inspects the parent chain to find the MenuBar</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>MenuBar instance or <code>null</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.menubar.MenuBar"}}]}]}]},{type:"method",attributes:{"name":"getToolBar"},children:[{type:"deprecated"},{type:"desc",attributes:{"text":"<p>Inspects the parent chain to find a ToolBar instance.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Toolbar instance or <code>null</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.toolbar.ToolBar"}}]}]}]}]}]}