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

/** This class represents a selection and manage incoming events for widgets which need selection support. */
qx.Class.define("qx.legacy.ui.listview.SelectionManager",
{
  extend : qx.legacy.ui.selection.SelectionManager,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(vBoundedWidget) {
    this.base(arguments, vBoundedWidget);
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
      MAPPING TO BOUNDED WIDGET
    ---------------------------------------------------------------------------
    */

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
      var items = this.getItems();
      return items[items.length-1];
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    getItems : function() {
      return this.getBoundedWidget().getData();
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getNextSibling : function(vItem)
    {
      var vData = this.getItems();
      return vData[vData.indexOf(vItem) + 1];
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getPreviousSibling : function(vItem)
    {
      var vData = this.getItems();
      return vData[vData.indexOf(vItem) - 1];
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




    /*
    ---------------------------------------------------------------------------
      MAPPING TO ITEM DIMENSIONS
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @param vTopLeft {var} TODOC
     * @return {void}
     */
    scrollItemIntoView : function(vItem, vTopLeft) {
      this.getBoundedWidget().scrollItemIntoView(vItem, vTopLeft);
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getItemLeft : function(vItem) {
      return this.getBoundedWidget().getItemLeft(vItem);
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getItemTop : function(vItem) {
      return this.getBoundedWidget().getItemTop(vItem);
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getItemWidth : function(vItem) {
      return this.getBoundedWidget().getItemWidth(vItem);
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getItemHeight : function(vItem) {
      return this.getBoundedWidget().getItemHeight(vItem);
    },


    /**
     * In a qx.legacy.ui.listview.ListView there are no disabled entries support currently.
     *
     * @param vItem {var} TODOC
     * @return {Object}
     */
    getItemEnabled : function(vItem) {
      return true;
    },




    /*
    ---------------------------------------------------------------------------
      ITEM STATE MANAGEMENT
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @param vIsSelected {var} TODOC
     * @return {void}
     */
    renderItemSelectionState : function(vItem, vIsSelected) {
      this.getBoundedWidget()._updateSelectionState(vItem, vIsSelected);
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @param vIsAnchor {var} TODOC
     * @return {void}
     */
    renderItemAnchorState : function(vItem, vIsAnchor) {
      this.getBoundedWidget()._updateAnchorState(vItem, vIsAnchor);
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @param vIsLead {var} TODOC
     * @return {void}
     */
    renderItemLeadState : function(vItem, vIsLead) {
      this.getBoundedWidget()._updateLeadState(vItem, vIsLead);
    }
  }
});
