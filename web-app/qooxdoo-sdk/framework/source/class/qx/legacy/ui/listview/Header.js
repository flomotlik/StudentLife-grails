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
 * @appearance list-view-header
 */
qx.Class.define("qx.legacy.ui.listview.Header",
{
  extend : qx.legacy.ui.layout.HorizontalBoxLayout,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function(vColumns)
  {
    this.base(arguments);

    // Property initialization
    this.initHeight();
    this.initOverflow();

    // This fixes the innerWidth calculation difference between the grid(pane) and the head.
    this.setPaddingRight(qx.legacy.ui.core.Widget.SCROLLBAR_SIZE);

    // Store configuration
    this._columns = vColumns;

    // Column headers
    var vHeadCell, vHeadSeparator;

    for (var vCol in vColumns)
    {
      vHeadCell = new qx.legacy.ui.listview.HeaderCell(vColumns[vCol], vCol);
      vHeadSeparator = new qx.legacy.ui.listview.HeaderSeparator;

      this.add(vHeadCell, vHeadSeparator);

      if (vColumns[vCol].align)
      {
        vHeadCell.setHorizontalChildrenAlign(vColumns[vCol].align);

        if (vColumns[vCol].align == "right") {
          vHeadCell.setReverseChildrenOrder(true);
        }
      }

      // store some additional data
      vColumns[vCol].contentClass = qx.Class.getByName("qx.legacy.ui.listview.ContentCell" + qx.lang.String.firstUp(vColumns[vCol].type || "text"));
      vColumns[vCol].headerCell = vHeadCell;
    }

    // Event Listeners
    this.addListener("mousemove", this._onmousemove);
    this.addListener("mousedown", this._onmousedown);
    this.addListener("mouseup", this._onmouseup);
    this.addListener("mouseout", this._onmouseout);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    overflow :
    {
      refine : true,
      init : "hidden"
    },

    height :
    {
      refine : true,
      init : "auto"
    },

    appearance :
    {
      refine : true,
      init : "list-view-header"
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
      RESIZE SYNC
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @param vWidth {var} TODOC
     * @return {void}
     */
    _syncColumnWidth : function(vWidth)
    {
      var vChildren = this.getChildren();
      var vColumn = Math.ceil(vChildren.indexOf(this._resizeCell) / 2);

      this.getParent().getPane().setColumnWidth(vColumn, vWidth);
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _syncResizeLine : function()
    {
      qx.legacy.ui.core.Widget.flushGlobalQueues();

      var vParent = this.getParent();
      var vLine = vParent.getResizeLine();

      var vLeft =
        qx.bom.element.Location.getLeft(this._resizeSeparator.getElement()) -
        qx.bom.element.Location.getLeft(this.getElement(), "border");

      var vTop = qx.bom.element.Dimension.getHeight(vParent.getHeader().getElement());
      var vHeight = qx.bom.element.Dimension.getHeight(vParent.getElement()) - vTop;

      vLine._renderRuntimeTop(vTop);
      vLine._renderRuntimeHeight(vHeight);
      vLine._renderRuntimeLeft(vLeft);

      vLine.removeStyleProperty("visibility");
    },




    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    _onmousemove : function(e)
    {
      if (!this.getParent().getResizable()) {
        return;
      }

      if (this._resizingActive)
      {
        // Slow down mshtml a bit
        if (qx.core.Variant.isSet("qx.client", "mshtml"))
        {
          if ((new Date).valueOf() - this._last < 50) {
            return;
          }

          this._last = (new Date).valueOf();
        }

        var vNewLeft = e.getPageX();
        var vSizeDiff = vNewLeft - this._resizeStart;
        var vCell = this._resizeCell;

        vCell.setWidth(Math.max(4, vCell.getWidth() + vSizeDiff));
        this._resizeStart = vNewLeft;

        if (this.getParent().getLiveResize()) {
          this._syncColumnWidth(vCell._computeBoxWidth());
        } else {
          this._syncResizeLine();
        }
      }
      else
      {
        var vTarget = e.getTarget();
        var vEventPos = e.getPageX();
        var vTargetPosLeft = qx.bom.element.Location.getLeft(vTarget.getElement());
        var vTargetPosRight = vTargetPosLeft + qx.bom.element.Dimension.getWidth(vTarget.getElement());

        var vResizeCursor = false;
        var vResizeSeparator = null;

        if (vTarget instanceof qx.legacy.ui.listview.HeaderSeparator)
        {
          vResizeCursor = true;
          vResizeSeparator = vTarget;
        }
        else if ((vEventPos - vTargetPosLeft) <= 10)
        {
          // Ignore first column
          if (!vTarget.isFirstChild())
          {
            vResizeCursor = true;
            vResizeSeparator = vTarget.getPreviousSibling();
          }
        }
        else if ((vTargetPosRight - vEventPos) <= 10)
        {
          vResizeCursor = true;
          vResizeSeparator = vTarget.getNextSibling();
        }

        if (!(vResizeSeparator instanceof qx.legacy.ui.listview.HeaderSeparator)) {
          vResizeSeparator = vTarget = vResizeCursor = null;
        }

        // Check if child is marked as resizable
        else if (vResizeSeparator)
        {
          var vResizeCell = vResizeSeparator.getPreviousSibling();

          if (vResizeCell && (vResizeCell._computedWidthTypePercent || vResizeCell._config.resizable == false)) {
            vResizeSeparator = vTarget = vResizeCursor = null;
          }
        }

        // Apply global cursor
        this.getTopLevelWidget().setGlobalCursor(vResizeCursor ? "e-resize" : null);

        // Store data for mousedown
        this._resizeSeparator = vResizeSeparator;
        this._resizeTarget = vTarget;
      }
    },


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    _onmousedown : function(e)
    {
      if (!this._resizeSeparator) {
        return;
      }

      this._resizingActive = true;
      this._resizeStart = e.getPageX();
      this._resizeCell = this._resizeSeparator.getPreviousSibling();

      if (!this.getParent().getLiveResize()) {
        this._syncResizeLine();
      }

      this.setCapture(true);
    },


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    _onmouseup : function(e)
    {
      if (!this._resizingActive) {
        return;
      }

      this._syncColumnWidth(this._resizeCell.getBoxWidth());

      this.setCapture(false);
      this.getTopLevelWidget().setGlobalCursor(null);

      // Remove hover effect
      this._resizeTarget.removeState("over");

      // Hide resize line
      this.getParent().getResizeLine().setStyleProperty("visibility", "hidden");

      this._cleanupResizing();
    },


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    _onmouseout : function(e)
    {
      if (!this.getCapture()) {
        this.getTopLevelWidget().setGlobalCursor(null);
      }
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _cleanupResizing : function()
    {
      delete this._resizingActive;

      delete this._resizeSeparator;
      delete this._resizeTarget;
      delete this._resizeStart;
      delete this._resizeCell;
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._cleanupResizing();
    this._columns = null;
  }
});
