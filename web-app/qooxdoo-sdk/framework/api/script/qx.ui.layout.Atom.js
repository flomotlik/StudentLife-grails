{type:"class",attributes:{"name":"Atom","packageName":"qx.ui.layout","superClass":"qx.ui.layout.Abstract","fullName":"qx.ui.layout.Atom","type":"class"},children:[{type:"desc",attributes:{"text":"<p>A atom layout. Used to place an image and label in relation\nto each other. Useful to create buttons, list items, etc.</p>\n\n<p><strong>Features</strong></p>\n\n<ul>\n<li>Gap between icon and text (using {@link #gap})</li>\n<li>Vertical and horizontal mode (using {@link #iconPosition})</li>\n<li>Sorting options to place first child on top/left or bottom/right (using {@link #iconPosition})</li>\n<li>Automatically middles/centers content to the available space</li>\n<li>Auto-sizing</li>\n<li>Supports more than two children (will be processed the same way like the previous ones)</li>\n</ul>\n\n<p><strong>Item Properties</strong></p>\n\n<p>None</p>\n\n<p><strong>Notes</strong></p>\n\n<ul>\n<li>Does not support margins and alignment of {@link qx.ui.core.LayoutItem}.</li>\n</ul>\n\n<p><strong>External Documentation</strong></p>\n\n<a href=\"http://qooxdoo.org/documentation/0.8/layout/atom\">\nExtended documentation</a> and links to demos of this layout in the qooxdoo wiki.\n\n<p><strong>Alternative Names</strong></p>\n\n<p>None</p>"}},{type:"methods",children:[{type:"method",attributes:{"access":"protected","docFrom":"qx.ui.layout.Abstract","overriddenFrom":"qx.ui.layout.Abstract","name":"_computeSizeHint"}},{type:"method",attributes:{"name":"getCenter","fromProperty":"center"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>center</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #center}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>center</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"getGap","fromProperty":"gap"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>gap</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #gap}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>gap</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"getIconPosition","fromProperty":"iconPosition"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>iconPosition</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #iconPosition}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>iconPosition</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initCenter","fromProperty":"center"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>center</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>center</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #center}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initGap","fromProperty":"gap"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>gap</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>gap</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #gap}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initIconPosition","fromProperty":"iconPosition"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>iconPosition</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>iconPosition</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #iconPosition}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"isCenter","fromProperty":"center"},children:[{type:"desc",attributes:{"text":"<p>Check whether the (computed) value of the boolean property <code>center</code> equals <code>true</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #center}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Whether the property equals <code>true</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"docFrom":"qx.ui.layout.Abstract","overriddenFrom":"qx.ui.layout.Abstract","name":"renderLayout"},children:[{type:"params",children:[{type:"param",attributes:{"name":"availWidth"}},{type:"param",attributes:{"name":"availHeight"}}]}]},{type:"method",attributes:{"name":"resetCenter","fromProperty":"center"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>center</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #center}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"resetGap","fromProperty":"gap"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>gap</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #gap}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"resetIconPosition","fromProperty":"iconPosition"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>iconPosition</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #iconPosition}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"setCenter","fromProperty":"center"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>center</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>center</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #center}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"setGap","fromProperty":"gap"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>gap</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>gap</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #gap}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"setIconPosition","fromProperty":"iconPosition"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>iconPosition</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>iconPosition</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #iconPosition}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"toggleCenter","fromProperty":"center"},children:[{type:"desc",attributes:{"text":"<p>Toggles the (computed) value of the boolean property <code>center</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #center}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the new value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]}]},{type:"properties",children:[{type:"property",attributes:{"apply":"_applyLayoutChange","defaultValue":"false","propertyType":"new","name":"center","check":"Boolean"},children:[{type:"desc",attributes:{"text":"<p>Whether the content should be rendered centrally when to much space\nis available. Affects both axis.</p>"}}]},{type:"property",attributes:{"apply":"_applyLayoutChange","defaultValue":"4","propertyType":"new","name":"gap","check":"Integer"},children:[{type:"desc",attributes:{"text":"<p>The gap between the icon and the text</p>"}}]},{type:"property",attributes:{"apply":"_applyLayoutChange","defaultValue":"\"left\"","propertyType":"new","name":"iconPosition","possibleValues":"\"left\",\"top\",\"right\",\"bottom\""},children:[{type:"desc",attributes:{"text":"<p>The position of the icon in relation to the text</p>"}}]}]}]}