{type:"class",attributes:{"name":"SimpleTreeDataCellRenderer","packageName":"qx.ui.treevirtual","superClass":"qx.ui.table.cellrenderer.Abstract","fullName":"qx.ui.treevirtual.SimpleTreeDataCellRenderer","type":"class"},children:[{type:"desc",attributes:{"text":"<p>A data cell renderer for the tree column of a simple tree</p>\n\n<p>This cell renderer has provisions for subclasses to easily extend the\nappearance of the tree. If the tree should contain images, labels,\netc. before the indentation, the subclass should override the method\n_addExtraContentBeforeIndentation(). Similarly, content can be added before\nthe icon by overriding _addExtraContentBeforeIcon(), and before the label\nby overriding _addExtraContentBeforeLabel().</p>\n\n<p>Each of these overridden methods that calls _addImage() can provide, as\npart of the map passed to _addImage(), a member called &#8220;tooltip&#8221; which\ncontains the tool tip to present when the mouse is hovered over the image.</p>\n\n<p>If this class is subclassed to form a new cell renderer, an instance of it\nmust be provided, via the &#8216;custom&#8217; parameter, to the TreeVirtual\nconstructor.</p>"}},{type:"constructor",children:[{type:"method",attributes:{"docFrom":"qx.core.Object","overriddenFrom":"qx.ui.table.cellrenderer.Abstract","isCtor":"true","name":"ctor"}}]},{type:"methods-static",children:[{type:"method",attributes:{"access":"private","isStatic":"true","name":"__preloadImages"},children:[{type:"desc",attributes:{"text":"<p>Request preloading of images so they appear immediately upon rendering</p>"}}]}]},{type:"methods",children:[{type:"method",attributes:{"access":"protected","name":"_addExtraContentBeforeIcon"},children:[{type:"params",children:[{type:"param",attributes:{"name":"cellInfo"},children:[{type:"desc",attributes:{"text":"<p>The information about the cell.\n     See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]},{type:"param",attributes:{"name":"pos"},children:[{type:"desc",attributes:{"text":"<p>The position from the left edge of the column at which to render this\n  item.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]}]},{type:"desc",attributes:{"text":"<p>Adds extra content just before the icon.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The returned map contains an &#8216;html&#8217; member which contains the html for\n  the indentation, and a &#8216;pos&#8217; member which is the starting position\n  plus the width of the indentation.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"_addExtraContentBeforeIndentation"},children:[{type:"params",children:[{type:"param",attributes:{"name":"cellInfo"},children:[{type:"desc",attributes:{"text":"<p>The information about the cell.\n     See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]},{type:"param",attributes:{"name":"pos"},children:[{type:"desc",attributes:{"text":"<p>The position from the left edge of the column at which to render this\n  item.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]}]},{type:"desc",attributes:{"text":"<p>Adds extra content just before the indentation.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The returned map contains an &#8216;html&#8217; member which contains the html for\n  the indentation, and a &#8216;pos&#8217; member which is the starting position\n  plus the width of the indentation.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"_addExtraContentBeforeLabel"},children:[{type:"params",children:[{type:"param",attributes:{"name":"cellInfo"},children:[{type:"desc",attributes:{"text":"<p>The information about the cell.\n     See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]},{type:"param",attributes:{"name":"pos"},children:[{type:"desc",attributes:{"text":"<p>The position from the left edge of the column at which to render this\n  item.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]}]},{type:"desc",attributes:{"text":"<p>Adds extra content just before the label.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The returned map contains an &#8216;html&#8217; member which contains the html for\n  the indentation, and a &#8216;pos&#8217; member which is the starting position\n  plus the width of the indentation.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"_addIcon"},children:[{type:"params",children:[{type:"param",attributes:{"name":"cellInfo"},children:[{type:"desc",attributes:{"text":"<p>The information about the cell.\n  See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]},{type:"param",attributes:{"name":"pos"},children:[{type:"desc",attributes:{"text":"<p>The position from the left edge of the column at which to render this\n  item.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]}]},{type:"desc",attributes:{"text":"<p>Add the icon for this node of the tree.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The returned map contains an &#8216;html&#8217; member which contains the html for\n  the icon, and a &#8216;pos&#8217; member which is the starting position plus the\n  width of the icon.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"_addImage"},children:[{type:"params",children:[{type:"param",attributes:{"name":"imageInfo"},children:[{type:"desc",attributes:{"text":"<p>How to display the image.  It optionally includes any of the\n  following:\n  <dl>\n    <dt>position {Map}</dt>\n    <dd>\n      If provided, a div is created to hold the image.  The div&#8217;s top,\n      right, bottom, left, width, and/or height may be specified with\n      members of this map.  Each is expected to be an integer value.\n    </dd>\n    <dt>imageWidth, imageHeight</dt>\n    <dd>\n      The image&#8217;s width and height.  These are used only if both are\n      specified.\n    </dd>\n  </dl></p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]}]},{type:"desc",attributes:{"text":"<p>Add an image to the tree.  This might be a visible icon or it may be\npart of the indentation.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The html for this image, possibly with a surrounding div (see\n  &#8216;position&#8217;, above).</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"_addIndentation"},children:[{type:"params",children:[{type:"param",attributes:{"name":"cellInfo"},children:[{type:"desc",attributes:{"text":"<p>The information about the cell.\n  See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]},{type:"param",attributes:{"name":"pos"},children:[{type:"desc",attributes:{"text":"<p>The position from the left edge of the column at which to render this\n  item.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]}]},{type:"desc",attributes:{"text":"<p>Add the indentation for this node of the tree.</p>\n\n<p>The indentation optionally includes tree lines.  Whether tree lines are\nused depends on (a) the properties &#8216;useTreeLines&#8217; and\n&#8216;excludeFirstLevelTreelines&#8217; within this class; and (b) the widget\ntheme in use (some themes don&#8217;t support tree lines).</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The returned map contains an &#8216;html&#8217; member which contains the html for\n  the indentation, and a &#8216;pos&#8217; member which is the starting position\n  plus the width of the indentation.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"_addLabel"},children:[{type:"params",children:[{type:"param",attributes:{"name":"cellInfo"},children:[{type:"desc",attributes:{"text":"<p>The information about the cell.\n  See {@link qx.ui.table.cellrenderer.Abstract#createDataCellHtml}.\n  Additionally, if defined, the labelSpanStyle member is used to apply\n  style to the span containing the label.  (This member is for use by\n  subclasses; it&#8217;s not otherwise used by this class.)</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]},{type:"param",attributes:{"name":"pos"},children:[{type:"desc",attributes:{"text":"<p>The position from the left edge of the column at which to render this\n  item.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]}]},{type:"desc",attributes:{"text":"<p>Add the label for this node of the tree.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The html for the label.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"method",attributes:{"access":"protected","docFrom":"qx.ui.table.cellrenderer.Abstract","overriddenFrom":"qx.ui.table.cellrenderer.Abstract","name":"_getCellStyle"},children:[{type:"params",children:[{type:"param",attributes:{"name":"cellInfo"}}]}]},{type:"method",attributes:{"access":"protected","docFrom":"qx.ui.table.cellrenderer.Abstract","overriddenFrom":"qx.ui.table.cellrenderer.Abstract","name":"_getContentHtml"},children:[{type:"params",children:[{type:"param",attributes:{"name":"cellInfo"}}]}]},{type:"method",attributes:{"access":"protected","name":"_getIndentSymbol"},children:[{type:"params",children:[{type:"param",attributes:{"name":"column"},children:[{type:"desc",attributes:{"text":"<p>The column of indentation being requested, zero-relative</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]},{type:"param",attributes:{"name":"node"},children:[{type:"desc",attributes:{"text":"<p>The node being displayed in the row.  The properties of a node are\n  described in {@link qx.ui.treevirtual.SimpleTreeDataModel}</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Node"}}]}]},{type:"param",attributes:{"name":"bUseTreeLines"},children:[{type:"desc",attributes:{"text":"<p>Whether to find an appropriate tree line icon, or simply provide\n  white space.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]},{type:"param",attributes:{"name":"bAlwaysShowOpenCloseSymbol"},children:[{type:"desc",attributes:{"text":"<p>Whether to display the open/close icon for a node even if it has no\n  children.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]},{type:"param",attributes:{"name":"bExcludeFirstLevelTreeLines"},children:[{type:"desc",attributes:{"text":"<p>If bUseTreeLines is enabled, then further filtering of the left-most\n  tree line may be specified here.  If <i>true</i> then the left-most\n  tree line, between top-level siblings, will not be displayed.\n  If <i>false</i>, then the left-most tree line wiill be displayed\n  just like all of the other tree lines.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"desc",attributes:{"text":"<p>Determine the symbol to use for indentation of a tree row, at a\nparticular column.  The indentation to use may be just white space or\nmay be a tree line.  Tree lines come in numerous varieties, so the\nappropriate one is selected.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"getAlwaysShowOpenCloseSymbol","fromProperty":"alwaysShowOpenCloseSymbol"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>alwaysShowOpenCloseSymbol</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #alwaysShowOpenCloseSymbol}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>alwaysShowOpenCloseSymbol</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"getExcludeFirstLevelTreeLines","fromProperty":"excludeFirstLevelTreeLines"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>excludeFirstLevelTreeLines</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #excludeFirstLevelTreeLines}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>excludeFirstLevelTreeLines</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"getUseTreeLines","fromProperty":"useTreeLines"},children:[{type:"desc",attributes:{"text":"<p>Returns the (computed) value of the property <code>useTreeLines</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #useTreeLines}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>(Computed) value of <code>useTreeLines</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initAlwaysShowOpenCloseSymbol","fromProperty":"alwaysShowOpenCloseSymbol"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>alwaysShowOpenCloseSymbol</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>alwaysShowOpenCloseSymbol</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #alwaysShowOpenCloseSymbol}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initExcludeFirstLevelTreeLines","fromProperty":"excludeFirstLevelTreeLines"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>excludeFirstLevelTreeLines</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>excludeFirstLevelTreeLines</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #excludeFirstLevelTreeLines}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"access":"protected","name":"initUseTreeLines","fromProperty":"useTreeLines"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>Initial value for property <code>useTreeLines</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Calls the apply method and dispatches the change event of the property <code>useTreeLines</code>\nwith the default value defined by the class developer. This function can\nonly be called from the constructor of a class.</p>\n\n<p>For further details take a look at the property definition: {@link #useTreeLines}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the default value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"isAlwaysShowOpenCloseSymbol","fromProperty":"alwaysShowOpenCloseSymbol"},children:[{type:"desc",attributes:{"text":"<p>Check whether the (computed) value of the boolean property <code>alwaysShowOpenCloseSymbol</code> equals <code>true</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #alwaysShowOpenCloseSymbol}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Whether the property equals <code>true</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"name":"isExcludeFirstLevelTreeLines","fromProperty":"excludeFirstLevelTreeLines"},children:[{type:"desc",attributes:{"text":"<p>Check whether the (computed) value of the boolean property <code>excludeFirstLevelTreeLines</code> equals <code>true</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #excludeFirstLevelTreeLines}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Whether the property equals <code>true</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"name":"isUseTreeLines","fromProperty":"useTreeLines"},children:[{type:"desc",attributes:{"text":"<p>Check whether the (computed) value of the boolean property <code>useTreeLines</code> equals <code>true</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #useTreeLines}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Whether the property equals <code>true</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"name":"resetAlwaysShowOpenCloseSymbol","fromProperty":"alwaysShowOpenCloseSymbol"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>alwaysShowOpenCloseSymbol</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #alwaysShowOpenCloseSymbol}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"resetExcludeFirstLevelTreeLines","fromProperty":"excludeFirstLevelTreeLines"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>excludeFirstLevelTreeLines</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #excludeFirstLevelTreeLines}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"resetUseTreeLines","fromProperty":"useTreeLines"},children:[{type:"desc",attributes:{"text":"<p>Resets the user value of the property <code>useTreeLines</code>.</p>\n\n<p>The computed value falls back to the next available value e.g. appearance, init or\ninheritance value depeneding on the property configuration and value availability.</p>\n\n<p>For further details take a look at the property definition: {@link #useTreeLines}.</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"name":"setAlwaysShowOpenCloseSymbol","fromProperty":"alwaysShowOpenCloseSymbol"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>alwaysShowOpenCloseSymbol</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>alwaysShowOpenCloseSymbol</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #alwaysShowOpenCloseSymbol}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"setExcludeFirstLevelTreeLines","fromProperty":"excludeFirstLevelTreeLines"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>excludeFirstLevelTreeLines</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>excludeFirstLevelTreeLines</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #excludeFirstLevelTreeLines}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"setUseTreeLines","fromProperty":"useTreeLines"},children:[{type:"params",children:[{type:"param",attributes:{"name":"value"},children:[{type:"desc",attributes:{"text":"<p>New value for property <code>useTreeLines</code>.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"desc",attributes:{"text":"<p>Sets the user value of the property <code>useTreeLines</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #useTreeLines}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The unmodified incoming value.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"var"}}]}]}]},{type:"method",attributes:{"name":"toggleAlwaysShowOpenCloseSymbol","fromProperty":"alwaysShowOpenCloseSymbol"},children:[{type:"desc",attributes:{"text":"<p>Toggles the (computed) value of the boolean property <code>alwaysShowOpenCloseSymbol</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #alwaysShowOpenCloseSymbol}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the new value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"name":"toggleExcludeFirstLevelTreeLines","fromProperty":"excludeFirstLevelTreeLines"},children:[{type:"desc",attributes:{"text":"<p>Toggles the (computed) value of the boolean property <code>excludeFirstLevelTreeLines</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #excludeFirstLevelTreeLines}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the new value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"name":"toggleUseTreeLines","fromProperty":"useTreeLines"},children:[{type:"desc",attributes:{"text":"<p>Toggles the (computed) value of the boolean property <code>useTreeLines</code>.</p>\n\n<p>For further details take a look at the property definition: {@link #useTreeLines}.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the new value</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]}]},{type:"properties",children:[{type:"property",attributes:{"defaultValue":"false","propertyType":"new","name":"alwaysShowOpenCloseSymbol","check":"Boolean"},children:[{type:"desc",attributes:{"text":"<p>Set whether the open/close button should be displayed on a branch, even\nif the branch has no children.</p>"}}]},{type:"property",attributes:{"defaultValue":"false","propertyType":"new","name":"excludeFirstLevelTreeLines","check":"Boolean"},children:[{type:"desc",attributes:{"text":"<p>When true, exclude only the first-level tree lines, creating,\neffectively, multiple unrelated root nodes.</p>"}}]},{type:"property",attributes:{"defaultValue":"true","propertyType":"new","name":"useTreeLines","check":"Boolean"},children:[{type:"desc",attributes:{"text":"<p>Set whether lines linking tree children shall be drawn on the tree\nif the theme supports tree lines.</p>"}}]}]}]}