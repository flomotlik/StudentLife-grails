{type:"class",attributes:{"isStatic":"true","name":"Theme","packageName":"qx","fullName":"qx.Theme","type":"class"},children:[{type:"desc",attributes:{"text":"<p>Theme classes contain styling information for certain aspects of the\ngraphical user interface.</p>\n\n<p>Supported themes are: colors, decorations, fonts, icons, appearances.\nThe additional meta theme allows for grouping of the individual\nthemes.</p>\n\n<p>The following themes are deprecated in 0.8: borders, widgets</p>"}},{type:"methods-static",children:[{type:"method",attributes:{"access":"private","isStatic":"true","name":"__convert"},children:[{type:"params",children:[{type:"param",attributes:{"name":"theme"},children:[{type:"desc",attributes:{"text":"<p>newly created theme object</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Theme"}}]}]},{type:"param",attributes:{"name":"config"},children:[{type:"desc",attributes:{"text":"<p>incoming theme configuration</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]}]},{type:"desc",attributes:{"text":"<p>Convert existing entry to a prototype based inheritance function</p>"}}]},{type:"method",attributes:{"access":"private","isStatic":"true","name":"__extractType"},children:[{type:"params",children:[{type:"param",attributes:{"name":"config"},children:[{type:"desc",attributes:{"text":"<p>The map from where to extract the key</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]}]},{type:"desc",attributes:{"text":"<p>Extract the inheritable key (could be only one)</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the key which was found</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"method",attributes:{"access":"private","isStatic":"true","name":"__initializeAliases"},children:[{type:"params",children:[{type:"param",attributes:{"name":"theme"},children:[{type:"desc",attributes:{"text":"<p>The theme</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]},{type:"param",attributes:{"name":"config"},children:[{type:"desc",attributes:{"text":"<p>config structure</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]}]},{type:"desc",attributes:{"text":"<p>Initialize alias inheritance</p>"}}]},{type:"method",attributes:{"access":"private","isStatic":"true","name":"__initializeResources"},children:[{type:"params",children:[{type:"param",attributes:{"name":"theme"},children:[{type:"desc",attributes:{"text":"<p>The theme</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]},{type:"param",attributes:{"name":"config"},children:[{type:"desc",attributes:{"text":"<p>config structure</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]}]},{type:"deprecated",children:[{type:"desc",attributes:{"text":"<p>&#8216;resources&#8217; will be replaced by &#8216;aliases&#8217;</p>"}}]},{type:"desc",attributes:{"text":"<p>Initialize resource inheritance</p>"}}]},{type:"method",attributes:{"access":"private","isStatic":"true","name":"__normalizeArray"},children:[{type:"params",children:[{type:"param",attributes:{"name":"objectOrArray"},children:[{type:"desc",attributes:{"text":"<p>Either an object that is to be\n  normalized to an array, or an array, which is just passed through</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Object"}},{type:"entry",attributes:{"type":"Array"}}]}]}]},{type:"desc",attributes:{"text":"<p>Normalize an object to an array</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Either an array that has the original object as its\n  single item, or the original array itself</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Array"}}]}]}]},{type:"method",attributes:{"access":"private","isStatic":"true","name":"__validateConfig"},children:[{type:"params",children:[{type:"param",attributes:{"name":"name"},children:[{type:"desc",attributes:{"text":"<p>The name of the class</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]},{type:"param",attributes:{"name":"config"},children:[{type:"desc",attributes:{"text":"<p>Configuration map</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]}]},{type:"desc",attributes:{"text":"<p>Validates incoming configuration and checks keys and values</p>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"define"},children:[{type:"params",children:[{type:"param",attributes:{"name":"name"},children:[{type:"desc",attributes:{"text":"<p>name of the mixin</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]},{type:"param",attributes:{"name":"config"},children:[{type:"desc",attributes:{"text":"<p>config structure</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]}]},{type:"desc",attributes:{"text":"<p>Theme config</p>\n\n<p>Example:</p>\n\n<pre class=\"javascript\">\nqx.Theme.define(\"name\",\n{\n  aliases : {\n    \"aliasKey\" : \"resourceFolderOrUri\"\n  },\n  extend : otherTheme,\n  include : [MMixinTheme],\n  patch : [MMixinTheme],\n  colors : {},\n  decorations : {},\n  fonts : {},\n  icons : {},\n  widgets : {},\n  appearances : {},\n  meta : {}\n});\n</pre>"}},{type:"return",children:[{type:"types",children:[{type:"entry",attributes:{"type":"void"}}]}]}]},{type:"method",attributes:{"access":"internal","isInternal":"true","isStatic":"true","name":"genericToString"},children:[{type:"desc",attributes:{"text":"<p>This method will be attached to all themes to return\na nice identifier for them.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The interface identifier</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"getAll"},children:[{type:"desc",attributes:{"text":"<p>Return a map of all known themes</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>known themes</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Map"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"getByName"},children:[{type:"params",children:[{type:"param",attributes:{"name":"name"},children:[{type:"desc",attributes:{"text":"<p>theme name to check</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"desc",attributes:{"text":"<p>Returns a theme by name</p>"}},{type:"return",attributes:{"defaultValue":"void"},children:[{type:"desc",attributes:{"text":"<p>theme object</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Object"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"getTotalNumber"},children:[{type:"desc",attributes:{"text":"<p>Determine the number of themes which are defined</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>the number of classes</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Number"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"include"},children:[{type:"params",children:[{type:"param",attributes:{"name":"theme"},children:[{type:"desc",attributes:{"text":"<p>An existing theme which should be modified by including the mixin theme.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Theme"}}]}]},{type:"param",attributes:{"name":"mixinTheme"},children:[{type:"desc",attributes:{"text":"<p>The theme to be included.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Theme"}}]}]}]},{type:"desc",attributes:{"text":"<p>Include all keys of the given mixin theme into the theme. If the\nmixin includes any keys that are already available in the\nclass, they will be silently ignored. Use the {@link #patch} method\nif you need to overwrite keys in the current class.</p>"}}]},{type:"method",attributes:{"isStatic":"true","name":"isDefined"},children:[{type:"params",children:[{type:"param",attributes:{"name":"name"},children:[{type:"desc",attributes:{"text":"<p>theme name to check</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"desc",attributes:{"text":"<p>Determine if theme exists</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>true if theme exists</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"patch"},children:[{type:"params",children:[{type:"param",attributes:{"name":"theme"},children:[{type:"desc",attributes:{"text":"<p>An existing theme which should be modified by including the mixin theme.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Theme"}}]}]},{type:"param",attributes:{"name":"mixinTheme"},children:[{type:"desc",attributes:{"text":"<p>The theme to be included.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Theme"}}]}]}]},{type:"desc",attributes:{"text":"<p>Include all keys of the given mixin theme into the theme. The mixin may\ninclude keys which are already defined in the target theme. Existing\nfeatures of equal name will be overwritten.</p>"}}]}]}]}