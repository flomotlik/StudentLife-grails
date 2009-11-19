{type:"class",attributes:{"name":"IMultiSelection","packageName":"qx.ui.core","implementations":"qx.ui.form.List,qx.ui.tree.Tree","fullName":"qx.ui.core.IMultiSelection","type":"interface"},children:[{type:"desc",attributes:{"text":"<p>Each object, which should support multiselection selection have to\nimplement this interface.</p>"}},{type:"superInterfaces",children:[{type:"interface",attributes:{"name":"qx.ui.core.ISingleSelection"}}]},{type:"methods",children:[{type:"method",attributes:{"name":"addToSelection"},children:[{type:"params",children:[{type:"param",attributes:{"name":"item"},children:[{type:"desc",attributes:{"text":"<p>Any valid item</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.core.Widget"}}]}]}]},{type:"desc",attributes:{"text":"<p>Adds the given item to the existing selection.</p>"}}]},{type:"method",attributes:{"name":"removeFromSelection"},children:[{type:"params",children:[{type:"param",attributes:{"name":"item"},children:[{type:"desc",attributes:{"text":"<p>Any valid item</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.ui.core.Widget"}}]}]}]},{type:"desc",attributes:{"text":"<p>Removes the given item from the selection.</p>\n\n<p>Use {@link qx.ui.core.ISingleSelection#resetSelection} when you\nwant to clear the whole selection at once.</p>"}}]},{type:"method",attributes:{"name":"selectAll"},children:[{type:"desc",attributes:{"text":"<p>Selects all items of the managed object.</p>"}}]}]}]}