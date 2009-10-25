{type:"class",attributes:{"name":"HBox","packageName":"qx.ui.layout","superClass":"qx.ui.layout.Abstract","fullName":"qx.ui.layout.HBox","type":"class"},children:[{type:"desc",attributes:{"text":"<p>A horizontal box layout.</p>\n\n<p>The horizontal box layout lays out widgets in a horizontal row, from left\nto right.</p>\n\n<p><strong>Features</strong></p>\n\n<ul>\n<li>Minimum and maximum dimensions</li>\n<li>Prioritized growing/shrinking (flex)</li>\n<li>Margins (with horizontal collapsing)</li>\n<li>Auto sizing (ignoring percent values)</li>\n<li>Percent widths (not relevant for size hint)</li>\n<li>Alignment (child property {@link qx.ui.core.LayoutItem#alignX} is ignored)</li>\n<li>Horizontal spacing (collapsed with margins)</li>\n<li>Reversed children layout (from last to first)</li>\n<li>Vertical children stretching (respecting size hints)</li>\n</ul>\n\n<p><strong>Item Properties</strong></p>\n\n<ul>\n<li><strong>flex</strong> <em>(Integer)</em>: The flexibility of a layout item determines how the container\n  distributes remaining empty space among its children. If items are made\n  flexible, they can grow or shrink accordingly. Their relative flex values\n  determine how the items are being resized, i.e. the larger the flex ratio\n  of two items, the larger the resizing of the first item compared to the\n  second.\n\n<p>If there is only one flex item in a layout container, its actual flex\n  value is not relevant. To disallow items to become flexible, set the\n  flex value to zero.\n</li>\n<li><strong>width</strong> <em>(String)</em>: Allows to define a percent\n  width for the item. The width in percent, if specified, is used instead\n  of the width defined by the size hint. The minimum and maximum width still\n  takes care of the element&#8217;s limits. It has no influence on the layout&#8217;s\n  size hint. Percent values are mostly useful for widgets which are sized by\n  the outer hierarchy.\n</li>\n</ul></p>\n\n<p><strong>Example</strong></p>\n\n<p>Here is a little example of how to use the grid layout.</p>\n\n<pre class=\"javascript\">\nvar layout = new qx.ui.layout.HBox();\nlayout.setSpacing(4); // apply spacing\n\nvar container = new qx.ui.container.Composite(layout);\n\ncontainer.add(new qx.ui.core.Widget());\ncontainer.add(new qx.ui.core.Widget());\ncontainer.add(new qx.ui.core.Widget());\n</pre>\n\n<p><strong>External Documentation</strong></p>\n\n<p>See <a href=\"http://qooxdoo.org/documentation/0.8/layout/Box\">extended documentation</a>\nand links to demos for this layout.</p>"}},{type:"constructor",children:[{type:"method",attributes:{"overriddenFrom":"qx.core.Object","isCtor":"true","name":"ctor"},children:[{type:"params",children:[{type:"param",attributes:{"defaultValue":"0","name":"spacing"},children:[{type:"desc",attributes:{"text":"<p>The spacing between child widgets {@link #spacing}.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]},{type:"param",attributes:{"defaultValue":"\"left\"","name":"alignX"},children:[{type:"desc",attributes:{"text":"<p>Horizontal alignment of the whole children\n    block {@link #alignX}.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]},{type:"param",attributes:{"name":"separator"},children:[{type:"desc",attributes:{"text":"<p>A separator to render between the items</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Decorator"}}]}]}]}]}]},{type:"methods",children:[{type:"method",attributes:{"access":"private","name":"__rebuildCache"},children:[{type:"desc",attributes:{"text":"<p>Rebuilds caches for flex and percent layout properties</p>"}}]},{type:"method",attributes:{"access":"protected","apply":"qx.ui.layout.HBox#reversed","name":"_applyReversed"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>new value of the property</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]},{type:"param",attributes:{"name":"old"},children:[{type:"desc",attributes:{"text":"<p>previous value of the property (null if it was not yet set).</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"desc",attributes:{"text":"<p>Applies changes of the property value of the property <code>reversed</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #_applyReversed}.</p>"}}]},{type:"method",attributes:{"access":"protected","docFrom":"qx.ui.layout.Abstract","overriddenFrom":"qx.ui.layout.Abstract","name":"_computeSizeHint"}},{type:"method",attributes:{"name":"getAlignX","fromProperty":"alignX"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>alignX</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #alignX}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>alignX</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"getAlignY","fromProperty":"alignY"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>alignY</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #alignY}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>alignY</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"getReversed","fromProperty":"reversed"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>reversed</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #reversed}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>reversed</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"getSeparator","fromProperty":"separator"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>separator</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #separator}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>separator</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"getSpacing","fromProperty":"spacing"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>spacing</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #spacing}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>spacing</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initAlignX","fromProperty":"alignX"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>alignX</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>alignX</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #alignX}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initAlignY","fromProperty":"alignY"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>alignY</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>alignY</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #alignY}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initReversed","fromProperty":"reversed"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>reversed</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>reversed</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #reversed}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initSeparator","fromProperty":"separator"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>separator</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>separator</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #separator}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initSpacing","fromProperty":"spacing"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>spacing</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>spacing</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #spacing}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"isReversed","fromProperty":"reversed"},children:[{type:"desc",attributes:{"text":"<p>Check whether the (computed) value of the boolean property <code>reversed</code> equals <code>true</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #reversed}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Whether the property equals <code>true</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"docFrom":"qx.ui.layout.Abstract","overriddenFrom":"qx.ui.layout.Abstract","name":"renderLayout"},children:[{type:"params",children:[{type:"param",attributes:{"name":"availWidth"}},{type:"param",attributes:{"name":"availHeight"}}]}]},{type:"method",attributes:{"name":"resetAlignX","fromProperty":"alignX"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>alignX</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #alignX}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"resetAlignY","fromProperty":"alignY"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>alignY</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #alignY}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"resetReversed","fromProperty":"reversed"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>reversed</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #reversed}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"resetSeparator","fromProperty":"separator"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>separator</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #separator}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"resetSpacing","fromProperty":"spacing"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>spacing</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #spacing}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"setAlignX","fromProperty":"alignX"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>alignX</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>alignX</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #alignX}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"setAlignY","fromProperty":"alignY"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>alignY</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>alignY</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #alignY}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"setReversed","fromProperty":"reversed"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>reversed</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>reversed</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #reversed}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"setSeparator","fromProperty":"separator"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>separator</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>separator</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #separator}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"setSpacing","fromProperty":"spacing"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>spacing</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>spacing</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #spacing}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"toggleReversed","fromProperty":"reversed"},children:[{type:"desc",attributes:{"text":"<p>Toggles the (computed) value of the boolean property <code>reversed</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #reversed}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the new value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]}]},{type:"properties",children:[{type:"property",attributes:{"apply":"_applyLayoutChange","defaultValue":"\"left\"","propertyType":"new","name":"alignX","possibleValues":"\"left\",\"center\",\"right\""},children:[{type:"desc",attributes:{"text":"<p>Horizontal alignment of the whole children block. The horizontal\nalignment of the child is completely ignored in HBoxes (\n{@link qx.ui.core.LayoutItem#alignX}).</p>"}}]},{type:"property",attributes:{"apply":"_applyLayoutChange","defaultValue":"\"top\"","propertyType":"new","name":"alignY","possibleValues":"\"top\",\"middle\",\"bottom\""},children:[{type:"desc",attributes:{"text":"<p>Vertical alignment of each child. Can be overridden through\n{@link qx.ui.core.LayoutItem#alignY}.</p>"}}]},{type:"property",attributes:{"apply":"_applyReversed","defaultValue":"false","propertyType":"new","name":"reversed","check":"Boolean"},children:[{type:"desc",attributes:{"text":"<p>Whether the actual children list should be laid out in reversed order.</p>"}}]},{type:"property",attributes:{"check":"Decorator","allowNull":"true","propertyType":"new","name":"separator","apply":"_applyLayoutChange"},children:[{type:"desc",attributes:{"text":"<p>Separator lines to use between the objects</p>"}}]},{type:"property",attributes:{"apply":"_applyLayoutChange","defaultValue":"0","propertyType":"new","name":"spacing","check":"Integer"},children:[{type:"desc",attributes:{"text":"<p>Horizontal spacing between two children</p>"}}]}]}]}