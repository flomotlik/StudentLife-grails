{type:"class",attributes:{"name":"Manager","packageName":"qx.ui.tooltip","superClass":"qx.core.Object","isSingleton":"true","fullName":"qx.ui.tooltip.Manager","type":"class"},children:[{type:"desc",attributes:{"text":"<p>The tooltip manager globally manages the tooltips of all widgets. It will\ndisplay tooltips if the user hovers a widgets with a tooltip and hides all\nother tooltips.</p>"}},{type:"constructor",children:[{type:"method",attributes:{"docFrom":"qx.core.Object","overriddenFrom":"qx.core.Object","isCtor":"true","name":"ctor"}}]},{type:"methods",children:[{type:"method",attributes:{"access":"private","name":"__getSharedErrorTooltip"},children:[{type:"desc",attributes:{"text":"<p>Get the shared tooltip, which is used to display the\n{@link qx.ui.core.Widget#toolTipText} and\n{@link qx.ui.core.Widget#toolTipIcon} properties of widgets.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The shared tooltip</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.tooltip.ToolTip"}}]}]}]},{type:"method",attributes:{"access":"private","name":"__getSharedTooltip"},children:[{type:"desc",attributes:{"text":"<p>Get the shared tooltip, which is used to display the\n{@link qx.ui.core.Widget#toolTipText} and\n{@link qx.ui.core.Widget#toolTipIcon} properties of widgets.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The shared tooltip</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.tooltip.ToolTip"}}]}]}]},{type:"method",attributes:{"access":"private","name":"__onFocusOutRoot"},children:[{type:"params",children:[{type:"param",attributes:{"name":"e"},children:[{type:"desc",attributes:{"text":"<p>blur event</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.event.type.Focus"}}]}]}]},{type:"desc",attributes:{"text":"<p>Reset the property {@link #currentToolTip} if the\ncurrent tooltip is the tooltip of the target widget.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"access":"private","name":"__onHideInterval"},children:[{type:"params",children:[{type:"param",attributes:{"name":"e"},children:[{type:"desc",attributes:{"text":"<p>Event object</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.event.type.Event"}}]}]}]},{type:"desc",attributes:{"text":"<p>Event listener for the interval event of the hide timer.</p>"}}]},{type:"method",attributes:{"access":"private","name":"__onMouseMoveRoot"},children:[{type:"params",children:[{type:"param",attributes:{"name":"e"},children:[{type:"desc",attributes:{"text":"<p>The move mouse event</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.event.type.Mouse"}}]}]}]},{type:"desc",attributes:{"text":"<p>Global mouse move event handler</p>"}}]},{type:"method",attributes:{"access":"private","name":"__onMouseOutRoot"},children:[{type:"params",children:[{type:"param",attributes:{"name":"e"},children:[{type:"desc",attributes:{"text":"<p>mouseOut event</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.event.type.Mouse"}}]}]}]},{type:"desc",attributes:{"text":"<p>Resets the property {@link #currentToolTip} if there was a\ntooltip and no new one is created.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"access":"private","name":"__onMouseOverRoot"},children:[{type:"params",children:[{type:"param",attributes:{"name":"e"},children:[{type:"desc",attributes:{"text":"<p>mouseOver event</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.event.type.Mouse"}}]}]}]},{type:"desc",attributes:{"text":"<p>Searches for the tooltip of the target widget. If any tooltip instance\nis found this instance is bound to the target widget and the tooltip is\nset as {@link #currentToolTip}</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"access":"private","name":"__onShowInterval"},children:[{type:"params",children:[{type:"param",attributes:{"name":"e"},children:[{type:"desc",attributes:{"text":"<p>Event object</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.event.type.Event"}}]}]}]},{type:"desc",attributes:{"text":"<p>Event listener for the interval event of the show timer.</p>"}}]},{type:"method",attributes:{"access":"protected","apply":"qx.ui.tooltip.Manager#current","name":"_applyCurrent"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>new value of the property</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.tooltip.ToolTip"}}]}]},{type:"param",attributes:{"name":"old"},children:[{type:"desc",attributes:{"text":"<p>previous value of the property (null if it was not yet set).</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.tooltip.ToolTip"}}]}]}]},{type:"desc",attributes:{"text":"<p>Applies changes of the property value of the property <code>current</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #_applyCurrent}.</p>"}}]},{type:"method",attributes:{"name":"getCurrent","fromProperty":"current"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>current</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #current}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>current</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"getShowInvalidTooltips","fromProperty":"showInvalidTooltips"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>showInvalidTooltips</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #showInvalidTooltips}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>showInvalidTooltips</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initCurrent","fromProperty":"current"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>current</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>current</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #current}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initShowInvalidTooltips","fromProperty":"showInvalidTooltips"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>showInvalidTooltips</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>showInvalidTooltips</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #showInvalidTooltips}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"isShowInvalidTooltips","fromProperty":"showInvalidTooltips"},children:[{type:"desc",attributes:{"text":"<p>Check whether the (computed) value of the boolean property <code>showInvalidTooltips</code> equals <code>true</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #showInvalidTooltips}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Whether the property equals <code>true</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"name":"resetCurrent","fromProperty":"current"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>current</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #current}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"resetShowInvalidTooltips","fromProperty":"showInvalidTooltips"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>showInvalidTooltips</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #showInvalidTooltips}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"setCurrent","fromProperty":"current"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>current</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>current</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #current}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"setShowInvalidTooltips","fromProperty":"showInvalidTooltips"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>showInvalidTooltips</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>showInvalidTooltips</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #showInvalidTooltips}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"toggleShowInvalidTooltips","fromProperty":"showInvalidTooltips"},children:[{type:"desc",attributes:{"text":"<p>Toggles the (computed) value of the boolean property <code>showInvalidTooltips</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #showInvalidTooltips}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the new value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]}]},{type:"properties",children:[{type:"property",attributes:{"check":"qx.ui.tooltip.ToolTip","allowNull":"true","propertyType":"new","name":"current","apply":"_applyCurrent"},children:[{type:"desc",attributes:{"text":"<p>Holds the current ToolTip instance</p>"}}]},{type:"property",attributes:{"defaultValue":"true","propertyType":"new","name":"showInvalidTooltips","check":"Boolean"},children:[{type:"desc",attributes:{"text":"<p>Flag that enabled the tooltips shown by invalid form fields.</p>"}}]}]},{type:"methods-static",children:[{type:"method",attributes:{"isStatic":"true","name":"getInstance"},children:[{type:"desc",attributes:{"text":"<p>Returns a singleton instance of this class. On the first call the class\nis instantiated by calling the constructor with no arguments. All following\ncalls will return this instance.</p>\n\n<p>This method has been added by setting the &#8220;type&#8221; key in the class definition\n({@link qx.Class#define}) to &#8220;singleton&#8221;.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The singleton instance of this class.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.tooltip.Manager"}}]}]}]}]}]}