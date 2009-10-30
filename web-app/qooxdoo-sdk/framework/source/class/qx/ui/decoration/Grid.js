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
 * A very complex decoration using two, partly combined and clipped images
 * to render a graphically impressive borders with gradients.
 *
 * The decoration supports all forms of vertical gradients. The gradients must
 * be stretchable to support different heights.
 *
 * The edges could use different styles of rounded borders. Even different
 * edge sizes are supported. The sizes are automatically detected by
 * the build system using the image meta data.
 *
 * The decoration uses clipped images to reduce the number of external
 * resources to load.
 */
qx.Class.define("qx.ui.decoration.Grid",
{
  extend : qx.ui.decoration.Abstract,


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
     * * tl (top-left edge)
     * * t (top side)
     * * tr (top-right edge)

     * * bl (bottom-left edge)
     * * b (bottom side)
     * * br (bottom-right edge)
     *
     * * l (left side)
     * * c (center image)
     * * r (right side)
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

      // Create edges and vertical sides
      // Order: tl, t, tr, bl, b, bt, l, c, r
      var html = [];

      // Outer frame
      // Note: Overflow=hidden is needed for Safari 3.1 to omit scrolling through
      // dragging when the cursor is in the text field in Spinners etc.
      html.push('<div style="position:absolute;top:0;left:0;overflow:hidden;font-size:0;line-height:0;">');

      // Top: left, center, right
      html.push(Decoration.create(images.tl, "no-repeat", { top: 0, left: 0 }));
      html.push(Decoration.create(images.t, "scale-x", { top: 0, left: edges.left + "px" }));
      html.push(Decoration.create(images.tr, "no-repeat", { top: 0, right : 0 }));

      // Bottom: left, center, right
      html.push(Decoration.create(images.bl, "no-repeat", { bottom: 0, left:0 }));
      html.push(Decoration.create(images.b, "scale-x", { bottom: 0, left: edges.left + "px" }));
      html.push(Decoration.create(images.br, "no-repeat", { bottom: 0, right: 0 }));

      // Middle: left, center, right
      html.push(Decoration.create(images.l, "scale-y", { top: edges.top + "px", left: 0 }));
      html.push(Decoration.create(images.c, "scale", { top: edges.top + "px", left: edges.left + "px" }));
      html.push(Decoration.create(images.r, "scale-y", { top: edges.top + "px", right: 0 }));

      // Outer frame
      html.push('</div>');

      // Store
      return this.__markup = html.join("");
    },


    // interface implementation
    resize : function(element, width, height)
    {
      // Compute inner sizes
      var edges = this.__edges;
      var innerWidth = width - edges.left - edges.right;
      var innerHeight = height - edges.top - edges.bottom;

      // Set the inner width or height to zero if negative
      if (innerWidth < 0) {innerWidth = 0;}
      if (innerHeight < 0) {innerHeight = 0;}

      // Update nodes
      element.style.width = width + "px";
      element.style.height = height + "px";

      element.childNodes[1].style.width = innerWidth + "px";
      element.childNodes[4].style.width = innerWidth + "px";
      element.childNodes[7].style.width = innerWidth + "px";

      element.childNodes[6].style.height = innerHeight + "px";
      element.childNodes[7].style.height = innerHeight + "px";
      element.childNodes[8].style.height = innerHeight + "px";

      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        // Internet Explorer as of version 6 or version 7 in quirks mode
        // have rounding issues when working with odd dimensions:
        // right and bottom positioned elements are rendered with a
        // one pixel negative offset which results into some ugly
        // render effects. We use the margin to correct this here
        // as all other options conflict with styles applied by the
        // the decoration class.
        if (qx.bom.client.Engine.VERSION < 7 ||
          (qx.bom.client.Feature.QUIRKS_MODE && qx.bom.client.Engine.VERSION < 8))
        {
          if (width%2==1)
          {
            element.childNodes[2].style.marginRight = "-1px";
            element.childNodes[5].style.marginRight = "-1px";
            element.childNodes[8].style.marginRight = "-1px";
          }
          else
          {
            element.childNodes[2].style.marginRight = "0px";
            element.childNodes[5].style.marginRight = "0px";
            element.childNodes[8].style.marginRight = "0px";
          }

          if (height%2==1)
          {
            element.childNodes[3].style.marginBottom = "-1px";
            element.childNodes[4].style.marginBottom = "-1px";
            element.childNodes[5].style.marginBottom = "-1px";
          }
          else
          {
            element.childNodes[3].style.marginBottom = "0px";
            element.childNodes[4].style.marginBottom = "0px";
            element.childNodes[5].style.marginBottom = "0px";
          }
        }
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
          tl : prefix + "-tl" + ext,
          t : prefix + "-t" + ext,
          tr : prefix + "-tr" + ext,

          bl : prefix + "-bl" + ext,
          b : prefix + "-b" + ext,
          br : prefix + "-br" + ext,

          l : prefix + "-l" + ext,
          c : prefix + "-c" + ext,
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
    this._disposeFields("__markup", "__images", "__edges", "__insets");
  }
});
