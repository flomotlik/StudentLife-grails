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
     * Martin Wittemann (martinwittemann)
     * Jonathan Weiß (jonathan_rass)
     * Christian Schmidt (chris_schmidt)

************************************************************************ */

/**
 * A tab view is a multi page view where only one page is visible
 * at each moment. It is possible to switch the pages using the
 * buttons rendered by each page.
 */
qx.Class.define("qx.ui.tabview.TabView",
{
  extend : qx.ui.core.Widget,
  implement : qx.ui.core.ISingleSelection,
  include : [qx.ui.core.MContentPadding],


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */


  /**
   * @param barPosition {String} Initial bar position ({@link #barPosition})
   */
  construct : function(barPosition)
  {
    this.base(arguments);

    this.__barPositionToState = {
      top : "barTop",
      right : "barRight",
      bottom : "barBottom",
      left : "barLeft"
    };

    this._createChildControl("bar");
    this._createChildControl("pane");

    // Create manager
    var mgr = this.__radioGroup = new qx.ui.form.RadioGroup;
    mgr.setWrap(false);
    mgr.addListener("changeSelection", this._onChangeSelection, this);

    // Initialize bar position
    if (barPosition != null) {
      this.setBarPosition(barPosition);
    } else {
      this.initBarPosition();
    }
  },


  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */


  events :
  {
    /**
     * Fires after the selection was modified
     * @deprecated Use 'changeSelection' instead!
     */
    "changeSelected" : "qx.event.type.Data",

    /** Fires after the selection was modified */
    "changeSelection" : "qx.event.type.Data"
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
      init : "tabview"
    },

    /**
     * This property defines on which side of the TabView the bar should be positioned.
     */
    barPosition :
    {
      check : ["left", "right", "top", "bottom"],
      init : "top",
      apply : "_applyBarPosition"
    }
  },


  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */


  members :
  {
    /** {qx.ui.form.RadioGroup} instance containing the radio group */
    __radioGroup : null,


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
        case "bar":
          control = new qx.ui.container.SlideBar();
          control.setZIndex(10);
          this._add(control);
          break;

        case "pane":
          control = new qx.ui.container.Stack;
          control.setZIndex(5);
          this._add(control, {flex:1});
          break;
      }

      return control || this.base(arguments, id);
    },

    /**
     * Returns the element, to which the content padding should be applied.
     *
     * @return {qx.ui.core.Widget} The content padding target.
     */
    _getContentPaddingTarget : function() {
      return this.getChildControl("pane");
    },


    /*
    ---------------------------------------------------------------------------
      CHILDREN HANDLING
    ---------------------------------------------------------------------------
    */


    /**
     * Adds a page to the tabview including its needed button
     * (contained in the page).
     *
     * @param page {qx.ui.tabview.Page} The page which should be added.
     */
    add : function(page)
    {
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        if (!(page instanceof qx.ui.tabview.Page)) {
          throw new Error("Incompatible child for TabView: " + page);
        }
      }

      var button = page.getButton();
      var bar = this.getChildControl("bar");
      var pane = this.getChildControl("pane");

      // Exclude page
      page.exclude();

      // Add button and page
      bar.add(button);
      pane.add(page);

      // Register button
      this.__radioGroup.add(button);

      // Add state to page
      page.addState(this.__barPositionToState[this.getBarPosition()]);

      // Update states
      page.addState("lastTab");
      var children = this.getChildren();
      if (children[0] == page) {
        page.addState("firstTab");
      } else {
        children[children.length-2].removeState("lastTab");
      }

      page.addListener("close", this._onPageClose, this);
    },

    /**
     * Removes a page (and its corresponding button) from the TabView.
     *
     * @param page {qx.ui.tabview.Page} The page to be removed.
     */
    remove : function(page)
    {
      var pane = this.getChildControl("pane");
      var bar = this.getChildControl("bar");
      var button = page.getButton();
      var children = pane.getChildren();

      // Try to select next page
      if (this.getSelection()[0] == page)
      {
        var index = children.indexOf(page);
        if (index == 0)
        {
          if (children[1]) {
            this.setSelection([children[1]]);
          } else {
            this.resetSelection();
          }
        }
        else
        {
          this.setSelection([children[index-1]]);
        }
      }

      // Remove the button and page
      bar.remove(button);
      pane.remove(page);

      // Remove the button from the radio group
      this.__radioGroup.remove(button);

      // Remove state from page
      page.removeState(this.__barPositionToState[this.getBarPosition()]);

      // Update states
      if (page.hasState("firstTab"))
      {
        page.removeState("firstTab");
        if (children[0]) {
          children[0].addState("firstTab");
        }
      }

      if (page.hasState("lastTab"))
      {
        page.removeState("lastTab");
        if (children.length > 0) {
          children[children.length-1].addState("lastTab");
        }
      }

      page.removeListener("close", this._onPageClose, this);
    },

    /**
     * Returns TabView's children widgets.
     *
     * @return {qx.ui.tabview.Page[]} List of children.
     */
    getChildren : function() {
      return this.getChildControl("pane").getChildren();
    },

    /**
     * Returns the position of the given page in the TabView.
     *
     * @param page {qx.ui.tabview.Page} The page to query for.
     * @return {Integer} Position of the page in the TabView.
     */
    indexOf : function(page) {
      return this.getChildControl("pane").indexOf(page);
    },


    /*
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */


    /** {Map} Maps the bar position to an appearance state */
    __barPositionToState : null,

    /**
     * Apply method for the placeBarOnTop-Property.
     *
     * Passes the desired value to the layout of the tabview so
     * that the layout can handle it.
     * It also sets the states to all buttons so they know the
     * position of the bar.
     *
     * @param value {boolean} The new value.
     * @param old {boolean} The old value.
     */
    _applyBarPosition : function(value, old)
    {
      var bar = this.getChildControl("bar");

      var horizontal = value == "left" || value == "right";
      var reversed = value == "right" || value == "bottom";

      var layoutClass = horizontal ? qx.ui.layout.HBox : qx.ui.layout.VBox;

      var layout = this._getLayout();
      if (layout && layout instanceof layoutClass) {
        // pass
      } else {
        this._setLayout(layout = new layoutClass);
      }

      // Update reversed
      layout.setReversed(reversed);

      // Sync orientation to bar
      bar.setOrientation(horizontal ? "vertical" : "horizontal");

      // Read children
      var children = this.getChildren();

      // Toggle state to bar
      if (old)
      {
        var oldState = this.__barPositionToState[old];

        // Update bar
        bar.removeState(oldState);

        // Update pages
        for (var i=0, l=children.length; i<l; i++) {
          children[i].removeState(oldState);
        }
      }

      if (value)
      {
        var newState = this.__barPositionToState[value];

        // Update bar
        bar.addState(newState);

        // Update pages
        for (var i=0, l=children.length; i<l; i++) {
          children[i].addState(newState);
        }
      }
    },


    /*
    ---------------------------------------------------------------------------
      OLD SELECTION PROPERTY METHODS
    ---------------------------------------------------------------------------
    */


    /**
     * Select the page in the list.
     *
     * @deprecated Use 'setSelection' instead!
     * @param item {qx.ui.tabview.Page} page to select.
     */
    setSelected : function(item)
    {
      qx.log.Logger.deprecatedMethodWarning(
        arguments.callee,
        "Use 'setSelection' instead!"
      );

      this.setSelection([item]);
    },

    /**
     * Returns the selected page in the list.
     *
     * @deprecated Use 'getSelection' instead!
     * @return {qx.ui.tabview.Page} Selected page.
     */
    getSelected : function()
    {
      qx.log.Logger.deprecatedMethodWarning(
        arguments.callee,
        "Use 'getSelection' instead!"
      );

      var item = this.getSelection()[0];
      if (item) {
        return item
      } else {
        return null;
      }
    },

    /**
     * Reset the current selection.
     *
     * @deprecated Use 'resetSelection' instead!
     */
    resetSelected : function()
    {
      qx.log.Logger.deprecatedMethodWarning(
        arguments.callee,
        "Use 'resetSelection' instead!"
      );

      this.resetSelection();
    },


    /*
    ---------------------------------------------------------------------------
      SELECTION API
    ---------------------------------------------------------------------------
    */

    /**
     * Returns an array of currently selected items.
     *
     * @return {qx.ui.tabview.Page[]} List of items.
     */
    getSelection : function() {
      var buttons = this.__radioGroup.getSelection();
      var result = [];

      for (var i = 0; i < buttons.length; i++) {
        result.push(buttons[i].getUserData("page"));
      }

      return result;
    },

    /**
     * Replaces current selection with the given items.
     *
     * @param items {qx.ui.tabview.Page[]} Items to select.
     * @throws an exception if one of the items is not a child element and if
     *    items contains more than one elements.
     */
    setSelection : function(items) {
      var buttons = []

      for (var i = 0; i < items.length; i++) {
        buttons.push(items[i].getChildControl("button"));
      }
      this.__radioGroup.setSelection(buttons);
    },

    /**
     * Clears the whole selection at once.
     */
    resetSelection : function() {
      this.__radioGroup.resetSelection();
    },

    /**
     * Detects whether the given item is currently selected.
     *
     * @param item {qx.ui.tabview.Page} Any valid selectable item.
     * @return {Boolean} Whether the item is selected.
     * @throws an exception if one of the items is not a child element.
     */
    isSelected : function(item) {
      var button = item.getChildControl("button");
      return this.__radioGroup.isSelected(button);
    },

    /**
     * Whether the selection is empty.
     *
     * @return {Boolean} Whether the selection is empty.
     */
    isSelectionEmpty : function() {
      return this.__radioGroup.isSelectionEmpty();
    },

    /**
     * Returns all elements which are selectable.
     *
     * @return {qx.ui.tabview.Page[]} The contained items.
     */
    getSelectables: function() {
      var buttons = this.__radioGroup.getSelectables();
      var result = [];

      for (var i = 0; i <buttons.length; i++) {
        result.push(buttons[i].getUserData("page"));
      }

      return result;
    },

    /**
     * Event handler for <code>changeSelection</code>.
     *
     * @param e {qx.event.type.Data} Data event.
     */
    _onChangeSelection : function(e)
    {
      var pane = this.getChildControl("pane");
      var button = e.getData()[0];

      if (button)
      {
        pane.setSelection([button.getUserData("page")]);
        button.focus();
        this.scrollChildIntoView(button, null, null, false);
      }
      else
      {
        pane.resetSelection();
      }

      var value = pane.getSelection();
      var old = e.getOldData();

      this.fireDataEvent("changeSelection", value, old);

      /*
       * TODO remove this if the methods and event for old selection API
       * doesn't exist.
       *
       * Methods: 'getSelected', 'setSelected', 'resetSelected'
       * Event: 'changeSelected'
       */
      this.fireDataEvent("changeSelected", value[0], old[0]);
    },

    /**
     * Event handler for <code>beforeChangeSelection</code>.
     *
     * @param e {qx.event.type.Event} Data event.
     */
    _onBeforeChangeSelection : function(e)
    {
      if (!this.fireNonBubblingEvent("beforeChangeSelection",
          qx.event.type.Event, [false, true])) {
        e.preventDefault();
      }
    },

    // overridden
    addListener : function(type, listener, self, capture)
    {
      /*
       * TODO this method must be removed if the old selection API doesn't exist.
       *
       * Methods: 'getSelected', 'setSelected', 'resetSelected'
       * Event: 'changeSelected'
       */

      if (type === "changeSelected") {
        qx.log.Logger.deprecatedEventWarning(
        arguments.callee,
        "changeSelected",
        "Use 'changeSelection' instead!");
      }

      return this.base(arguments, type, listener, self, capture);
    },


    /*
    ---------------------------------------------------------------------------
      EVENT LISTENERS
    ---------------------------------------------------------------------------
    */


    /**
     * Event handler for the change of the selected item of the radio group.
     * @param e {qx.event.type.Data} The data event
     */
    _onRadioChangeSelection : function(e) {
      var element = e.getData()[0];
      if (element) {
        this.setSelection([element.getUserData("page")]);
      } else {
        this.resetSelection();
      }
    },


    /**
     * Removes the Page widget on which the close button was clicked.
     *
     * @param e {qx.event.type.Mouse} mouse click event
     */
    _onPageClose : function(e) {
      this.remove(e.getTarget());
    }
  },


  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */


  destruct : function() {
    this._disposeObjects("__radioGroup");
    this._disposeFields("__barPositionToState");
  }
});
