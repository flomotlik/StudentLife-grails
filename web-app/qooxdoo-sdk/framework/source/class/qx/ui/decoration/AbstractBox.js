/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Abstract base class for the HBox and VBox decorators.
 *
 * This decorator uses three images, which are positioned in a vertical/horizontal
 * line. The first and last image always keep their original size. The center
 * image is stretched.
 */
qx.Class.define("qx.ui.decoration.AbstractBox",
{
  extend : qx.ui.decoration.Abstract,
  type : "abstract",


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param baseImage {String} Base image to use
   * @param insets {Integer|Array} Insets for the grid
   */
  construct : function(baseImage, insets)
  {
    this.base(arguments);

    // Initialize properties
    if (baseImage != null) {
      this.setBaseImage(baseImage);
    }

    if (insets != null) {
      this.setInsets(insets);
    }
  },





  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Base image URL. All the different images needed are named by the default
     * naming scheme:
     *
     * ${baseImageWithoutExtension}-${imageName}.${baseImageExtension}
     *
     * These image names are used:
     *
     * * t: top side (vertical orientation)
     * * b: bottom side (vertical orientation)
     *
     * * l: left side (horizontal orientation)
     * * r: right side (horizontal orientation)
     *
     * * c: center image
     */
    baseImage :
    {
      check : "String",
      nullable : true,
      apply : "_applyBaseImage"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __markup : null,
    __images : null,
    __edges : null,


    // overridden
    _getDefaultInsets : function()
    {
      return {
        top : 0,
        right : 0,
        bottom : 0,
        left : 0
      };
    },


    // overridden
    _isInitialized: function() {
      return !!this.__markup;
    },


    /**
     * Helper to set the orientation.
     *
     * @param orientation {String} horizontal or vertical
     */
    _setOrientation : function(orientation) {
      this._isHorizontal = orientation == "horizontal";
    },


    /*
    ---------------------------------------------------------------------------
      INTERFACE IMPLEMENTATION
    ---------------------------------------------------------------------------
    */

    // interface implementation
    getMarkup : function()
    {
      if (this.__markup) {
        return this.__markup;
      }

      var Decoration = qx.bom.element.Decoration;
      var images = this.__images;
      var edges = this.__edges;

      var html = [];

      // Outer frame
      // Note: Overflow=hidden is needed for Safari 3.1 to omit scrolling through
      // dragging when the cursor is in the text field in Spinners etc.
      html.push('<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">');

      if (this._isHorizontal)
      {
        html.push(Decoration.create(images.l, "no-repeat", { top: 0, left: 0 }));
        html.push(Decoration.create(images.c, "repeat-x", { top: 0, left: edges.left + "px" }));
        html.push(Decoration.create(images.r, "no-repeat", { top: 0, right : 0 }));
      }
      else
      {
        html.push(Decoration.create(images.t, "no-repeat", { top: 0, left: 0 }));
        html.push(Decoration.create(images.c, "repeat-y", { top: edges.top + "px", left: edges.left + "px" }));
        html.push(Decoration.create(images.b, "no-repeat", { bottom: 0, left:0 }));
      }

      // Outer frame
      html.push('</div>');

      // Store
      return this.__markup = html.join("");
    },


    // interface implementation
    resize : function(element, width, height)
    {
      element.style.width = width + "px";
      element.style.height = height + "px";

      // Compute inner sizes
      var edges = this.__edges;

      if (this._isHorizontal)
      {
        var innerWidth = width - edges.left - edges.right;
        element.childNodes[1].style.width = innerWidth + "px";
      }
      else
      {
        var innerHeight = height - edges.top - edges.bottom;
        element.childNodes[1].style.height = innerHeight + "px";
      }
    },


    // interface implementation
    tint : function(element, bgcolor) {
      // not implemented
    },


    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */


    // property apply
    _applyBaseImage : function(value, old)
    {
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        if (this.__markup) {
          throw new Error("This decorator is already in-use. Modification is not possible anymore!");
        }
      }

      var ResourceManager = qx.util.ResourceManager.getInstance();
      if (value)
      {
        var Alias = qx.util.AliasManager.getInstance();

        var base = Alias.resolve(value);
        var split = /(.*)(\.[a-z]+)$/.exec(base);
        var prefix = split[1];
        var ext = split[2];

        // Store images
        var images = this.__images =
        {
          t : prefix + "-t" + ext,
          b : prefix + "-b" + ext,

          c : prefix + "-c" + ext,

          l : prefix + "-l" + ext,
          r : prefix + "-r" + ext
        };

        // Store edges
        this.__edges =
        {
          top : ResourceManager.getImageHeight(images.t),
          bottom : ResourceManager.getImageHeight(images.b),
          left : ResourceManager.getImageWidth(images.l),
          right : ResourceManager.getImageWidth(images.r)
        };
      }
    }
  },



  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeFields("__markup", "__insets", "__images", "__edges");
  }
});
