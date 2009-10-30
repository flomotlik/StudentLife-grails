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
 * @appearance list-item
 */
qx.Class.define("qx.legacy.ui.form.ListItem",
{
  extend : qx.legacy.ui.basic.Atom,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(vText, vIcon, vValue)
  {
    this.base(arguments, vText, vIcon);
    this.setValue(vValue || null);

    this.addListener("dblclick", this._ondblclick);

    // Initialize properties
    // Hint: width is already initialized in Atom
    this.initMinWidth();
  },




  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events: {
    /** (Fired by {@link qx.legacy.ui.form.List}) */
    "action" : "qx.event.type.Event"
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    appearance :
    {
      refine : true,
      init : "list-item"
    },

    minWidth :
    {
      refine : true,
      init : "auto"
    },

    width :
    {
      refine : true,
      init : null
    },

    allowStretchX :
    {
      refine : true,
      init : true
    },

    /** Fires a "changeValue" (qx.event.type.Data) event */
    value :
    {
      check : "String",
      nullable : true,
      event : "changeValue"
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
      STATE
    ---------------------------------------------------------------------------
    */

    /**
     * Sets/removes the styleProperties "MozOutline" and "outline" whether the
     * item has the state "lead" or not
     *
     * @return {void}
     */
    handleStateChange : function()
    {
      if (this.hasState("lead"))
      {
        this.setStyleProperty("outline", "1px dotted");
      }
      else
      {
        this.setStyleProperty("outline", "0px none");
      }
    },

    // Remove default outline focus border
    /**
     * Remove default outline focus border - currently not implemented
     *
     * @param vStates {var} states
     * @return {void}
     */
    _applyStateStyleFocus : function(vStates) {},




    /*
    ---------------------------------------------------------------------------
      UTILITIES
    ---------------------------------------------------------------------------
    */

    /**
     * Execute by the "_findItem" method at {@link qx.legacy.ui.form.List} to perform
     * a string search
     *
     * @param vText {String} String which should be matched with the ListItem's label
     * @return {Boolean} Match found
     */
    matchesString : function(vText)
    {
      vText = String(vText);
      return vText != "" && this.getLabel().toString().toLowerCase().indexOf(vText.toLowerCase()) == 0;
    },


    /**
     * Execute by the "_findItem" method at {@link qx.legacy.ui.form.List} to perform
     * an exact string search
     *
     * @param vText {String} String which should be matched exactly with the ListItem's label
     * @return {Boolean} Match found
     */
    matchesStringExact : function(vText)
    {
      vText = String(vText);
      return vText != "" && this.getLabel().toString().toLowerCase() == String(vText).toLowerCase();
    },


    /**
     * Execute by the "_findItem" method at {@link qx.legacy.ui.form.List} to perform
     * a value search
     *
     * @param vText {String} String which should be matched with the ListItem's value
     * @return {Boolean} Match found
     */
    matchesValue : function(vText)
    {
      vText = String(vText);
      return vText != "" && this.getValue().toLowerCase().indexOf(vText.toLowerCase()) == 0;
    },


    /**
     * Execute by the "_findItem" method at {@link qx.legacy.ui.form.List} to perform
     * an exact value search
     *
     * @param vText {String} String which should be matched exactly with the ListItem's value
     * @return {Boolean} Match found
     */
    matchesValueExact : function(vText)
    {
      vText = String(vText);
      return vText != "" && this.getValue().toLowerCase() == String(vText).toLowerCase();
    },




    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */

    /**
     * Callback method for the double-click event of the ListItem.<br/>
     * Executes an registered command - if available.
     *
     * @param e {qx.legacy.event.type.MouseEvent} double-click event
     * @return {void}
     */
    _ondblclick : function(e)
    {
      var vCommand = this.getCommand();

      if (vCommand) {
        vCommand.execute();
      }
    }
  }
});
