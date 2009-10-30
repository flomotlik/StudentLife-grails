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
     * Andreas Ecker (ecker)

************************************************************************ */

/* ************************************************************************

#asset(qx/static/blank.gif)

************************************************************************ */

qx.Class.define("qx.legacy.ui.embed.IconHtmlEmbed",
{
  extend : qx.legacy.ui.embed.HtmlEmbed,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(vHtml, vIcon, vIconWidth, vIconHeight)
  {
    this.base(arguments, vHtml);

    if (vIcon != null) {
      this.setIcon(vIcon);
    }

    if (vIconWidth != null) {
      this.setIconWidth(vIconWidth);
    }

    if (vIconHeight != null) {
      this.setIconHeight(vIconHeight);
    }
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTIES
    ---------------------------------------------------------------------------
    */

    /** Any URI String supported by qx.legacy.ui.basic.Image to display a icon */
    icon :
    {
      check : "String",
      init : "",
      apply : "_applyHtml"
    },


    /**
     * The width of the icon.
     *  If configured, this makes qx.legacy.ui.embed.IconHtmlEmbed a little bit faster as it does not need to wait until the image loading is finished.
     */
    iconWidth :
    {
      check : "Number",
      init : 0,
      apply : "_applyHtml"
    },


    /**
     * The height of the icon
     *  If configured, this makes qx.legacy.ui.embed.IconHtmlEmbed a little bit faster as it does not need to wait until the image loading is finished.
     */
    iconHeight :
    {
      check : "Integer",
      init : 0,
      apply : "_applyHtml"
    },


    /** Space in pixels between the icon and the HTML. */
    spacing :
    {
      check : "Number",
      init : 4,
      apply : "_applyHtml"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      UTILITIES
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @return {void}
     */
    _syncHtml : function()
    {
      var vHtml = [];
      var vIsPng = /\.png$/i.test(this.getIcon());
      var vSource;

      if (qx.legacy.util.Validation.isValidString(this.getIcon()))
      {
        vHtml.push("<img src=\"");

        if (qx.core.Variant.isSet("qx.client", "mshtml") && vIsPng) {
          vSource = "static/image/blank.gif";
        } else {
          vSource = this.getIcon();
        }

        vHtml.push(qx.util.ResourceManager.getInstance().toUri(qx.legacy.util.AliasManager.getInstance().resolve(vSource)));

        vHtml.push("\" style=\"vertical-align:middle;");

        if (this.getSpacing() != null)
        {
          vHtml.push("margin-right:");
          vHtml.push(this.getSpacing());
          vHtml.push("px;");
        }

        if (this.getIconWidth() != null)
        {
          vHtml.push("width:");
          vHtml.push(this.getIconWidth());
          vHtml.push("px;");
        }

        if (this.getIconHeight() != null)
        {
          vHtml.push("height:");
          vHtml.push(this.getIconHeight());
          vHtml.push("px;");
        }

        if (qx.core.Variant.isSet("qx.client", "mshtml"))
        {
          if (vIsPng)
          {
            vHtml.push("filter:");
            vHtml.push("progid:DXImageTransform.Microsoft.AlphaImageLoader(src='");
            vHtml.push(qx.util.ResourceManager.getInstance().toUri(qx.legacy.util.AliasManager.getInstance().resolve(this.getIcon())));
            vHtml.push("',sizingMethod='scale')");
            vHtml.push(";");
          }
        }

        vHtml.push("\"/>");
      }

      if (qx.legacy.util.Validation.isValidString(this.getHtml())) {
        vHtml.push(this.getHtml());
      }

      this.getElement().innerHTML = vHtml.join("");
    }
  }
});
