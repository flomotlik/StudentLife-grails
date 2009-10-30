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
     * Til Schneider (til132)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * Container widget for internal frames (iframes).
 * An iframe can display any HTML page inside the widget.
 *
 * *Example*
 *
 * Here is a little example of how to use the widget.
 *
 * <pre class='javascript'>
 * var document = this.getRoot();
 * var iframe = new qx.ui.embed.Iframe("http://www.qooxdoo.org");
 * document.add(iframe);
 * </pre>
 *
 *
 * *External Documentation*
 *
 * <a href='http://qooxdoo.org/documentation/0.8/widget/iframe' target='_blank'>
 * Documentation of this widget in the qooxdoo wiki.</a>
 */
qx.Class.define("qx.ui.embed.Iframe",
{
  extend : qx.ui.embed.AbstractIframe,
  include : qx.ui.core.MNativeOverflow,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param source {String} URL which should initally set.
   */
  construct : function(source)
  {
    if (source != null) {
      this.__source = source;
    }

    this.base(arguments, source);

    qx.event.Registration.addListener(document.body, "mousedown", this.block, this, true);
    qx.event.Registration.addListener(document.body, "mouseup", this.release, this, true);
    qx.event.Registration.addListener(document.body, "losecapture", this.release, this, true);

    this.__blockerElement = this._createBlockerElement();
    this.getContainerElement().add(this.__blockerElement);
  },


  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "iframe"
    },


    /**
     * Whether to show the frame's native context menu.
     *
     * Note: This only works if the iframe source is served from the same domain
     * as the main application.
     */
    nativeContextMenu :
    {
      refine: true,
      init : false
    },


    /**
     * If the user presses F1 in IE by default the onhelp event is fired and
     * IE’s help window is opened. Setting this property to <code>false</code>
     * prevents this behavior.
     *
     * Note: This only works if the iframe source is served from the same domain
     * as the main application.
     */
    nativeHelp :
    {
      check : "Boolean",
      init : false,
      apply : "_applyNativeHelp"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __source : null,
    __blockerElement : null,


    // overridden
    renderLayout : function(left, top, width, height)
    {
      this.base(arguments, left, top, width, height);

      var pixel = "px";
      var insets = this.getInsets();

      this.__blockerElement.setStyle("left", insets.left + pixel);
      this.__blockerElement.setStyle("top", insets.top + pixel);
      this.__blockerElement.setStyle("width", (width - insets.left - insets.right) + pixel);
      this.__blockerElement.setStyle("height", (height - insets.top - insets.bottom) + pixel);
    },


    // overridden
    _createContentElement : function()
    {
      var iframe = new qx.html.Iframe(this.__source);
      iframe.addListener("load", this._onIframeLoad, this);
      return iframe;
    },


    // overridden
    _getIframeElement : function() {
      return this.getContentElement();
    },


    /**
     * Creates <div> element which is aligned over iframe node to avoid losing mouse events.
     *
     * @return {Object} Blocker element node
     */
    _createBlockerElement : function()
    {
      var el = new qx.html.Element("div");

      el.setStyle("zIndex", 20);
      el.setStyle("position", "absolute");
      el.setStyle("display", "none");

      // IE needs some extra love here to convince it to block events.
      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        el.setStyles({
          backgroundImage: "url(" + qx.util.ResourceManager.getInstance().toUri("qx/static/blank.gif") + ")",
          backgroundRepeat: "repeat"
        });
      }

      return el;
    },


    /**
     * Reacts on native load event and redirects it to the widget.
     *
     * @param e {qx.event.type.Event} Native load event
     */
    _onIframeLoad : function(e)
    {
      this._applyNativeContextMenu(this.getNativeContextMenu(), null);
      this._applyNativeHelp(this.getNativeHelp(), null);

      this.fireNonBubblingEvent("load");
    },




    /*
    ---------------------------------------------------------------------------
      METHODS
    ---------------------------------------------------------------------------
    */

    /**
     * Cover the iframe with a transparent blocker div element. This prevents
     * mouse or key events to be handled by the iframe. To release the blocker
     * use {@link #release}.
     *
     */
    block : function() {
      this.__blockerElement.setStyle("display", "block");
    },


    /**
     * Release the blocker set by {@link #block}.
     *
     */
    release : function() {
      this.__blockerElement.setStyle("display", "none");
    },


    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyNativeContextMenu : function(value, old)
    {
      if (value !== false && old !== false) {
        return;
      }

      var doc = this.getDocument();
      if (!doc) {
        return;
      }

      try {
        var documentElement = doc.documentElement
      } catch(e) {
        // this may fail due to security restrictions
        return;
      }

      if (old === false)
      {
        qx.event.Registration.removeListener(
          documentElement, "contextmenu",
          this._onNativeContextMenu, this, true
        );
      }

      if (value === false)
      {
        qx.event.Registration.addListener(
          documentElement, "contextmenu",
          this._onNativeContextMenu, this, true
        );
      }
    },


    /**
     * Stops the <code>contextmenu</code> event from showing the native context menu
     *
     * @param e {qx.event.type.Mouse} The event object
     */
    _onNativeContextMenu : function(e) {
      e.preventDefault();
    },


    // property apply
    _applyNativeHelp : qx.core.Variant.select("qx.client",
    {
      "mshtml" : function(value, old)
      {
        var document = this.getDocument();
        if (!document) {
          return;
        }

        try
        {
          if (old === false) {
            qx.bom.Event.removeNativeListener(document, "help", qx.lang.Function.returnFalse);
          }

          if (value === false) {
            qx.bom.Event.addNativeListener(document, "help", qx.lang.Function.returnFalse);
          }
        } catch (e) {
          // this may fail due to security restrictions
        };
      },

      "default" : function() {}
    })
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._disposeObjects("__blockerElement");

    qx.event.Registration.removeListener(document.body, "mousedown", this.block, this, true);
    qx.event.Registration.removeListener(document.body, "mouseup", this.release, this, true);
    qx.event.Registration.removeListener(document.body, "losecapture", this.release, this, true);
  }
});
