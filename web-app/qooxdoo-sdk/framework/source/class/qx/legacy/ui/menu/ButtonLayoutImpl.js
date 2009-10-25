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

qx.Class.define("qx.legacy.ui.menu.ButtonLayoutImpl",
{
  extend : qx.legacy.ui.layout.impl.HorizontalBoxLayoutImpl,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(vWidget)
  {
    this.base(arguments, vWidget);

    // We don't need flex support, should make things a bit faster,
    // as this omits some additional loops in qx.legacy.ui.layout.impl.HorizontalBoxLayoutImpl.
    this.setEnableFlexSupport(false);
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  /*
     * Global List of Methods:
     *  [01] COMPUTE BOX DIMENSIONS FOR AN INDIVIDUAL CHILD
     *  [02] COMPUTE NEEDED DIMENSIONS FOR AN INDIVIDUAL CHILD
     *  [03] COMPUTE NEEDED DIMENSIONS FOR ALL CHILDREN
     *  [04] UPDATE LAYOUT WHEN A CHILD CHANGES ITS OUTER DIMENSIONS
     *  [05] UPDATE CHILD ON INNER DIMENSION CHANGES OF LAYOUT
     *  [06] UPDATE LAYOUT ON JOB QUEUE FLUSH
     *  [07] UPDATE CHILDREN ON JOB QUEUE FLUSH
     *  [08] CHILDREN ADD/REMOVE/MOVE HANDLING
     *  [09] FLUSH LAYOUT QUEUES OF CHILDREN
     *  [10] LAYOUT CHILD
     *
     *  Inherits from qx.legacy.ui.layout.impl.HorizontalBoxLayoutImpl:
     *  [01] COMPUTE BOX DIMENSIONS FOR AN INDIVIDUAL CHILD
     *  [02] COMPUTE NEEDED DIMENSIONS FOR AN INDIVIDUAL CHILD
     *  [05] UPDATE CHILD ON INNER DIMENSION CHANGES OF LAYOUT
     *  [06] UPDATE LAYOUT ON JOB QUEUE FLUSH
     *  [07] UPDATE CHILDREN ON JOB QUEUE FLUSH
     *  [08] CHILDREN ADD/REMOVE/MOVE HANDLING
     *  [09] FLUSH LAYOUT QUEUES OF CHILDREN
     *
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      [03] COMPUTE NEEDED DIMENSIONS FOR ALL CHILDREN
    ---------------------------------------------------------------------------
    */

    /** Compute and return the width needed by all children of this widget
     *
     * @return {Integer} TODOC
     */
    computeChildrenNeededWidth : function()
    {
      // Caching the widget reference
      var vWidget = this.getWidget();

      // Ignore the verticalBoxLayout inside qx.legacy.ui.menu.Menu
      var vMenu = vWidget.getParent().getParent();

      // Let the menu do the real hard things
      return vMenu.getMenuButtonNeededWidth();
    },




    /*
    ---------------------------------------------------------------------------
      [04] UPDATE LAYOUT WHEN A CHILD CHANGES ITS OUTER DIMENSIONS
    ---------------------------------------------------------------------------
    */

    /**
     * Things to do and layout when any of the childs changes its outer width.
     *  Needed by layouts where the children depends on each-other, like flow- or box-layouts.
     *
     * @param vChild {var} TODOC
     * @return {void} TODOC
     */
    updateSelfOnChildOuterWidthChange : function(vChild)
    {
      // Caching the widget reference
      var vWidget = this.getWidget();

      // Ignore the verticalBoxLayout inside qx.legacy.ui.menu.Menu
      var vMenu = vWidget.getParent().getParent();

      // Send out invalidate signals
      switch(vChild)
      {
        case vWidget._iconObject:
          vMenu._invalidateMaxIconWidth();
          break;

        case vWidget._labelObject:
          vMenu._invalidateMaxLabelWidth();
          break;

        case vWidget._shortcutObject:
          vMenu._invalidateMaxShortcutWidth();
          break;

        case vWidget._arrowObject:
          vMenu._invalidateMaxArrowWidth();
          break;
      }

      // Call superclass implementation
      return this.base(arguments, vChild);
    },




    /*
    ---------------------------------------------------------------------------
      [10] LAYOUT CHILD
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @param vChild {var} TODOC
     * @param vJobs {var} TODOC
     * @return {void}
     */
    layoutChild_locationX : function(vChild, vJobs)
    {
      // Caching the widget reference
      var vWidget = this.getWidget();

      // Ignore the verticalBoxLayout inside qx.legacy.ui.menu.Menu
      var vMenu = vWidget.getParent().getParent();

      // Left position of the child
      var vPos = null;

      // Ask the menu instance for the correct location
      switch(vChild)
      {
        case vWidget._iconObject:
          vPos = vMenu.getIconPosition();
          break;

        case vWidget._labelObject:
          vPos = vMenu.getLabelPosition();
          break;

        case vWidget._shortcutObject:
          vPos = vMenu.getShortcutPosition();
          break;

        case vWidget._arrowObject:
          vPos = vMenu.getArrowPosition();
          break;
      }

      if (vPos != null)
      {
        vPos += vWidget.getPaddingLeft();
        vChild._renderRuntimeLeft(vPos);
      }
    }
  }
});
