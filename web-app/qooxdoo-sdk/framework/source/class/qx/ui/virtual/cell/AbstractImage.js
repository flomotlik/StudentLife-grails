/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Til Schneider (til132)
     * Carsten Lergenmueller (carstenl)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * EXPERIMENTAL!
 */
qx.Class.define("qx.ui.virtual.cell.AbstractImage",
{
  extend : qx.ui.virtual.cell.Cell,
  type : "abstract",

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);
    this._aliasManager = qx.util.AliasManager.getInstance();
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __defaultWidth : 16,
    __defaultHeight : 16,
    _aliasManager : null,


    /**
     * Compute the size of the given image
     *
     * @param source {String} the image URL
     * @return {Map} A map containing the image's <code>width</code> and
     *    <code>height</code>
     */
    __getImageSize : function(source)
    {
      var ResourceManager = qx.util.ResourceManager.getInstance();
      var ImageLoader = qx.io2.ImageLoader;
      var width, height;

      // Detect if the image registry knows this image
      if (ResourceManager.has(source))
      {
        width = ResourceManager.getImageWidth(source),
        height = ResourceManager.getImageHeight(source)
      }
      else if (ImageLoader.isLoaded(source))
      {
        width = ImageLoader.getWidth(source);
        height = ImageLoader.getHeight(source);
      }
      else
      {
        width = this.__defaultWidth;
        height = this.__defaultHeight;
      }

      return {width : width, height : height};
    },


    __createImage : function(imageData)
    {
      if (typeof(imageData) == "string") {
        imageData = {url: imageData};
      }

      var url = this._aliasManager.resolve(imageData.url || null);
      var sizes;

      if (imageData.width && imageData.height) {
        sizes = {width : imageData.width, height : imageData.height};
      } else {
        sizes = this.__getImageSize(url);
      }

      return {
        width : sizes.width,
        height : sizes.height,
        url : url,
        tooltip : imageData.tooltip
      };
    },


    /**
     * Identifies the Image to show. This is a template method, which must be
     * implements by sub classes.
     *
     * @abstract
     * @param value {var} TODO
     * @return {Map} A map having the following attributes:
     *           <ul>
     *           <li>"url": (type string) must be the URL of the image to show.</li>
     *           <li>"width": (type int) the width of the image in pixels.</li>
     *           <li>"height": (type int) the height of the image in pixels.</li>
     *           <li>"tooltip": (type string) must be the image tooltip text.</li>
     *           </ul>
     */
    _identifyImage : function(value) {
      throw new Error("_identifyImage is abstract");
    },


    getContent : function(value, states)
    {
      if (value === null) {
        return "";
      }

      var content = "";
      var imageData = this.__createImage(this._identifyImage(value));
      var isOldFireFox = qx.bom.client.Engine.GECKO && qx.bom.client.Engine.VERSION < 1.9;
      var tooltip = imageData.tooltip ? 'title="' + imageData.tooltip + '"' : "";

      var styles = {
        width: imageData.width + "px",
        height: imageData.height + "px",
        display: isOldFireFox ? "-moz-inline-box" : "inline-block",
        verticalAlign: "top",
        position: "static"
      };

      var tag = qx.bom.element.Decoration.getTagName("no-repeat", imageData.url);
      var ret = qx.bom.element.Decoration.getAttributes(imageData.url, "no-repeat", styles);
      var css = qx.bom.element.Style.compile(ret.style);

      if (tag === "img")
      {
        content = '<img src="' + ret.src + '" style="' + css + '" ';
        content += tooltip + '/>';
      }
      else
      {
        content = '<div style="' + css + '" ';
        content += tooltip + '></div>';
      }
      return content;
    }

  }
});
