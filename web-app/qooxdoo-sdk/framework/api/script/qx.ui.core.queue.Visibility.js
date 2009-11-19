{type:"class",attributes:{"isStatic":"true","name":"Visibility","packageName":"qx.ui.core.queue","fullName":"qx.ui.core.queue.Visibility","type":"class"},children:[{type:"desc",attributes:{"text":"<p>Keeps data about the visibility of all widgets. Updates the internal\ntree when widgets are added, removed or modify their visibility.</p>"}},{type:"methods-static",children:[{type:"method",attributes:{"access":"private","isStatic":"true","name":"__computeVisible"},children:[{type:"params",children:[{type:"param",attributes:{"name":"widget"},children:[{type:"desc",attributes:{"text":"<p>The widget to update</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.core.Widget"}}]}]}]},{type:"desc",attributes:{"text":"<p>Computes the visibility for the given widget</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Whether the widget is visible</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"add"},children:[{type:"params",children:[{type:"param",attributes:{"name":"widget"},children:[{type:"desc",attributes:{"text":"<p>The widget to add.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.core.Widget"}}]}]}]},{type:"desc",attributes:{"text":"<p>Adds a widget to the queue.</p>\n\n<p>Should only be used by {@link qx.ui.core.Widget}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"flush"},children:[{type:"desc",attributes:{"text":"<p>Flushes the visibility queue.</p>\n\n<p>This is used exclusively by the {@link qx.ui.core.queue.Manager}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"isVisible"},children:[{type:"params",children:[{type:"param",attributes:{"name":"widget"},children:[{type:"desc",attributes:{"text":"<p>The widget to query</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.core.Widget"}}]}]}]},{type:"desc",attributes:{"text":"<p>Whether the given widget is visible.</p>\n\n<p>Please note that the information given by this method is queued and may not be accurate\nuntil the next queue flush happens.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Whether the widget is visible</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"remove"},children:[{type:"params",children:[{type:"param",attributes:{"name":"widget"},children:[{type:"desc",attributes:{"text":"<p>The widget to clear</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.core.Widget"}}]}]}]},{type:"desc",attributes:{"text":"<p>Clears the cached data of the given widget. Normally only used\nduring interims disposes of one or a few widgets.</p>"}}]}]}]}