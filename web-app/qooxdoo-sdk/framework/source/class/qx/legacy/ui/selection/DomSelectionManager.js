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


************************************************************************ */

qx.Class.define("qx.legacy.ui.selection.DomSelectionManager",
{
  extend : qx.legacy.ui.selection.SelectionManager,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(vBoundedWidget)
  {
    this.base(arguments, vBoundedWidget);

    // the children does not fire onmouseover events so we could
    // not enable this and make it functional
    this.setDragSelection(false);

    this._selectedItems.getItemHashCode = this.getItemHashCode;
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
      MAPPING TO BOUNDED WIDGET (DOM NODES)
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @param oItem {Object} TODOC
     * @return {Object}
     */
    getItemEnabled : function(oItem) {
      return true;
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getItemClassName : function(vItem) {
      return vItem.className || "";
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @param vClassName {var} TODOC
     * @return {var} TODOC
     */
    setItemClassName : function(vItem, vClassName) {
      return vItem.className = vClassName;
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getItemBaseClassName : function(vItem)
    {
      var p = vItem.className.split(" ")[0];
      return p ? p : "Status";
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getNextSibling : function(vItem) {
      return vItem.nextSibling;
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getPreviousSibling : function(vItem) {
      return vItem.previousSibling;
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getFirst : function() {
      return this.getItems()[0];
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getLast : function()
    {
      var vItems = this.getItems();
      return vItems[vItems.length - 1];
    },




    /*
    ---------------------------------------------------------------------------
      MAPPING TO ITEM DIMENSIONS
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getItemLeft : function(vItem) {
      return vItem.offsetLeft;
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getItemTop : function(vItem) {
      return vItem.offsetTop;
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getItemWidth : function(vItem) {
      return vItem.offsetWidth;
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getItemHeight : function(vItem) {
      return vItem.offsetHeight;
    },




    /*
    ---------------------------------------------------------------------------
      MAPPING TO ITEM PROPERTIES
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @param oItem {Object} TODOC
     * @return {var} TODOC
     */
    getItemHashCode : function(oItem)
    {
      if (oItem._hash) {
        return oItem._hash;
      }

      return oItem._hash = qx.core.ObjectRegistry.toHashCode(oItem);
    },


    /**
     * TODOC
     *
     * @param vItem1 {var} TODOC
     * @param vItem2 {var} TODOC
     * @return {boolean}
     */
    isBefore : function(vItem1, vItem2)
    {
      var pa = vItem1.parentNode;

      for (var i=0, l=pa.childNodes.length; i<l; i++)
      {
        switch(pa.childNodes[i])
        {
          case vItem2:
            return false;

          case vItem1:
            return true;
        }
      }
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {void}
     */
    scrollItemIntoView : function(vItem) {
      this.getBoundedWidget().scrollItemIntoView(vItem);
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getItems : function() {
      return this.getBoundedWidget().getItems();
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getAbove : function(vItem)
    {
      var vParent = vItem.parentNode;
      var vFound = false;
      var vLeft = vItem.offsetLeft;
      var vChild;

      for (var i=vParent.childNodes.length-1; i>0; i--)
      {
        vChild = vParent.childNodes[i];

        if (vFound == false)
        {
          if (vChild == vItem) {
            vFound = true;
          }
        }
        else
        {
          if (vChild.offsetLeft == vLeft) {
            return vChild;
          }
        }
      }
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getUnder : function(vItem)
    {
      var vParent = vItem.parentNode;
      var vFound = false;
      var vLeft = vItem.offsetLeft;
      var vChild;

      for (var i=0, l=vParent.childNodes.length; i<l; i++)
      {
        vChild = vParent.childNodes[i];

        if (vFound == false)
        {
          if (vChild == vItem) {
            vFound = true;
          }
        }
        else
        {
          if (vChild.offsetLeft == vLeft) {
            return vChild;
          }
        }
      }
    },




    /*
    ---------------------------------------------------------------------------
      ITEM CSS STATE MANAGEMENT
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @param vState {var} TODOC
     * @param vIsState {var} TODOC
     * @return {void}
     */
    _updateState : function(vItem, vState, vIsState)
    {
      var c = this.getItemClassName(vItem);
      var n = this.getItemBaseClassName(vItem) + "-" + vState;

      this.setItemClassName(vItem, vIsState ? qx.lang.String.addListItem(c, n, " ") : qx.lang.String.removeListItem(c, n, " "));
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @param vIsSelected {var} TODOC
     * @return {void}
     */
    renderItemSelectionState : function(vItem, vIsSelected) {
      this._updateState(vItem, "Selected", vIsSelected);
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @param vIsAnchor {var} TODOC
     * @return {void}
     */
    renderItemAnchorState : function(vItem, vIsAnchor) {
      this._updateState(vItem, "Anchor", vIsAnchor);
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @param vIsLead {var} TODOC
     * @return {void}
     */
    renderItemLeadState : function(vItem, vIsLead) {
      this._updateState(vItem, "Lead", vIsLead);
    }
  }
});
