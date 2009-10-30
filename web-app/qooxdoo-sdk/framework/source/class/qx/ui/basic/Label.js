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
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * The label class brings typical text content to the widget system.
 *
 * It supports simple text nodes and complex HTML (rich). The default
 * content mode is for text only. The mode is changeable through the property
 * {@link #rich}.
 *
 * The label supports heightForWidth when used in HTML mode. This means
 * that multi line HTML automatically computes the correct preferred height.
 *
 * *Example*
 *
 * Here is a little example of how to use the widget.
 *
 * <pre class='javascript'>
 *   // a simple text label without wrapping and markup support
 *   var label1 = new qx.ui.basic.Label("Simple text label");
 *   this.getRoot().add(label1, {left:20, top:10});
 *
 *   // a HTML label with automatic line wrapping
 *   var label2 = new qx.ui.basic.Label().set({
 *     value: "A <b>long label</b> text with auto-wrapping. This also may contain <b style='color:red'>rich HTML</b> markup.",
 *     rich : true,
 *     width: 120
 *   });
 *   this.getRoot().add(label2, {left:20, top:50});
 * </pre>
 *
 * The first label in this example is a basic text only label. As such no
 * automatic wrapping is supported. The second label is a long label containing
 * HTML markup with automatic line wrapping.
 *
 * *External Documentation*
 *
 * <a href='http://qooxdoo.org/documentation/0.8/widget/Label' target='_blank'>
 * Documentation of this widget in the qooxdoo wiki.</a>
 */
qx.Class.define("qx.ui.basic.Label",
{
  extend : qx.ui.core.Widget,
  implement : [qx.ui.form.IStringForm],



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param value {String} Text or HTML content to use
   */
  construct : function(value)
  {
    this.base(arguments);

    if (value != null) {
      this.setValue(value);
    }

    if (qx.core.Variant.isSet("qx.dynlocale", "on")) {
      qx.locale.Manager.getInstance().addListener("changeLocale", this._onChangeLocale, this);
    }
  },




  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */
  events : {
    /**
     * The old content change event. Please use the value property instead.
     * @deprecated
     */
    "changeContent" : "qx.event.type.Data"
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /**
     * Switches between rich HTML and text content. The text mode (<code>false</code>) supports
     * advanced features like ellipsis when the available space is not
     * enough. HTML mode (<code>true</code>) supports multi-line content and all the
     * markup features of HTML content.
     */
    rich :
    {
      check : "Boolean",
      init : false,
      event : "changeRich",
      apply : "_applyRich"
    },


    /**
     * Contains the HTML or text content. Interpretation depends on the value
     * of {@link #rich}. In text mode entities and other HTML special content
     * is not supported. But it is possible to use unicode escape sequences
     * to insert symbols and other non ASCII characters.
     */
    value :
    {
      check : "String",
      apply : "_applyValue",
      event : "changeValue",
      nullable : true
    },


    /**
     * The buddy property can be used to connect the label to another widget.
     * That causes two things:
     * <ul>
     *   <li>The label will always take the same enabled state as the buddy
     *       widget.
     *   </li>
     *   <li>A click on the label will focus the buddy widget.
     *   </li>
     * </ul>
     * This is the behavior of the for attribute of HTML:
     * http://www.w3.org/TR/html401/interact/forms.html#adef-for
     */
    buddy :
    {
      check : "qx.ui.core.Widget",
      apply : "_applyBuddy",
      nullable : true,
      init : null
    },


    /** Control the text alignment */
    textAlign :
    {
      check : ["left", "center", "right"],
      nullable : true,
      themeable : true,
      apply : "_applyTextAlign",
      event : "changeTextAlign"
    },


    // overridden
    appearance :
    {
      refine: true,
      init: "label"
    },


    // overridden
    selectable :
    {
      refine : true,
      init : false
    },


    // overridden
    allowGrowX :
    {
      refine : true,
      init : false
    },


    // overridden
    allowGrowY :
    {
      refine : true,
      init : false
    },

    // overridden
    allowShrinkY :
    {
      refine : true,
      init : false
    }
  },





  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __font : null,
    __invalidContentSize : null,
    __buddyEnabledBinding : null,
    __clickListenerId : null,



    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    _getContentHint : function()
    {
      if (this.__invalidContentSize)
      {
        this.__contentSize = this.__computeContentSize();
        delete this.__invalidContentSize;
      }

      return {
        width : this.__contentSize.width,
        height : this.__contentSize.height
      };
    },


    // overridden
    _hasHeightForWidth : function() {
      return this.getRich();
    },


    // overridden
    _applySelectable : function(value)
    {
      this.base(arguments, value);

      /*
       * We have to set the value to "text" in Webkit for the container and
       * content element
       */
      if (qx.core.Variant.isSet("qx.client", "webkit"))
      {
        this.getContainerElement().setStyle("userSelect", value ? "text" : "none");
        this.getContentElement().setStyle("userSelect", value ? "text" : "none");
      }
    },


    // overridden
    _getContentHeightForWidth : function(width)
    {
      if (!this.getRich()) {
        return null;
      }
      return this.__computeContentSize(width).height;
    },


    // overridden
    _createContentElement : function() {
      return new qx.html.Label;
    },


    // property apply
    _applyTextAlign : function(value, old) {
      this.getContentElement().setStyle("textAlign", value);
    },


    // overridden
    _applyTextColor : function(value, old)
    {
      if (value) {
        this.getContentElement().setStyle("color", qx.theme.manager.Color.getInstance().resolve(value));
      } else {
        this.getContentElement().removeStyle("color");
      }
    },




    /*
    ---------------------------------------------------------------------------
      LABEL ADDONS
    ---------------------------------------------------------------------------
    */

    /** {Map} Internal fallback of label size when no font is defined */
    __contentSize :
    {
      width : 0,
      height : 0
    },


    // property apply
    _applyFont : function(value, old)
    {
      // Apply
      var styles;
      if (value)
      {
        this.__font = qx.theme.manager.Font.getInstance().resolve(value);
        styles = this.__font.getStyles();
      }
      else
      {
        this.__font = null;
        styles = qx.bom.Font.getDefaultStyles();
      }

      this.getContentElement().setStyles(styles);

      // Invalidate text size
      this.__invalidContentSize = true;

      // Update layout
      qx.ui.core.queue.Layout.add(this);
    },


    /**
     * Internal utility to compute the content dimensions.
     *
     * @param width {Integer?null} Optional width constraint
     * @return {void}
     */
    __computeContentSize : function(width)
    {
      var Label = qx.bom.Label;
      var font = this.getFont();

      var styles = font ? this.__font.getStyles() : qx.bom.Font.getDefaultStyles();
      var content = this.getValue() || "A";
      var rich = this.getRich();

      return rich ?
        Label.getHtmlSize(content, styles, width) :
        Label.getTextSize(content, styles);
    },




    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLIER
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyBuddy : function(value, old)
    {
      if (old != null)
      {
        old.removeBinding(this.__buddyEnabledBinding);
        this.__buddyEnabledBinding = null;
        this.removeListenerById(this.__clickListenerId);
        this.__clickListenerId = null;
      }

      if (value != null)
      {
        this.__buddyEnabledBinding = value.bind("enabled", this, "enabled");
        this.__clickListenerId = this.addListener("click", value.focus, value);
      }
    },


    // property apply
    _applyRich : function(value)
    {
      // Sync with content element
      this.getContentElement().setRich(value);

      // Mark text size cache as invalid
      this.__invalidContentSize = true;

      // Update layout
      qx.ui.core.queue.Layout.add(this);
    },


    /**
     * Locale change event handler
     *
     * @signature function(e)
     * @param e {Event} the change event
     */
    _onChangeLocale : qx.core.Variant.select("qx.dynlocale",
    {
      "on" : function(e)
      {
        var content = this.getValue();
        if (content && content.translate) {
          this.setValue(content.translate());
        }
      },

      "off" : null
    }),


    // property apply
    _applyValue : function(value, old)
    {
      // Sync with content element
      this.getContentElement().setContent(value);

      // Mark text size cache as invalid
      this.__invalidContentSize = true;

      // Update layout
      qx.ui.core.queue.Layout.add(this);

      this.fireDataEvent("changeContent", value, old);
    },




    /*
    ---------------------------------------------------------------------------
      DEPRECATED STUFF
    ---------------------------------------------------------------------------
    */
    /**
     * Old set method for the content property. Please use the value
     * property instead.
     *
     * @param value {String} The value of the label.
     * @deprecated
     */
    setContent: function(value)
    {
      qx.log.Logger.deprecatedMethodWarning(
        arguments.callee, "Please use the value property instead."
      );

      this.setValue(value);
    },


    /**
     * Old get method for the content property. Please use the value
     * property instead.
     *
     * @deprecated
     */
    getContent: function()
    {
      qx.log.Logger.deprecatedMethodWarning(
        arguments.callee, "Please use the value property instead."
      );

      return this.getValue();
    },


    /**
     * Old reset method for the content property. Please use the value
     * property instead.
     *
     * @deprecated
     */
    resetContent: function()
    {
      qx.log.Logger.deprecatedMethodWarning(
        arguments.callee, "Please use the value property instead."
      );

      this.resetValue();
    },


    // overridden
    addListener: function(type, listener, self, capture) {
      if (type == "changeContent") {
        qx.log.Logger.deprecatedEventWarning(
          arguments.callee,
          "changeContent",
          "Please use the changeValue event instead."
        );
      }
      return this.base(arguments, type, listener, self, capture);
    }


  },



  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    if (qx.core.Variant.isSet("qx.dynlocale", "on")) {
      qx.locale.Manager.getInstance().removeListener("changeLocale", this._onChangeLocale, this);
    }

    // remove the binding
    if (this.__buddyEnabledBinding != null) {
      var buddy = this.getBuddy();
      if (buddy != null && !buddy.isDisposed()) {
        buddy.removeBinding(this.__buddyEnabledBinding);
      }
    }

    this._disposeFields("__font", "__buddyEnabledBinding");
  }
});
