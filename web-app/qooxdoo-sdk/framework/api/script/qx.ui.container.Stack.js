{type:"class",attributes:{"name":"Stack","interfaces":"qx.ui.core.ISingleSelection","mixins":"qx.ui.core.MSingleSelectionHandling","superClass":"qx.ui.core.Widget","fullName":"qx.ui.container.Stack","type":"class","packageName":"qx.ui.container"},children:[{type:"desc",attributes:{"text":"<p>The stack container puts its child widgets on top of each other and only the\ntopmost widget is visible.</p>\n\n<p>This is used e.g. in the tab view widget. Which widget is visible can be\ncontrolled by using the {@link #getSelection} method.</p>\n\n<p><strong>Example</strong></p>\n\n<p>Here is a little example of how to use the widget.</p>\n\n<pre class=\"javascript\">\n  // create stack container\n  var stack = new qx.ui.container.Stack();\n\n  // add some children\n  stack.add(new qx.ui.core.Widget().set({\n   backgroundColor: \"red\"\n  }));\n  stack.add(new qx.ui.core.Widget().set({\n   backgroundColor: \"green\"\n  }));\n  stack.add(new qx.ui.core.Widget().set({\n   backgroundColor: \"blue\"\n  }));\n\n  // select green widget\n  stack.setSelection([stack.getChildren()[1]]);\n\n  this.getRoot().add(stack);\n</pre>\n\n<p>This example creates an stack with three children. Only the selected &#8220;green&#8221;\nwidget is visible.</p>\n\n<p><strong>External Documentation</strong></p>\n\n<a href=\"http://qooxdoo.org/documentation/0.8/widget/Stack\" target=\"_blank\">\nDocumentation of this widget in the qooxdoo wiki.</a>"}},{type:"constructor",children:[{type:"method",attributes:{"docFrom":"qx.core.Object","overriddenFrom":"qx.ui.core.Widget","isCtor":"true","name":"ctor"}}]},{type:"events",children:[{type:"event",attributes:{"name":"change"},children:[{type:"desc",attributes:{"text":"<p>Fires after the selection was modified</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.event.type.Data"}}]},{type:"deprecated",children:[{type:"desc",attributes:{"text":"<p>Use &#8216;changeSelection&#8217; instead!</p>"}}]}]}]},{type:"methods",children:[{type:"method",attributes:{"access":"private","name":"__onChangeSelection"},children:[{type:"params",children:[{type:"param",attributes:{"name":"e"},children:[{type:"desc",attributes:{"text":"<p>Data event.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.event.type.Data"}}]}]}]},{type:"desc",attributes:{"text":"<p>Event handler for <code>changeSelection</code>.</p>\n\n<p>Shows the new selected widget and hide the old one.</p>"}}]},{type:"method",attributes:{"access":"protected","apply":"qx.ui.container.Stack#dynamic","name":"_applyDynamic"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>new value of the property</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]},{type:"param",attributes:{"name":"old"},children:[{type:"desc",attributes:{"text":"<p>previous value of the property (null if it was not yet set).</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"desc",attributes:{"text":"<p>Applies changes of the property value of the property <code>dynamic</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #_applyDynamic}.</p>"}}]},{type:"method",attributes:{"access":"protected","name":"_getItems"},children:[{type:"desc",attributes:{"text":"<p>Returns the widget for the selection.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Widgets to select.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.core.Widget","dimensions":"1"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"_isAllowEmptySelection"},children:[{type:"desc",attributes:{"text":"<p>Returns if the selection could be empty or not.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<code>true</code> If selection could be empty,\n   <code>false</code> otherwise."}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"_isItemSelectable"},children:[{type:"params",children:[{type:"param",attributes:{"name":"item"},children:[{type:"desc",attributes:{"text":"<p>The item to be checked</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.core.Widget"}}]}]}]},{type:"desc",attributes:{"text":"<p>Returns whether the given item is selectable.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Whether the given item is selectable</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"name":"add"},children:[{type:"params",children:[{type:"param",attributes:{"name":"widget"},children:[{type:"desc",attributes:{"text":"<p>Any widget.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.core.Widget"}}]}]}]},{type:"desc",attributes:{"text":"<p>Adds a new child to the stack.</p>"}}]},{type:"method",attributes:{"docFrom":"qx.core.Object","overriddenFrom":"qx.core.Object","name":"addListener"},children:[{type:"params",children:[{type:"param",attributes:{"name":"type"}},{type:"param",attributes:{"name":"listener"}},{type:"param",attributes:{"name":"self"}},{type:"param",attributes:{"name":"capture"}}]}]},{type:"method",attributes:{"name":"getChildren"},children:[{type:"desc",attributes:{"text":"<p>Returns all children.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>List of all children.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.core.Widget","dimensions":"1"}}]}]}]},{type:"method",attributes:{"name":"getDynamic","fromProperty":"dynamic"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>dynamic</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #dynamic}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>dynamic</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"getSelected"},children:[{type:"deprecated",children:[{type:"desc",attributes:{"text":"<p>Use &#8216;getSelection&#8217; instead!</p>"}}]},{type:"desc",attributes:{"text":"<p>Returns the selected widget.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Selected widget.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.core.Widget"}}]}]}]},{type:"method",attributes:{"name":"indexOf"},children:[{type:"params",children:[{type:"param",attributes:{"name":"widget"},children:[{type:"desc",attributes:{"text":"<p>Any child.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.core.Widget"}}]}]}]},{type:"desc",attributes:{"text":"<p>Detects the position of the given widget in the\nchildren list of this widget.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The position.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initDynamic","fromProperty":"dynamic"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>dynamic</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>dynamic</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #dynamic}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"isDynamic","fromProperty":"dynamic"},children:[{type:"desc",attributes:{"text":"<p>Check whether the (computed) value of the boolean property <code>dynamic</code> equals <code>true</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #dynamic}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Whether the property equals <code>true</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"name":"next"},children:[{type:"desc",attributes:{"text":"<p>Go to the next child in the children list.</p>"}}]},{type:"method",attributes:{"name":"previous"},children:[{type:"desc",attributes:{"text":"<p>Go to the previous child in the children list.</p>"}}]},{type:"method",attributes:{"name":"remove"},children:[{type:"params",children:[{type:"param",attributes:{"name":"widget"},children:[{type:"desc",attributes:{"text":"<p>Any widget.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.core.Widget"}}]}]}]},{type:"desc",attributes:{"text":"<p>Removes the given widget from the stack.</p>"}}]},{type:"method",attributes:{"name":"resetDynamic","fromProperty":"dynamic"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>dynamic</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #dynamic}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"resetSelected"},children:[{type:"deprecated",children:[{type:"desc",attributes:{"text":"<p>Use &#8216;resetSelection&#8217; instead!</p>"}}]},{type:"desc",attributes:{"text":"<p>Reset the current selection.</p>"}}]},{type:"method",attributes:{"name":"setDynamic","fromProperty":"dynamic"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>dynamic</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>dynamic</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #dynamic}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"setSelected"},children:[{type:"params",children:[{type:"param",attributes:{"name":"item"},children:[{type:"desc",attributes:{"text":"<p>Widget to select.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.core.Widget"}}]}]}]},{type:"deprecated",children:[{type:"desc",attributes:{"text":"<p>Use &#8216;setSelection&#8217; instead!</p>"}}]},{type:"desc",attributes:{"text":"<p>Select the given widget.</p>"}}]},{type:"method",attributes:{"name":"toggleDynamic","fromProperty":"dynamic"},children:[{type:"desc",attributes:{"text":"<p>Toggles the (computed) value of the boolean property <code>dynamic</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #dynamic}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the new value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]}]},{type:"properties",children:[{type:"property",attributes:{"apply":"_applyDynamic","defaultValue":"false","propertyType":"new","name":"dynamic","check":"Boolean"},children:[{type:"desc",attributes:{"text":"<p>Whether the size of the widget depends on the selected child. When\ndisabled (default) the size is configured to the largest child.</p>"}}]}]}]}