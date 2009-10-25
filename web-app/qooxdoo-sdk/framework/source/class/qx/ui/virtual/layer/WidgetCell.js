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
     * Fabian Jakobs (fjakobs)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */


/**
 * EXPERIMENTAL!
 *
 * The WidgetCell layer renders each cell with a qooxdoo widget. The concrete
 * widget instance for each cell is provided by a cell provider.
 */
qx.Class.define("qx.ui.virtual.layer.WidgetCell",
{
  extend : qx.ui.virtual.layer.Abstract,

  include : [
    qx.ui.core.MChildrenHandling
  ],


  /**
   * @param widgetCellProvider {qx.ui.virtual.core.IWidgetCellProvider} This
   *    class manages the life cycle of the cell widgets.
   */
  construct : function(widgetCellProvider)
  {
    this.base(arguments);
    this.setZIndex(2);

    if (qx.core.Variant.isSet("qx.debug", "on")) {
      this.assertInterface(
        widgetCellProvider,
        qx.ui.virtual.core.IWidgetCellProvider
      );
    }

    this._cellProvider = widgetCellProvider;
    this.__spacerPool = [];
  },


  /*
   *****************************************************************************
      PROPERTIES
   *****************************************************************************
   */

   properties :
   {
     // overridden
     anonymous :
     {
       refine: true,
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
     * Returns the widget used to render the given cell. May return null if the
     * cell isn’t rendered currently rendered.
     *
     * @param row {Integer} The cell's row index
     * @param column {Integer} The cell's column index
     * @return {qx.ui.core.LayoutItem|null} the widget used to render the given
     *    cell or <code>null</code>
     */
     getRenderedCellWidget : function(row, column)
     {
       var columnCount = this.getColumnSizes().length;
       var rowCount = this.getRowSizes().length;

       var firstRow = this.getFirstRow();
       var firstColumn = this.getFirstColumn();

       if (
         row < firstRow ||
         row >= firstRow + rowCount ||
         column < firstColumn ||
         column >= firstColumn + columnCount
       ) {
         return null;
       }

       var childIndex = (column - firstColumn) + (row - firstRow) * columnCount;
       var widget = this._getChildren()[childIndex];

       if (widget.getUserData("cell.empty")) {
         return null;
       } else {
         return widget;
       }
     },


     __spacerPool : null,

    /**
     * Get the spacer widget, for empty cells
     *
     * @return {qx.ui.core.Spacer} The spacer widget.
     */
    _getSpacer : function()
    {
      var spacer = this.__spacerPool.pop();
      if (!spacer)
      {
        spacer = new qx.ui.core.Spacer();
        spacer.setUserData("cell.empty", 1);
      }
      return spacer;
    },


    // overridden
    _fullUpdate : function(firstRow, firstColumn, rowSizes, columnSizes)
    {
      var cellProvider = this._cellProvider;

      var children = this._getChildren();
      for (var i=0; i<children.length; i++)
      {
        var child = children[i];
        if (child.getUserData("cell.empty")) {
          this.__spacerPool.push(child);
        } else {
          cellProvider.poolCellWidget(child);
        }
      }

      this._removeAll();

      var top = 0;
      var left = 0;

      for (var y=0; y<rowSizes.length; y++)
      {
        for (var x=0; x<columnSizes.length; x++)
        {
          var row = firstRow + y;
          var column = firstColumn + x;

          var item = cellProvider.getCellWidget(row, column) || this._getSpacer();
          item.setUserBounds(left, top, columnSizes[x], rowSizes[y]);
          item.setUserData("cell.row", row);
          item.setUserData("cell.column", column);
          this._add(item);

          left += columnSizes[x];
        }
        top += rowSizes[y];
        left = 0;
      }
    },


    _updateLayerWindow : function(
      firstRow, firstColumn,
      rowSizes, columnSizes
    )
    {
      // compute overlap of old and new window
      //
      //      +---+
      //      |  ##--+
      //      |  ##  |
      //      +--##  |
      //         +---+
      //

      var lastRow = firstRow + rowSizes.length - 1;
      var lastColumn = firstColumn + columnSizes.length - 1;

      var overlap = {
        firstRow: Math.max(firstRow, this.getFirstRow()),
        lastRow: Math.min(lastRow, this._lastRow),
        firstColumn: Math.max(firstColumn, this.getFirstColumn()),
        lastColumn: Math.min(lastColumn, this._lastColumn)
      }

      this._lastColumn = lastColumn;
      this._lastRow = lastRow;

      if (
        overlap.firstRow > overlap.lastRow ||
        overlap.firstColumn > overlap.lastColumn
      ) {
        return this._fullUpdate(
          firstRow, firstColumn,
          rowSizes, columnSizes
        );
      }

      // collect the widgets to move
      var children = this._getChildren();
      var lineLength = this.getColumnSizes().length;
      var widgetsToMove = [];
      var widgetsToMoveIndexes = {};
      for (var row=firstRow; row<=lastRow; row++)
      {
        widgetsToMove[row] = [];
        for (var column=firstColumn; column<=lastColumn; column++)
        {
          if (
            row >= overlap.firstRow &&
            row <= overlap.lastRow &&
            column >= overlap.firstColumn &&
            column <= overlap.lastColumn
          )
          {
            var x = column - this.getFirstColumn();
            var y = row - this.getFirstRow();
            var index = y*lineLength + x;
            widgetsToMove[row][column] = children[index];
            widgetsToMoveIndexes[index] = true;
          }
        }
      }

      var cellProvider = this._cellProvider;

      // pool widgets
      var children = this._getChildren();
      for (var i=0; i<children.length; i++)
      {
        if (!widgetsToMoveIndexes[i])
        {
          var child = children[i];
          if (child.getUserData("cell.empty")) {
            this.__spacerPool.push(child);
          } else {
            cellProvider.poolCellWidget(child);
          }
        }
      }

      this._removeAll();

      var top = 0;
      var left = 0;

      for (var y=0; y<rowSizes.length; y++)
      {
        for (var x=0; x<columnSizes.length; x++)
        {
          var row = firstRow + y;
          var column = firstColumn + x;

          var item =
            widgetsToMove[row][column] ||
            cellProvider.getCellWidget(row, column) ||
            this._getSpacer();

          item.setUserBounds(left, top, columnSizes[x], rowSizes[y]);
          item.setUserData("cell.row", row);
          item.setUserData("cell.column", column);
          this._add(item);

          left += columnSizes[x];
        }
        top += rowSizes[y];
        left = 0;
      }
    }
  },

  destruct : function()
  {
    var children = this._getChildren();
    for (var i=0; i<children.length; i++) {
      children[i].dispose();
    }

    this._disposeFields("_cellProvider", "__spacerPool");
  }
});
