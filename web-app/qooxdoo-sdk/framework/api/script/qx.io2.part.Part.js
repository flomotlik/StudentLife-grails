{type:"class",attributes:{"name":"Part","packageName":"qx.io2.part","superClass":"qx.core.Object","fullName":"qx.io2.part.Part","type":"class"},children:[{type:"desc",attributes:{"text":"<p>Wrapper for a part as defined in the config file. This class knows about all\npackages the part depends on and provides functionality to load the part.</p>"}},{type:"constructor",children:[{type:"method",attributes:{"overriddenFrom":"qx.core.Object","isCtor":"true","name":"ctor"},children:[{type:"params",children:[{type:"param",attributes:{"name":"name"},children:[{type:"desc",attributes:{"text":"<p>Name of the part as defined in the config file at\n   compile time.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]},{type:"param",attributes:{"name":"packages"},children:[{type:"desc",attributes:{"text":"<p>List of dependent packages</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Package","dimensions":"1"}}]}]}]}]}]},{type:"events",children:[{type:"event",attributes:{"name":"load"},children:[{type:"desc",attributes:{"text":"<p>This event is fired after the part has been loaded successfully.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.event.type.Event"}}]}]}]},{type:"methods",children:[{type:"method",attributes:{"name":"getName"},children:[{type:"desc",attributes:{"text":"<p>The part name as defined in the config file</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The part name</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"method",attributes:{"name":"getReadyState"},children:[{type:"desc",attributes:{"text":"<p>Get the ready state of the part. The value is one of\n<ul>\n<li>\n  <b>initialized</b>: The part is initialized. The {@link #load}\n  method has not yet been called\n</li>\n<li><b>loading</b>: The part is still loading.</li>\n<li><b>complete</b>: The part has been loaded successfully</li>\n</li></p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The ready state.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"method",attributes:{"name":"load"},children:[{type:"params",children:[{type:"param",attributes:{"name":"callback"},children:[{type:"desc",attributes:{"text":"<p>Function to execute on completion</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Function"}}]}]},{type:"param",attributes:{"defaultValue":"window","name":"self"},children:[{type:"desc",attributes:{"text":"<p>Context to execute the given function in</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Object"}}]}]}]},{type:"desc",attributes:{"text":"<p>Loads the part asynchronously. The callback is called after the part and\nits dependencies are fully loaded. If the part is already loaded the\ncallback is called immediately.</p>"}}]}]}]}