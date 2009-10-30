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
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * A toggle Button widget
 *
 * If the user presses the button by clicking on it pressing the enter or
 * space key, the button toggles between the pressed an not pressed states.
 * There is no execute event, only a {@link qx.ui.form.ToggleButton#change}
 * event.
 */
qx.Class.define("qx.ui.form.ToggleButton",
{
  extend : qx.ui.basic.Atom,
  include : [
    qx.ui.form.MFormElement,
    qx.ui.core.MExecutable
  ],
  implement : [
    qx.ui.form.IFormElement,
    qx.ui.form.IBooleanForm,
    qx.ui.form.IExecutable
  ],



  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Creates a ToggleButton.
   *
   * @param label {String} The text on the button.
   * @param icon {String} An URI to the icon of the button.
   */
  construct : function(label, icon)
  {
    this.base(arguments, label, icon);

    // register mouse events
    this.addListener("mouseover", this._onMouseOver);
    this.addListener("mouseout", this._onMouseOut);
    this.addListener("mousedown", this._onMouseDown);
    this.addListener("mouseup", this._onMouseUp);

    // register keyboard events
    this.addListener("keydown", this._onKeyDown);
    this.addListener("keyup", this._onKeyUp);
  },



  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */
  events : {
    /**
     * The old checked change event. Please use the value property instead.
     * @deprecated
     */
    "changeChecked" : "qx.event.type.Data"
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties:
  {
    // overridden
    appearance:
    {
      refine: true,
      init: "button"
    },

    // overridden
    focusable :
    {
      refine : true,
      init : true
    },

    /** The value of the widget. True, if the widget is checked. */
    value :
    {
      // TODO change the check to Boolean after the deprecation has been removed
      check : "function(value) {return qx.lang.Type.isString(value) || qx.lang.Type.isBoolean(value)}",
      nullable : true,
      event : "changeValue",
      apply : "_applyValue",
      init: false
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Changes the state of the button dependent on the checked value.
     *
     * @param value {Boolean} Current value
     * @param old {Boolean} Previous value
     */
    _applyValue : function(value, old) {
      if (qx.lang.Type.isString(value)) {
        qx.log.Logger.deprecatedMethodWarning(
          arguments.callee, "Please use boolean values instead."
        );
        return;
      }

      value ? this.addState("checked") : this.removeState("checked");

      // @deprecated
      this.fireDataEvent("changeChecked", value, old);
    },


    /**
     * Listener method for "mouseover" event.
     * <ul>
     * <li>Adds state "hovered"</li>
     * <li>Removes "abandoned" and adds "pressed" state (if "abandoned" state is set)</li>
     * </ul>
     *
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onMouseOver : function(e)
    {
      if (e.getTarget() !== this) {
        return;
      }

      this.addState("hovered");

      if (this.hasState("abandoned"))
      {
        this.removeState("abandoned");
        this.addState("pressed");
      }
    },


    /**
     * Listener method for "mouseout" event.
     * <ul>
     * <li>Removes "hovered" state</li>
     * <li>Adds "abandoned" state (if "pressed" state is set)</li>
     * <li>Removes "pressed" state (if "pressed" state is set and button is not checked)
     * </ul>
     *
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onMouseOut : function(e)
    {
      if (e.getTarget() !== this) {
        return;
      }

      this.removeState("hovered");

      if (this.hasState("pressed"))
      {
        if (!this.getValue()) {
          this.removeState("pressed");
        }

        this.addState("abandoned");
      }
    },


    /**
     * Listener method for "mousedown" event.
     * <ul>
     * <li>Activates capturing</li>
     * <li>Removes "abandoned" state</li>
     * <li>Adds "pressed" state</li>
     * </ul>
     *
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onMouseDown : function(e)
    {
      if (!e.isLeftPressed()) {
        return;
      }

      // Activate capturing if the button get a mouseout while
      // the button is pressed.
      this.capture();

      this.removeState("abandoned");
      this.addState("pressed");
      e.stopPropagation();
    },


    /**
     * Listener method for "mouseup" event.
     * <ul>
     * <li>Releases capturing</li>
     * <li>Removes "pressed" state (if not "abandoned" state is set and "pressed" state is set)</li>
     * <li>Removes "abandoned" state (if set)</li>
     * <li>Toggles {@link #value} (if state "abandoned" is not set and state "pressed" is set)</li>
     * </ul>
     *
     * @param e {Event} Mouse event
     * @return {void}
     */
    _onMouseUp : function(e)
    {
      this.releaseCapture();

      if (this.hasState("abandoned")) {
        this.removeState("abandoned");
      } else if (this.hasState("pressed")) {
        this.setValue(!this.getValue());
      }

      this.removeState("pressed");
      e.stopPropagation();
    },


    /**
     * Listener method for "keydown" event.<br/>
     * Removes "abandoned" and adds "pressed" state
     * for the keys "Enter" or "Space"
     *
     * @param e {Event} Key event
     * @return {void}
     */
    _onKeyDown : function(e)
    {
      switch(e.getKeyIdentifier())
      {
        case "Enter":
        case "Space":
          this.removeState("abandoned");
          this.addState("pressed");

          e.stopPropagation();
      }
    },


    /**
     * Listener method for "keyup" event.<br/>
     * Removes "abandoned" and "pressed" state (if "pressed" state is set)
     * for the keys "Enter" or "Space". It also toggles the {@link #value} property.
     *
     * @param e {Event} Key event
     * @return {void}
     */
    _onKeyUp : function(e)
    {
      if (!this.hasState("pressed")) {
        return;
      }

      switch(e.getKeyIdentifier())
      {
        case "Enter":
        case "Space":
          this.removeState("abandoned");
          this.setValue(!this.getValue());

          this.removeState("pressed");
          e.stopPropagation();
      }
    },



    /*
    ---------------------------------------------------------------------------
      DEPRECATED STUFF
    ---------------------------------------------------------------------------
    */
    /**
     * Old set method for the checked property. Please use the value
     * property instead.
     *
     * @param value {String} The value of the label.
     * @deprecated
     */
    setChecked: function(value) {
      qx.log.Logger.deprecatedMethodWarning(
        arguments.callee, "Please use the value property instead."
      );

      this.setValue(value);
    },


    /**
     * Old is method for the checked property. Please use the value property
     * instead.
     *
     * @deprecated
     */
    isChecked: function() {
      qx.log.Logger.deprecatedMethodWarning(
        arguments.callee, "Please use the value property instead."
      );

      return this.getValue();
    },


    /**
     * Old toggle method for the checked property. Please use the value property
     * instead.
     *
     * @deprecated
     */
    toggleChecked: function() {
      qx.log.Logger.deprecatedMethodWarning(
        arguments.callee, "Please use the value property instead."
      );

      this.setValue(!this.getValue());
    },


    /**
     * Old get method for the checked property. Please use the value
     * property instead.
     *
     * @deprecated
     */
    getChecked: function() {
      qx.log.Logger.deprecatedMethodWarning(
        arguments.callee, "Please use the value property instead."
      );

      return this.getValue();
    },


    /**
     * Old reset method for the checked property. Please use the value
     * property instead.
     *
     * @deprecated
     */
    resetChecked: function() {
      qx.log.Logger.deprecatedMethodWarning(
        arguments.callee, "Please use the value property instead."
      );

      this.resetValue();
    },


    // overridden
    addListener: function(type, listener, self, capture) {
      if (type == "changeChecked") {
        qx.log.Logger.deprecatedEventWarning(
          arguments.callee,
          "changeChecked",
          "Please use the changeValue event instead."
        );
      }
      return this.base(arguments, type, listener, self, capture);
    },


    // TODO can be removed when the check of the value property is set to Boolean
    /**
     * Toggles the state of the button.
     */
    toggleValue: function() {
      this.setValue(!this.getValue());
    },

    // TODO can be removed when the check of the value property is set to Boolean
    /**
     * Returns if the value is true
     *
     * @return {Boolean} True, if the button is checked.
     */
    isValue: function() {
      return this.getValue();
    }
  }
});
