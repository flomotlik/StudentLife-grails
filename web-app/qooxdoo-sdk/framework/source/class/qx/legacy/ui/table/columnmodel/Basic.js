/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Til Schneider (til132)

************************************************************************ */

/* ************************************************************************

#module(ui_table)

************************************************************************ */

/**
 * A model that contains all meta data about columns, such as width, renderers,
 * visibility and order.
 *
 * @see qx.legacy.ui.table.ITableModel
 */
qx.Class.define("qx.legacy.ui.table.columnmodel.Basic",
{
  extend : qx.core.Object,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function() {
    this.base(arguments);
  },




  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events : {

    /**
     * Fired when the width of a column has changed. The data property of the event is
     * a map having the following attributes:
     * <ul>
     *   <li>col: The model index of the column the width of which has changed.</li>
     *   <li>newWidth: The new width of the column in pixels.</li>
     *   <li>oldWidth: The old width of the column in pixels.</li>
     * </ul>
     */
    "widthChanged" : "qx.event.type.Data",

    /**
     * Fired when the visibility of a column has changed. This event is equal to
      * "visibilityChanged", but is fired right before.
     */
    "visibilityChangedPre" : "qx.event.type.Data",

    /**
     * Fired when the visibility of a column has changed. The data property of the
     * event is a map having the following attributes:
     * <ul>
     *   <li>col: The model index of the column the visibility of which has changed.</li>
     *   <li>visible: Whether the column is now visible.</li>
     * </ul>
     */
    "visibilityChanged" : "qx.event.type.Data",

    /**
     * Fired when the column order has changed. The data property of the
     * event is a map having the following attributes:
     * <ul>
     *   <li>col: The model index of the column that was moved.</li>
     *   <li>fromOverXPos: The old overall x position of the column.</li>
     *   <li>toOverXPos: The new overall x position of the column.</li>
     * </ul>
     */
    "orderChanged" : "qx.event.type.Data"
  },




  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {

    /** {int} the default width of a column in pixels. */
    DEFAULT_WIDTH           : 100,

    /** {DefaultDataCellRenderer} the default header cell renderer. */
    DEFAULT_HEADER_RENDERER : new qx.legacy.ui.table.headerrenderer.Default,

    /** {DefaultDataCellRenderer} the default data cell renderer. */
    DEFAULT_DATA_RENDERER   : new qx.legacy.ui.table.cellrenderer.Default,

    /** {TextFieldCellEditorFactory} the default editor factory. */
    DEFAULT_EDITOR_FACTORY  : new qx.legacy.ui.table.celleditor.TextField
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Initializes the column model.
     *
     * @param colCount {Integer} the number of columns the model should have.
     * @return {void}
     */
    init : function(colCount)
    {
      this._columnDataArr = [];

      var width = qx.legacy.ui.table.columnmodel.Basic.DEFAULT_WIDTH;
      var headerRenderer = qx.legacy.ui.table.columnmodel.Basic.DEFAULT_HEADER_RENDERER;
      var dataRenderer = qx.legacy.ui.table.columnmodel.Basic.DEFAULT_DATA_RENDERER;
      var editorFactory = qx.legacy.ui.table.columnmodel.Basic.DEFAULT_EDITOR_FACTORY;
      this._overallColumnArr = [];
      this._visibleColumnArr = [];

      for (var col=0; col<colCount; col++)
      {
        this._columnDataArr[col] =
        {
          width          : width,
          headerRenderer : headerRenderer,
          dataRenderer   : dataRenderer,
          editorFactory  : editorFactory
        };

        this._overallColumnArr[col] = col;
        this._visibleColumnArr[col] = col;
      }

      this._colToXPosMap = null;
    },


    /**
     * Sets the width of a column.
     *
     * @param col {Integer} the model index of the column.
     * @param width {Integer} the new width the column should get in pixels.
     * @return {void}
     */
    setColumnWidth : function(col, width)
    {
      var oldWidth = this._columnDataArr[col].width;

      if (oldWidth != width)
      {
        this._columnDataArr[col].width = width;

        var data =
        {
          col      : col,
          newWidth : width,
          oldWidth : oldWidth
        };

        this.fireDataEvent("widthChanged", data);
      }
    },


    /**
     * Returns the width of a column.
     *
     * @param col {Integer} the model index of the column.
     * @return {Integer} the width of the column in pixels.
     */
    getColumnWidth : function(col) {
      return this._columnDataArr[col].width;
    },


    /**
     * Sets the header renderer of a column.
     *
     * @param col {Integer} the model index of the column.
     * @param renderer {HeaderCellRenderer} the new header renderer the column
     *      should get.
     * @return {void}
     */
    setHeaderCellRenderer : function(col, renderer) {
      this._columnDataArr[col].headerRenderer = renderer;
    },


    /**
     * Returns the header renderer of a column.
     *
     * @param col {Integer} the model index of the column.
     * @return {HeaderCellRenderer} the header renderer of the column.
     */
    getHeaderCellRenderer : function(col) {
      return this._columnDataArr[col].headerRenderer;
    },


    /**
     * Sets the data renderer of a column.
     *
     * @param col {Integer} the model index of the column.
     * @param renderer {DataCellRenderer} the new data renderer the column should get.
     * @return {void}
     */
    setDataCellRenderer : function(col, renderer) {
      this._columnDataArr[col].dataRenderer = renderer;
    },


    /**
     * Returns the data renderer of a column.
     *
     * @param col {Integer} the model index of the column.
     * @return {DataCellRenderer} the data renderer of the column.
     */
    getDataCellRenderer : function(col) {
      return this._columnDataArr[col].dataRenderer;
    },


    /**
     * Sets the cell editor factory of a column.
     *
     * @param col {Integer} the model index of the column.
     * @param factory {CellEditorFactory} the new cell editor factory the column should get.
     * @return {void}
     */
    setCellEditorFactory : function(col, factory) {
      this._columnDataArr[col].editorFactory = factory;
    },


    /**
     * Returns the cell editor factory of a column.
     *
     * @param col {Integer} the model index of the column.
     * @return {CellEditorFactory} the cell editor factory of the column.
     */
    getCellEditorFactory : function(col) {
      return this._columnDataArr[col].editorFactory;
    },


    /**
     * Returns the map that translates model indexes to x positions.
     *
     * The returned map contains for a model index (int) a map having two
     * properties: overX (the overall x position of the column, int) and
     * visX (the visible x position of the column, int). visX is missing for
     * hidden columns.
     *
     * @return {var} the "column to x postion" map.
     */
    _getColToXPosMap : function()
    {
      if (this._colToXPosMap == null)
      {
        this._colToXPosMap = {};

        for (var overX=0; overX<this._overallColumnArr.length; overX++)
        {
          var col = this._overallColumnArr[overX];
          this._colToXPosMap[col] = { overX : overX };
        }

        for (var visX=0; visX<this._visibleColumnArr.length; visX++)
        {
          var col = this._visibleColumnArr[visX];
          this._colToXPosMap[col].visX = visX;
        }
      }

      return this._colToXPosMap;
    },


    /**
     * Returns the number of visible columns.
     *
     * @return {Integer} the number of visible columns.
     */
    getVisibleColumnCount : function() {
      return this._visibleColumnArr.length;
    },


    /**
     * Returns the model index of a column at a certain visible x position.
     *
     * @param visXPos {Integer} the visible x position of the column.
     * @return {Integer} the model index of the column.
     */
    getVisibleColumnAtX : function(visXPos) {
      return this._visibleColumnArr[visXPos];
    },


    /**
     * Returns the visible x position of a column.
     *
     * @param col {Integer} the model index of the column.
     * @return {Integer} the visible x position of the column.
     */
    getVisibleX : function(col) {
      return this._getColToXPosMap()[col].visX;
    },


    /**
     * Returns the overall number of columns (including hidden columns).
     *
     * @return {Integer} the overall number of columns.
     */
    getOverallColumnCount : function() {
      return this._overallColumnArr.length;
    },


    /**
     * Returns the model index of a column at a certain overall x position.
     *
     * @param overXPos {Integer} the overall x position of the column.
     * @return {Integer} the model index of the column.
     */
    getOverallColumnAtX : function(overXPos) {
      return this._overallColumnArr[overXPos];
    },


    /**
     * Returns the overall x position of a column.
     *
     * @param col {Integer} the model index of the column.
     * @return {Integer} the overall x position of the column.
     */
    getOverallX : function(col) {
      return this._getColToXPosMap()[col].overX;
    },


    /**
     * Returns whether a certain column is visible.
     *
     * @param col {Integer} the model index of the column.
     * @return {Boolean} whether the column is visible.
     */
    isColumnVisible : function(col) {
      return (this._getColToXPosMap()[col].visX != null);
    },


    /**
     * Sets whether a certain column is visible.
     *
     * @param col {Integer} the model index of the column.
     * @param visible {Boolean} whether the column should be visible.
     * @return {void}
     * @throws TODOC
     */
    setColumnVisible : function(col, visible)
    {
      if (visible != this.isColumnVisible(col))
      {
        if (visible)
        {
          var colToXPosMap = this._getColToXPosMap();

          var overX = colToXPosMap[col].overX;

          if (overX == null) {
            throw new Error("Showing column failed: " + col + ". The column is not added to this TablePaneModel.");
          }

          // get the visX of the next visible column after the column to show
          var nextVisX;

          for (var x=overX+1; x<this._overallColumnArr.length; x++)
          {
            var currCol = this._overallColumnArr[x];
            var currVisX = colToXPosMap[currCol].visX;

            if (currVisX != null)
            {
              nextVisX = currVisX;
              break;
            }
          }

          // If there comes no visible column any more, then show the column
          // at the end
          if (nextVisX == null) {
            nextVisX = this._visibleColumnArr.length;
          }

          // Add the column to the visible columns
          this._visibleColumnArr.splice(nextVisX, 0, col);
        }
        else
        {
          var visX = this.getVisibleX(col);
          this._visibleColumnArr.splice(visX, 1);
        }

        // Invalidate the _colToXPosMap
        this._colToXPosMap = null;

        // Inform the listeners
        if (!this._internalChange)
        {
          var data =
          {
            col     : col,
            visible : visible
          };

          this.fireDataEvent("visibilityChangedPre", data);
          this.fireDataEvent("visibilityChanged", data);
        }
      }
    },


    /**
     * Moves a column.
     *
     * @param fromOverXPos {Integer} the overall x postion of the column to move.
     * @param toOverXPos {Integer} the overall x postion of where the column should be
     *      moved to.
     * @return {void}
     */
    moveColumn : function(fromOverXPos, toOverXPos)
    {
      this._internalChange = true;

      var col = this._overallColumnArr[fromOverXPos];
      var visible = this.isColumnVisible(col);

      if (visible) {
        this.setColumnVisible(col, false);
      }

      this._overallColumnArr.splice(fromOverXPos, 1);
      this._overallColumnArr.splice(toOverXPos, 0, col);

      // Invalidate the _colToXPosMap
      this._colToXPosMap = null;

      if (visible) {
        this.setColumnVisible(col, true);
      }

      this._internalChange = false;

      // Inform the listeners
      var data =
      {
        col          : col,
        fromOverXPos : fromOverXPos,
        toOverXPos   : toOverXPos
      };

      this.fireDataEvent("orderChanged", data);
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._disposeFields("_overallColumnArr", "_visibleColumnArr",
      "_columnDataArr", "_colToXPosMap");
  }
});
