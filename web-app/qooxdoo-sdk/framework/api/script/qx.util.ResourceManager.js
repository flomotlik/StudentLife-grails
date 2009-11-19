{type:"class",attributes:{"name":"ResourceManager","packageName":"qx.util","superClass":"qx.core.Object","isSingleton":"true","fullName":"qx.util.ResourceManager","type":"class"},children:[{type:"desc",attributes:{"text":"<p>Contains information about images (size, format, clipping, ...) and\nother resources like <span class=\"caps\">CSS</span> files, local data, ...</p>"}},{type:"methods-static",children:[{type:"method",attributes:{"isStatic":"true","name":"getData"},children:[{type:"params",children:[{type:"param",attributes:{"name":"id"},children:[{type:"desc",attributes:{"text":"<p>The resource to get the information for</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"deprecated",children:[{type:"desc",attributes:{"text":"<p>Use &#8217;.getInstance().getData&#8217; instead!</p>"}}]},{type:"desc",attributes:{"text":"<p>Get information about an resource.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Registered data or <code>null</code></p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Array"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"getImageFormat"},children:[{type:"params",children:[{type:"param",attributes:{"name":"id"},children:[{type:"desc",attributes:{"text":"<p>Resource identifier</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"deprecated",children:[{type:"desc",attributes:{"text":"<p>Use &#8217;.getInstance().getImageFormat&#8217; instead!</p>"}}]},{type:"desc",attributes:{"text":"<p>Returns the format of the given resource ID,\nwhen it is not a known image <code>null</code>\nis returned.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>File format of the image</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"getImageHeight"},children:[{type:"params",children:[{type:"param",attributes:{"name":"id"},children:[{type:"desc",attributes:{"text":"<p>Resource identifier</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"deprecated",children:[{type:"desc",attributes:{"text":"<p>Use &#8217;.getInstance().getImageHeight&#8217; instead!</p>"}}]},{type:"desc",attributes:{"text":"<p>Returns the height of the given resource ID,\nwhen it is not a known image <code>0</code> is\nreturned.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The image height, maybe <code>null</code> when the height is unknown</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"getImageWidth"},children:[{type:"params",children:[{type:"param",attributes:{"name":"id"},children:[{type:"desc",attributes:{"text":"<p>Resource identifier</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"deprecated",children:[{type:"desc",attributes:{"text":"<p>Use &#8217;.getInstance().getImageWidth&#8217; instead!</p>"}}]},{type:"desc",attributes:{"text":"<p>Returns the width of the given resource ID,\nwhen it is not a known image <code>0</code> is\nreturned.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The image width, maybe <code>null</code> when the width is unknown</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"getInstance"},children:[{type:"desc",attributes:{"text":"<p>Returns a singleton instance of this class. On the first call the class\nis instantiated by calling the constructor with no arguments. All following\ncalls will return this instance.</p>\n\n<p>This method has been added by setting the &#8220;type&#8221; key in the class definition\n({@link qx.Class#define}) to &#8220;singleton&#8221;.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The singleton instance of this class.</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"qx.util.ResourceManager"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"has"},children:[{type:"params",children:[{type:"param",attributes:{"name":"id"},children:[{type:"desc",attributes:{"text":"<p>The resource to get the information for</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"deprecated",children:[{type:"desc",attributes:{"text":"<p>Use &#8217;.getInstance().has&#8217; instead!</p>"}}]},{type:"desc",attributes:{"text":"<p>Whether the registry has information about the given resource.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<code>true</code> when the resource is known."}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"isClippedImage"},children:[{type:"params",children:[{type:"param",attributes:{"name":"id"},children:[{type:"desc",attributes:{"text":"<p>Resource identifier</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"deprecated",children:[{type:"desc",attributes:{"text":"<p>Use &#8217;.getInstance().isClippedImage&#8217; instead!</p>"}}]},{type:"desc",attributes:{"text":"<p>Whether the given resource identifier is a image\nwith clipping information available.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Whether the resource ID is known as a clipped image</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"isStatic":"true","name":"toUri"},children:[{type:"params",children:[{type:"param",attributes:{"name":"id"},children:[{type:"desc",attributes:{"text":"<p>Resource ID</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"deprecated",children:[{type:"desc",attributes:{"text":"<p>Use &#8217;.getInstance().toUri&#8217; instead!</p>"}}]},{type:"desc",attributes:{"text":"<p>Converts the given resource ID to a full qualified <span class=\"caps\">URI</span></p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Resulting <span class=\"caps\">URI</span></p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]}]},{type:"methods",children:[{type:"method",attributes:{"name":"getData"},children:[{type:"params",children:[{type:"param",attributes:{"name":"id"},children:[{type:"desc",attributes:{"text":"<p>The resource to get the information for</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"desc",attributes:{"text":"<p>Get information about an resource.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Registered data or <code>null</code></p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Array"}}]}]}]},{type:"method",attributes:{"name":"getImageFormat"},children:[{type:"params",children:[{type:"param",attributes:{"name":"id"},children:[{type:"desc",attributes:{"text":"<p>Resource identifier</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"desc",attributes:{"text":"<p>Returns the format of the given resource ID,\nwhen it is not a known image <code>null</code>\nis returned.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>File format of the image</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"method",attributes:{"name":"getImageHeight"},children:[{type:"params",children:[{type:"param",attributes:{"name":"id"},children:[{type:"desc",attributes:{"text":"<p>Resource identifier</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"desc",attributes:{"text":"<p>Returns the height of the given resource ID,\nwhen it is not a known image <code>0</code> is\nreturned.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The image height, maybe <code>null</code> when the height is unknown</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]}]},{type:"method",attributes:{"name":"getImageWidth"},children:[{type:"params",children:[{type:"param",attributes:{"name":"id"},children:[{type:"desc",attributes:{"text":"<p>Resource identifier</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"desc",attributes:{"text":"<p>Returns the width of the given resource ID,\nwhen it is not a known image <code>0</code> is\nreturned.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>The image width, maybe <code>null</code> when the width is unknown</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Integer"}}]}]}]},{type:"method",attributes:{"name":"has"},children:[{type:"params",children:[{type:"param",attributes:{"name":"id"},children:[{type:"desc",attributes:{"text":"<p>The resource to get the information for</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"desc",attributes:{"text":"<p>Whether the registry has information about the given resource.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<code>true</code> when the resource is known."}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"name":"isClippedImage"},children:[{type:"params",children:[{type:"param",attributes:{"name":"id"},children:[{type:"desc",attributes:{"text":"<p>Resource identifier</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"desc",attributes:{"text":"<p>Whether the given resource identifier is a image\nwith clipping information available.</p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Whether the resource ID is known as a clipped image</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"Boolean"}}]}]}]},{type:"method",attributes:{"name":"toUri"},children:[{type:"params",children:[{type:"param",attributes:{"name":"id"},children:[{type:"desc",attributes:{"text":"<p>Resource ID</p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]},{type:"desc",attributes:{"text":"<p>Converts the given resource ID to a full qualified <span class=\"caps\">URI</span></p>"}},{type:"return",children:[{type:"desc",attributes:{"text":"<p>Resulting <span class=\"caps\">URI</span></p>"}},{type:"types",children:[{type:"entry",attributes:{"type":"String"}}]}]}]}]}]}