{type:"class",attributes:{"name":"Html","packageName":"qx.ui.embed","mixins":"qx.ui.core.MNativeOverflow","superClass":"qx.ui.core.Widget","fullName":"qx.ui.embed.Html","type":"class"},children:[{type:"desc",attributes:{"text":"<p>The Html widget embeds plain <span class=\"caps\">HTML</span> code into the application</p>\n\n<p><strong>Example</strong></p>\n\n<p>Here is a little example of how to use the canvas widget.</p>\n\n<pre class=\"javascript\">\nvar html = new qx.ui.embed.Html();\nhtml.setHtml(\"<h1>Hello World</h1>\");\n</pre>\n\n<p><strong>External Documentation</strong></p>\n\n<a href=\"http://qooxdoo.org/documentation/0.8/widget/html\" target=\"_blank\">\nDocumentation of this widget in the qooxdoo wiki.</a>"}},{type:"constructor",children:[{type:"method",attributes:{"overriddenFrom":"qx.ui.core.Widget","isCtor":"true","name":"ctor"},children:[{type:"params",children:[{type:"param",attributes:{"name":"html"},children:[{type:"desc",attributes:{"text":"<p>Initial <span class=\"caps\">HTML</span> content</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]}]}]},{type:"methods",children:[{type:"method",attributes:{"access":"protected","apply":"qx.ui.embed.Html#cssClass","name":"_applyCssClass"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>new value of the property</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]},{type:"param",attributes:{"name":"old"},children:[{type:"desc",attributes:{"text":"<p>previous value of the property (null if it was not yet set).</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"desc",attributes:{"text":"<p>Applies changes of the property value of the property <code>cssClass</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #_applyCssClass}.</p>"}}]},{type:"method",attributes:{"access":"protected","apply":"qx.ui.core.Widget#font","overriddenFrom":"qx.ui.core.Widget","name":"_applyFont"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>new value of the property</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Font"}}]}]},{type:"param",attributes:{"name":"old"},children:[{type:"desc",attributes:{"text":"<p>previous value of the property (null if it was not yet set).</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Font"}}]}]}]},{type:"desc",attributes:{"text":"<p>Applies changes of the property value of the property <code>font</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #_applyFont}.</p>"}}]},{type:"method",attributes:{"access":"protected","apply":"qx.ui.embed.Html#html","name":"_applyHtml"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>new value of the property</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]},{type:"param",attributes:{"name":"old"},children:[{type:"desc",attributes:{"text":"<p>previous value of the property (null if it was not yet set).</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"desc",attributes:{"text":"<p>Applies changes of the property value of the property <code>html</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #_applyHtml}.</p>"}}]},{type:"method",attributes:{"access":"protected","apply":"qx.ui.core.Widget#selectable","overriddenFrom":"qx.ui.core.Widget","name":"_applySelectable"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>new value of the property</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]},{type:"param",attributes:{"name":"old"},children:[{type:"desc",attributes:{"text":"<p>previous value of the property (null if it was not yet set).</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"desc",attributes:{"text":"<p>Applies changes of the property value of the property <code>selectable</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #_applySelectable}.</p>"}}]},{type:"method",attributes:{"access":"protected","apply":"qx.ui.core.Widget#textColor","overriddenFrom":"qx.ui.core.Widget","name":"_applyTextColor"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>new value of the property</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Color"}}]}]},{type:"param",attributes:{"name":"old"},children:[{type:"desc",attributes:{"text":"<p>previous value of the property (null if it was not yet set).</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Color"}}]}]}]},{type:"desc",attributes:{"text":"<p>Applies changes of the property value of the property <code>textColor</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #_applyTextColor}.</p>"}}]},{type:"method",attributes:{"name":"getCssClass","fromProperty":"cssClass"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>cssClass</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #cssClass}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>cssClass</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"docFrom":"qx.ui.core.Widget","overriddenFrom":"qx.ui.core.Widget","name":"getFocusElement"}},{type:"method",attributes:{"name":"getHtml","fromProperty":"html"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>html</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #html}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>html</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initCssClass","fromProperty":"cssClass"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>cssClass</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>cssClass</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #cssClass}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initHtml","fromProperty":"html"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>html</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>html</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #html}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"resetCssClass","fromProperty":"cssClass"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>cssClass</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #cssClass}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"resetHtml","fromProperty":"html"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>html</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #html}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"setCssClass","fromProperty":"cssClass"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>cssClass</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>cssClass</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #cssClass}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"setHtml","fromProperty":"html"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>html</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>html</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #html}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]}]},{type:"properties",children:[{type:"property",attributes:{"apply":"_applyCssClass","defaultValue":"\"\"","propertyType":"new","name":"cssClass","check":"String"},children:[{type:"desc",attributes:{"text":"<p>The css classname for the html embed.\n<b><span class=\"caps\">IMPORTANT</span></b> Paddings and borders does not work\nin the css class. These styles cause conflicts with\nthe layout engine.</p>"}}]},{type:"property",attributes:{"name":"focusable","docFrom":"qx.ui.core.Widget","defaultValue":"true","refine":"true","propertyType":"new","overriddenFrom":"qx.ui.core.Widget"}},{type:"property",attributes:{"name":"html","check":"String","allowNull":"true","propertyType":"new","apply":"_applyHtml","event":"changeHtml"},children:[{type:"desc",attributes:{"text":"<p>Any text string which can contain <span class=\"caps\">HTML</span>, too</p>"}}]},{type:"property",attributes:{"name":"selectable","docFrom":"qx.ui.core.Widget","defaultValue":"true","refine":"true","propertyType":"new","overriddenFrom":"qx.ui.core.Widget"}}]},{type:"events",children:[{type:"event",attributes:{"name":"changeHtml"},children:[{type:"desc",attributes:{"text":"Fired on change of the property {@link #html}."}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.event.type.Data"}}]}]}]}]}