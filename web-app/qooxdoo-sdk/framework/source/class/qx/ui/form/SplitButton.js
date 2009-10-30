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

/**
 * A button which acts as a normal button and shows a menu on one
 * of the sides to open something like a history list.
 */
qx.Class.define("qx.ui.form.SplitButton",
{
  extend : qx.ui.core.Widget,
  include : [qx.ui.core.MExecutable, qx.ui.form.MFormElement],
  implement : [qx.ui.form.IFormElement, qx.ui.form.IExecutable],



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param label {String} Label to use
   * @param icon {String?null} Icon to use
   * @param menu {qx.ui.menu.Menu} Connect to menu instance
   * @param command {qx.event.Command} Command instance to connect with
   */
  construct : function(label, icon, menu, command)
  {
    this.base(arguments);

    this._setLayout(new qx.ui.layout.HBox);

    // Force arrow creation
    this._createChildControl("arrow");

    // Add mouse listeners
    this.addListener("mouseover", this._onMouseOver, this, true);
    this.addListener("mouseout", this._onMouseOut, this, true);

    // Add key listeners
    this.addListener("keydown", this._onKeyDown);
    this.addListener("keyup", this._onKeyUp);

    // Process incoming arguments
    if (label != null) {
      this.setLabel(label);
    }

    if (icon != null) {
      this.setIcon(icon);
    }

    if (menu != null) {
      this.setMenu(menu);
    }

    if (command != null) {
      this.setCommand(command);
    }
  },




  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */
  events : {
    /**
     * The old value change event.
     * @deprecated
     */
    "changeValue" : "qx.event.type.Data"
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    // overridden
    appearance :
    {
      refine : true,
      init : "splitbutton"
    },

    // overridden
    focusable :
    {
      refine : true,
      init : true
    },


    /** The label/caption/text of the qx.ui.basic.Atom instance */
    label :
    {
      apply : "_applyLabel",
      nullable : true,
      dispose : true,
      check : "String"
    },


    /** Any URI String supported by qx.ui.basic.Image to display a icon */
    icon :
    {
      check : "String",
      apply : "_applyIcon",
      nullable : true,
      themeable : true
    },


    /**
     * Configure the visibility of the sub elements/widgets.
     * Possible values: both, text, icon
     */
    show :
    {
      init : "both",
      check : [ "both", "label", "icon" ],
      themeable : true,
      inheritable : true,
      apply : "_applyShow",
      event : "changeShow"
    },


    /** The menu instance to show when clicking on the button */
    menu :
    {
      check : "qx.ui.menu.Menu",
      nullable : true,
      apply : "_applyMenu",
      event : "changeMenu"
    }
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __cursorIsOut : null,


    /*
    ---------------------------------------------------------------------------
      WIDGET API
    ---------------------------------------------------------------------------
    */

    // overridden
    _createChildControlImpl : function(id)
    {
      var control;

      switch(id)
      {
        case "button":
          control = new qx.ui.form.Button;
          control.addListener("execute", this._onButtonExecute, this);
          control.setFocusable(false);
          this._addAt(control, 0, {flex: 1});
          break;

        case "arrow":
          control = new qx.ui.form.MenuButton;
          control.setFocusable(false);
          this._addAt(control, 1);
          break;
      }

      return control || this.base(arguments, id);
    },

    // overridden
    /**
     * @lint ignoreReferenceField(_forwardStates)
     */
    _forwardStates :
    {
      hovered : 1,
      focused : 1
    },




    /*
    ---------------------------------------------------------------------------
      PROPERTY APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    // property apply
    _applyLabel : function(value, old)
    {
      var button = this.getChildControl("button");
      value == null ? button.resetLabel() : button.setLabel(value);
    },

    // property apply
    _applyIcon : function(value, old)
    {
      var button = this.getChildControl("button");
      value == null ? button.resetIcon() : button.setIcon(value);
    },

    // property apply
    _applyMenu : function(value, old)
    {
      var arrow = this.getChildControl("arrow");

      if (value)
      {
        arrow.resetEnabled();
        arrow.setMenu(value);
        value.setOpener(this);

        value.addListener("changeVisibility", this._onChangeMenuVisibility, this);
      }
      else
      {
        arrow.setEnabled(false);
        arrow.resetMenu();
      }

      if (old)
      {
        old.removeListener("changeVisibility", this._onChangeMenuVisibility, this);
        old.resetOpener();
      }
    },

    // property apply
    _applyShow : function(value, old) {
      // pass: is already inherited to the button
    },



    /*
    ---------------------------------------------------------------------------
      EVENT LISTENERS
    ---------------------------------------------------------------------------
    */

    /**
     * Listener for <code>mouseover</code> event
     *
     * @param e {qx.event.type.Mouse} mouseover event
     */
    _onMouseOver : function(e)
    {
      // Captured listener
      // Whole stop for event, do not let the
      // inner buttons know about this event.
      e.stopPropagation();

      // Add hover state, is forwarded to the buttons
      this.addState("hovered");

      // Delete cursor out flag
      delete this.__cursorIsOut;
    },


    /**
     * Listener for <code>mouseout</code> event
     *
     * @param e {qx.event.type.Mouse} mouseout event
     */
    _onMouseOut : function(e)
    {
      // Captured listener
      // Whole stop for event, do not let the
      // inner buttons know about this event.
      e.stopPropagation();

      // First simple state check
      if (!this.hasState("hovered")) {
        return;
      }

      // Only when the related target is not part of the button
      var related = e.getRelatedTarget();
      if (qx.ui.core.Widget.contains(this, related)) {
        return;
      }

      // When the menu is visible (cursor moved to the menu)
      // keep the hover state on the whole button
      var menu = this.getMenu();
      if (menu && menu.isVisible())
      {
        this.__cursorIsOut = true;
        return;
      }

      // Finally remove state
      this.removeState("hovered");
    },


    /**
     * Event listener for all keyboard events
     *
     * @param e {qx.event.type.KeySequence} Event object
     */
    _onKeyDown : function(e)
    {
      var button = this.getChildControl("button");
      switch(e.getKeyIdentifier())
      {
        case "Enter":
        case "Space":
          button.removeState("abandoned");
          button.addState("pressed");
      }
    },


    /**
     * Event listener for all keyboard events
     *
     * @param e {qx.event.type.KeySequence} Event object
     */
    _onKeyUp : function(e)
    {
      var button = this.getChildControl("button");
      switch(e.getKeyIdentifier())
      {
        case "Enter":
        case "Space":
          if (button.hasState("pressed"))
          {
            button.removeState("abandoned");
            button.removeState("pressed");
            button.execute();
          }
      }
    },


    /**
     * Event listener for button's execute event.
     *
     * @param e {qx.event.type.Event} execute event of the button
     */
    _onButtonExecute : function(e)
    {
      // forward execute event
      this.execute();
    },


    /**
     * Event listener for visibility changes of the menu
     *
     * @param e {qx.event.type.Data} property change event
     */
    _onChangeMenuVisibility : function(e)
    {
      if (!this.getMenu().isVisible() && this.__cursorIsOut) {
        this.removeState("hovered");
      }
    },



    /*
    ---------------------------------------------------------------------------
      DEPRECATED STUFF
    ---------------------------------------------------------------------------
    */
    __value : null,


    /**
     * Old set method for the value property.
     *
     * @param value {String} The value of the label.
     * @deprecated
     */
    setValue: function(value) {
      qx.log.Logger.deprecatedMethodWarning(arguments.callee);

      var oldValue = this.__value;
      this.__value = value;
      this.fireDataEvent("changeValue", value, oldValue);
    },


    /**
     * Old get method for the value property.
     *
     * @deprecated
     */
    getValue: function() {
      qx.log.Logger.deprecatedMethodWarning(arguments.callee);

      return this.__value;
    },


    /**
     * Old reset method for the value property.
     *
     * @deprecated
     */
    resetValue: function() {
      qx.log.Logger.deprecatedMethodWarning(arguments.callee);

      this.__value = null;
    },


    // overridden
    addListener: function(type, listener, self, capture) {
      if (type == "changeValue") {
        qx.log.Logger.deprecatedEventWarning(
          arguments.callee,
          "changeValue",
          "The value property will be removed."
        );
      }
      return this.base(arguments, type, listener, self, capture);
    }
  }
});
