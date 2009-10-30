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

qx.Class.define("qx.legacy.ui.tree.SelectionManager",
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
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** Should multiple selection be allowed? */
    multiSelection :
    {
      refine : true,
      init : false
    },

    /** Enable drag selection? */
    dragSelection :
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
    _getFirst : function() {
      return this.getItems()[0];
    },


    /**
     * TODOC
     *
     * @return {var} TODOC
     */
    _getLast : function()
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
      return this.getBoundedWidget().getItems();
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getNext : function(vItem)
    {
      if (vItem)
      {
        if (qx.legacy.ui.tree.Tree.isOpenTreeFolder(vItem))
        {
          return vItem.getFirstVisibleChildOfFolder();
        }
        else if (vItem.isLastVisibleChild())
        {
          var vCurrent = vItem;

          while (vCurrent && vCurrent.isLastVisibleChild()) {
            vCurrent = vCurrent.getParentFolder();
          }

          if (vCurrent && vCurrent instanceof qx.legacy.ui.tree.AbstractTreeElement && vCurrent.getNextVisibleSibling() && vCurrent.getNextVisibleSibling() instanceof qx.legacy.ui.tree.AbstractTreeElement) {
            return vCurrent.getNextVisibleSibling();
          }
        }
        else
        {
          return vItem.getNextVisibleSibling();
        }
      }
      else
      {
        return this.getBoundedWidget().getFirstTreeChild();
      }
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {void | var} TODOC
     */
    getPrevious : function(vItem)
    {
      if (vItem)
      {
        if (vItem == this.getBoundedWidget())
        {
          return;
        }
        else if (vItem.isFirstVisibleChild())
        {
          if (vItem.getParentFolder() instanceof qx.legacy.ui.tree.TreeFolder)
          {
            // The first node (if hidden) should be ignored for selection
            if (vItem.getParentFolder() instanceof qx.legacy.ui.tree.Tree && vItem.getParentFolder().getHideNode()) {
              return vItem;
            }

            return vItem.getParentFolder();
          }
        }
        else
        {
          var vPrev = vItem.getPreviousVisibleSibling();

          while (vPrev instanceof qx.legacy.ui.tree.AbstractTreeElement)
          {
            if (qx.legacy.ui.tree.Tree.isOpenTreeFolder(vPrev)) {
              vPrev = vPrev.getLastVisibleChildOfFolder();
            } else {
              break;
            }
          }

          return vPrev;
        }
      }
      else
      {
        return this.getBoundedWidget().getLastTreeChild();
      }
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
    getItemTop : function(vItem)
    {
      // Alternate method:
      // return qx.bom.element.Location.getTop(vItem.getElement()) - qx.bom.element.Location.getTop(this.getBoundedWidget().getElement(), "border");
      var vBoundedWidget = this.getBoundedWidget();
      var vElement = vItem.getElement();
      var vOffset = 0;

      while (vElement && vElement.qx_Widget != vBoundedWidget)
      {
        vOffset += vElement.offsetTop;
        vElement = vElement.parentNode;
      }

      return vOffset;
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    getItemHeight : function(vItem)
    {
      if (vItem instanceof qx.legacy.ui.tree.TreeFolder && vItem._horizontalLayout) {
        return vItem._horizontalLayout.getOffsetHeight();
      } else {
        return vItem.getOffsetHeight();
      }
    },


    /**
     * TODOC
     *
     * @param vItem {var} TODOC
     * @return {var} TODOC
     */
    scrollItemIntoView : function(vItem)
    {
      if (vItem instanceof qx.legacy.ui.tree.TreeFolder && vItem._horizontalLayout) {
        return vItem._horizontalLayout.scrollIntoView();
      } else {
        return vItem.scrollIntoView();
      }
    },




    /*
    ---------------------------------------------------------------------------
      ITEM STATE MANAGEMENT
    ---------------------------------------------------------------------------
    */


    /**
     * Renders the selection state of a tree node. If the node is selected this
     * method makes sure it is visible.
     *
     * @param treeNode {qx.legacy.ui.tree.AbstractTreeElement} The tree node to select
     * @param vIsSelected {Boolean} whether the tree node is selected
     */
    renderItemSelectionState : function(treeNode, isSelected)
    {
      if (isSelected && !treeNode.isSeeable())
      {

        var treeFolder = treeNode;
        var parentFolders = [];

        // Find all parent folders
        while (treeFolder)
        {
          treeFolder = treeFolder.getParentFolder();
          parentFolders.push(treeFolder);
        };

        // Now open all folders, starting at the top
        parentFolders.pop();
        while (parentFolders.length)
        {
           // get last one, and open it.
          parentFolders.pop().open();
        }
      }

      if (isSelected)
      {
        // scrool it into view
        if (treeNode.isSeeable())
        {
          this.scrollItemIntoView(treeNode);
        }
        else
        {
          treeNode.addListener("appear", function(e) {
            this.scrollItemIntoView(treeNode);
          }, this);
        }
      }

      // select it
      treeNode.setSelected(isSelected);
    }
  }
});
