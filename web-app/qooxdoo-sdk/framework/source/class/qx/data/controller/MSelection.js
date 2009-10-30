/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * EXPERIMENTAL!
 *
 * Mixin for the selection in the data binding controller.
 * It contains an selection property which can be manipulated.
 * Remember to call the method {@link #_addChangeTargetListener} on every
 * change of the target.
 * It is also important that the elements stored in the target e.g. ListItems
 * do have the corresponding model stored as user data under the "model" key.
 */
qx.Mixin.define("qx.data.controller.MSelection",
{

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    // check for a target property
    if (!qx.Class.hasProperty(this.constructor, "target")) {
      throw new Error("Target property is needed.");
    }

    // create a default selection array
    this.setSelection(new qx.data.Array());
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties : {
    /**
     * Data array containing the selected model objects. This property can be
     * manipulated directly which means that a push to the selection will also
     * select the corresponding element in the target.
     */
    selection :
    {
      check: "qx.data.Array",
      event: "changeSelection",
      apply: "_applySelection",
      init: null
    }
  },



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // private members //
    // set the semaphore-like variable for the selection change
    _modifingSelection : 0,
    __selectionListenerId : null,
    __selectionArrayListenerId : null,

    /*
    ---------------------------------------------------------------------------
       APPLY METHODS
    ---------------------------------------------------------------------------
    */
    /**
     * Apply-method for setting a new selection array. Only the change listener
     * will be removed from the old array and added to the new.
     *
     * @param value {qx.data.Array} The new data array for the selection.
     * @param old {qx.data.Array|null} The old data array for the selection.
     */
    _applySelection: function(value, old) {
      // remove the old listener if necessary
      if (this.__selectionArrayListenerId != undefined && old != undefined) {
        old.removeListenerById(this.__selectionArrayListenerId);
      }
      // add a new change listener to the changeArray
      this.__selectionArrayListenerId = value.addListener(
        "change", this.__changeSelectionArray, this
      );
    },


    /*
    ---------------------------------------------------------------------------
       EVENT HANDLER
    ---------------------------------------------------------------------------
    */
    /**
     * Event handler for the change of the data array holding the selection.
     * If a change is in the selection array, the selection update will be
     * invoked.
     */
    __changeSelectionArray: function() {
      this._updateSelection();
    },


    /**
     * Event handler for a change in the target selection.
     * If the selection in the target has changed, the selected model objects
     * will be found and added to the selection array.
     */
    __changeTargetSelection: function() {
      // if __changeSelectionArray is currently working, do nothing
      if (this._inSelectionModification() || this.getTarget() == null) {
        return;
      }

      if (this.__targetSupportsMultiSelection()) {
        // get the selection of the target
        var targetSelection = this.getTarget().getSelection();
      } else if (this.__targetSupportsSingleSelection()) {
        // get the selection of the target as an array
        var targetSelection = this.getTarget().getSelection();
      }

      // go through the target selection
      for (var i = 0; i < targetSelection.length; i++) {
        // get the fitting item
        var item = targetSelection[i].getModel();
        if (!this.getSelection().contains(item)) {
          this.getSelection().splice(this.getSelection().length, 0, item);
        }
      }

      // get all items selected in the list
      var targetSelectionItems = [];
      for (var i = 0; i < targetSelection.length; i++) {
        targetSelectionItems[i] = targetSelection[i].getModel();
      }

      // go through the controller selection
      for (var i = this.getSelection().length - 1; i >= 0; i--) {
        // if the item in the controller selection is not selected in the list
        if (!qx.lang.Array.contains(
          targetSelectionItems, this.getSelection().getItem(i)
        )) {
          // remove the current element
          this.getSelection().splice(i, 1);
        }
      }

      // fire the change event manually
      this.fireDataEvent("changeSelection", this.getSelection());
    },


    /*
    ---------------------------------------------------------------------------
       SELECTION
    ---------------------------------------------------------------------------
    */
    /**
     * Helper method which should be called by the classes including this
     * Mixin when the target changes.
     *
     * @param value {qx.ui.core.Widget|null} The new target.
     * @param old {qx.ui.core.Widget|null} The old target.
     */
    _addChangeTargetListener: function(value, old) {
      // remove the old selection listener
      if (this.__selectionListenerId != undefined && old != undefined) {
        old.removeListenerById(this.__selectionListenerId);
      }

      // if a selection API is supported
      if (
        this.__targetSupportsMultiSelection()
        || this.__targetSupportsSingleSelection()
      ) {
        // add a new selection listener
        this.__selectionListenerId = value.addListener(
          "changeSelection", this.__changeTargetSelection, this
        );
      }
    },


    /**
     * Method for updating the selection. It checks for the case of single or
     * multi selection and after that checks if the selection in the selection
     * array is the same as in the target widget.
     */
    _updateSelection: function() {
      // mark the change process in a flag
      this._startSelectionModification();

      // if its a multi selection target
      if (this.__targetSupportsMultiSelection()) {

        // remove the old selection
        this.getTarget().resetSelection();
        // go through the selection array
        for (var i = 0; i < this.getSelection().length; i++) {
          // select each item
          this.__selectItem(this.getSelection().getItem(i));
        }

        // get the selection of the target
        var targetSelection = this.getTarget().getSelection();
        // get all items selected in the list
        var targetSelectionItems = [];
        for (var i = 0; i < targetSelection.length; i++) {
          targetSelectionItems[i] = targetSelection[i].getModel();
        }

        // go through the controller selection
        for (var i = this.getSelection().length - 1; i >= 0; i--) {
          // if the item in the controller selection is not selected in the list
          if (!qx.lang.Array.contains(
            targetSelectionItems, this.getSelection().getItem(i)
          )) {
            // remove the current element
            this.getSelection().splice(i, 1);
          }
        }

      // if its a single selection target
      } else if (this.__targetSupportsSingleSelection()) {
        // select the last selected item (old selection will be removed anyway)
        this.__selectItem(
          this.getSelection().getItem(this.getSelection().length - 1)
        );
      }

      // reset the changing flag
      this._endSelectionModification();
    },


    /**
     * Helper-method returning true, if the target supports multi selection.
     * @return {boolean} true, if the target supports multi selection.
     */
    __targetSupportsMultiSelection: function() {
      var targetClass = this.getTarget().constructor;
      return qx.Class.implementsInterface(targetClass, qx.ui.core.IMultiSelection);
    },


    /**
     * Helper-method returning true, if the target supports single selection.
     * @return {boolean} true, if the target supports single selection.
     */
    __targetSupportsSingleSelection: function() {
      var targetClass = this.getTarget().constructor;
      return qx.Class.implementsInterface(targetClass, qx.ui.core.ISingleSelection);
    },


    /**
     * Internal helper for selecting an item in the target. The item to select
     * is defined by a given model item.
     *
     * @param item {qx.core.Object} A model element.
     */
    __selectItem: function(item) {
      // get all list items
      var children = this.getTarget().getSelectables();

      // go through all children and search for the child to select
      for (var i = 0; i < children.length; i++) {
        if (children[i].getModel() == item) {
          // if the target is multi selection able
          if (this.__targetSupportsMultiSelection()) {
            // select the item in the target
            this.getTarget().addToSelection(children[i]);
          // if the target is single selection able
          } else if (this.__targetSupportsSingleSelection()) {
            this.getTarget().setSelection([children[i]]);
          }
          return;
        }
      }
    },


    /**
     * Helper-Method signaling that currently the selection of the target is
     * in change. That will block the change of the internal selection.
     * {@link #_endSelectionModification}
     */
    _startSelectionModification: function() {
      this._modifingSelection++;
    },


    /**
     * Helper-Method signaling that the internal changing of the targets
     * selection is over.
     * {@link #_startSelectionModification}
     */
    _endSelectionModification: function() {
      this._modifingSelection > 0 ? this._modifingSelection-- : null;
    },


    /**
     * Helper-Method for checking the state of the selection modification.
     * {@link #_startSelectionModification}
     * {@link #_endSelectionModification}
     */
    _inSelectionModification: function() {
      return this._modifingSelection > 0;
    }

  }
});
