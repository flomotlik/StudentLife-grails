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

/**
 * A table.
 *
 * @appearance table-focus-statusbar {qx.legacy.ui.basic.Label}
 */
qx.Class.define("qx.legacy.ui.table.Table",
{
  extend : qx.legacy.ui.layout.VerticalBoxLayout,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param tableModel {qx.legacy.ui.table.ITableModel ? null}
   *   The table model to read the data from.
   *
   * @param custom {Map ? null}
   *   A map provided to override the various supplemental classes allocated
   *   within this constructor.  Each property must be a function which
   *   returns an object instance, as indicated by shown the defaults listed
   *   here:
   *
   *   <dl>
   *     <dt>selectionManager</dt>
   *       <dd><pre class='javascript'>
   *         function(obj)
   *         {
   *           return new qx.legacy.ui.table.selection.Manager(obj);
   *         }
   *       </pre></dd>
   *     <dt>selectionModel</dt>
   *       <dd><pre class='javascript'>
   *         function(obj)
   *         {
   *           return new qx.legacy.ui.table.selection.Model(obj);
   *         }
   *       </pre></dd>
   *     <dt>tableColumnModel</dt>
   *       <dd><pre class='javascript'>
   *         function(obj)
   *         {
   *           return new qx.legacy.ui.table.columnmodel.Basic(obj);
   *         }
   *       </pre></dd>
   *     <dt>tablePaneModel</dt>
   *       <dd><pre class='javascript'>
   *         function(obj)
   *         {
   *           return new qx.legacy.ui.table.pane.Model(obj);
   *         }
   *       </pre></dd>
   *     <dt>tablePane</dt>
   *       <dd><pre class='javascript'>
   *         function(obj)
   *         {
   *           return new qx.legacy.ui.table.pane.Pane(obj);
   *         }
   *       </pre></dd>
   *     <dt>tablePaneHeader</dt>
   *       <dd><pre class='javascript'>
   *         function(obj)
   *         {
   *           return new qx.legacy.ui.table.pane.Header(obj);
   *         }
   *       </pre></dd>
   *     <dt>tablePaneScroller</dt>
   *       <dd><pre class='javascript'>
   *         function(obj)
   *         {
   *           return new qx.legacy.ui.table.pane.Scroller(obj);
   *         }
   *       </pre></dd>
   *     <dt>tablePaneModel</dt>
   *       <dd><pre class='javascript'>
   *         function(obj)
   *         {
   *           return new qx.legacy.ui.table.pane.Model(obj);
   *         }
   *       </pre></dd>
   *   </dl>
   */
  construct : function(tableModel, custom)
  {
    this.base(arguments);

    //
    // Use default objects if custom objects are not specified
    //
    if (!custom) {
      custom = { };
    }

    if (custom.selectionManager) {
      this.setNewSelectionManager(custom.selectionManager);
    }

    if (custom.selectionModel) {
      this.setNewSelectionModel(custom.selectionModel);
    }

    if (custom.tableColumnModel) {
      this.setNewTableColumnModel(custom.tableColumnModel);
    }

    if (custom.tablePane) {
      this.setNewTablePane(custom.tablePane);
    }

    if (custom.tablePaneHeader) {
      this.setNewTablePaneHeader(custom.tablePaneHeader);
    }

    if (custom.tablePaneScroller) {
      this.setNewTablePaneScroller(custom.tablePaneScroller);
    }

    if (custom.tablePaneModel) {
      this.setNewTablePaneModel(custom.tablePaneModel);
    }

    // Create the child widgets
    this._scrollerParent = new qx.legacy.ui.layout.HorizontalBoxLayout;
    this._scrollerParent.setDimension("100%", "1*");
    this._scrollerParent.setSpacing(1);

    this._statusBar = new qx.legacy.ui.basic.Label;
    this._statusBar.setAppearance("table-focus-statusbar");
    this._statusBar.setDimension("100%", "auto");

    this.add(this._scrollerParent, this._statusBar);

    this._columnVisibilityBt = new qx.legacy.ui.form.Button;
    this._columnVisibilityBt.setAppearance("table-menubar-button");
    this._columnVisibilityBt.setHeight(null);
    this._columnVisibilityBt.setWidth("auto");
    this._columnVisibilityBt.setAllowStretchY(true);
    this._columnVisibilityBt.addListener("execute", this._onColumnVisibilityBtExecuted, this);

    // Allocate a default data row renderer
    this.setDataRowRenderer(new qx.legacy.ui.table.rowrenderer.Default(this));

    // Create the models
    this._selectionManager = this.getNewSelectionManager()(this);
    this.setSelectionModel(this.getNewSelectionModel()(this));
    this.setTableColumnModel(this.getNewTableColumnModel()(this));

    // If a table model was provided...
    if (tableModel != null)
    {
      // ... then save it.
      this.setTableModel(tableModel);
    }

    // create the main meta column
    this.setMetaColumnCounts([ -1 ]);

    // Make focusable
    this.setTabIndex(1);
    this.addListener("keydown", this._onkeydown);
    this.addListener("keypress", this._onKeyPress);
    this.addListener("changeFocused", this._onFocusChanged);

    this._focusedCol = 0;
    this._focusedRow = 0;

    // add an event listener which updates the table content on locale change
    qx.locale.Manager.getInstance().addListener("changeLocale", this._onChangeLocale, this);
  },




  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */

  events :
  {
    /**
     * Dispatched before adding the column list to the column visibility menu.
     * The event data is a map with two properties: table and menu.  Listeners
     * may add additional items to the menu, which appear at the top of the
     * menu.
     */
    "columnVisibilityMenuCreateStart" : "qx.event.type.Data",

    /**
     * Dispatched after adding the column list to the column visibility menu.
     * The event data is a map with two properties: table and menu.  Listeners
     * may add additional items to the menu, which appear at the bottom of the
     * menu.
     */
    "columnVisibilityMenuCreateEnd" : "qx.event.type.Data",

     /**
      * Dispatched when the inner width of the table has changed.
      */
    "tableWidthChanged" : "qx.event.type.Data",

    /**
     * Dispatched when updating scrollbars discovers that a vertical scrollbar
     * is needed when it previously was not, or vice versa.  The data is a
     * boolean indicating whether a vertical scrollbar is now being used.
     */
    "verticalScrollBarChanged" : "qx.event.type.Data",

    /**
     * Dispatched when a data cell has been clicked.
     */
    "cellClick" : "qx.legacy.ui.table.pane.CellEvent",

    /**
     * Dispatched when a data cell has been clicked.
     */
    "cellDblclick" : "qx.legacy.ui.table.pane.CellEvent",

    /**
     * Dispatched when the context menu is needed in a data cell
     */
    "cellContextmenu" : "qx.legacy.ui.table.pane.CellEvent"
  },



  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /**Events that must be redirected to the scrollers.*/
    __redirectEvents : { cellClick: 1, cellDblclick: 1, cellContextmenu: 1 }
  },


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {

    /** The selection model. */
    selectionModel :
    {
      check : "qx.legacy.ui.table.selection.Model",
      apply : "_applySelectionModel",
      event : "changeSelectionModel"
    },

    /** The table model. */
    tableModel :
    {
      check : "qx.legacy.ui.table.ITableModel",
      apply : "_applyTableModel",
      event : "changeTableModel",
      nullable : true
    },

    /**
     * The table column model.
     *
     * Note that is is not possible to change the table column model once it
     * is set.
     */
    tableColumnModel :
    {
      check : "qx.legacy.ui.table.columnmodel.Basic",
      apply : "_applyTableColumnModel",
      event : "changeTableColumnModel"
    },

    /** The height of the table rows. */
    rowHeight :
    {
      check : "Number",
      init : 20,
      apply : "_applyRowHeight",
      event : "changeRowHeight"
    },

    /**
     * Force line height to match row height.  May be disabled if cell
     * renderers being used wish to render multiple lines of data within a
     * cell.  (With the default setting, all but the first of multiple lines
     * of data will not be visible.)
     */
    forceLineHeight :
    {
      check : "Boolean",
      init  : true
    },

    /** The height of the header cells. */
    headerCellHeight :
    {
      check : "Integer",
      init : 16,
      apply : "_applyHeaderCellHeight",
      event : "changeHeaderCellHeight"
    },

    /** Whether to show the status bar */
    statusBarVisible :
    {
      check : "Boolean",
      init : true,
      apply : "_applyStatusBarVisible"
    },

  /** The Statusbartext, set it, if you want some more Information */
  additionalStatusBarText :
  {
    nullable : true,
    init : null,
    apply : "_applyAdditionalStatusBarText"
  },

    /** Whether to show the column visibility button */
    columnVisibilityButtonVisible :
    {
      check : "Boolean",
      init : true,
      apply : "_applyColumnVisibilityButtonVisible"
    },


    /**
     * {int[]} The number of columns per meta column. If the last array entry is -1,
     * this meta column will get the remaining columns.
     */
    metaColumnCounts :
    {
      check : "Object",
      apply : "_applyMetaColumnCounts"
    },


    /**
     * Whether the focus should moved when the mouse is moved over a cell. If false
     * the focus is only moved on mouse clicks.
     */
    focusCellOnMouseMove :
    {
      check : "Boolean",
      init : false,
      apply : "_applyFocusCellOnMouseMove"
    },

    /**
     * Whether the cell focus indicator should be shown
     */
    showCellFocusIndicator :
    {
      check : "Boolean",
      init : true,
      apply : "_applyShowCellFocusIndicator"
    },

    /**
     * Whether the table should keep the first visible row complete. If set to false,
     * the first row may be rendered partial, depending on the vertical scroll value.
     */
    keepFirstVisibleRowComplete :
    {
      check : "Boolean",
      init : true,
      apply : "_applyKeepFirstVisibleRowComplete"
    },


    /**
     * Whether the table cells should be updated when only the selection or the
     * focus changed. This slows down the table update but allows to react on a
     * changed selection or a changed focus in a cell renderer.
     */
    alwaysUpdateCells :
    {
      check : "Boolean",
      init : false
    },


    /** The renderer to use for styling the rows. */
    dataRowRenderer :
    {
      check : "qx.legacy.ui.table.IRowRenderer",
      init : null,
      nullable : true,
      event : "changeDataRowRenderer"
    },


    /**
     * A function to call when before modal cell editor is opened.
     *
     * @signature function(cellEditor, cellInfo)
     *
     * @param cellEditor {qx.legacy.ui.window.Window}
     *   The modal window which has been created for this cell editor
     *
     * @param cellInfo {Map}
     *   Information about the cell for which this cell editor was created.
     *   It contains the following properties:
     *       col, row, xPos, value
     *
     * @return {void}
     */
    modalCellEditorPreOpenFunction :
    {
      check : "Function",
      init : null,
      nullable : true
    },


    /**
     * A function to instantiate a selection manager.  this allows subclasses of
     * Table to subclass this internal class.  To take effect, this property must
     * be set before calling the Table constructor.
     */
    newSelectionManager :
    {
      check : "Function",
      init : function(obj) {
        return new qx.legacy.ui.table.selection.Manager(obj);
      }
    },


    /**
     * A function to instantiate a selection model.  this allows subclasses of
     * Table to subclass this internal class.  To take effect, this property must
     * be set before calling the Table constructor.
     */
    newSelectionModel :
    {
      check : "Function",
      init : function(obj) {
        return new qx.legacy.ui.table.selection.Model(obj);
      }
    },


    /**
     * A function to instantiate a table column model.  This allows subclasses
     * of Table to subclass this internal class.  To take effect, this
     * property must be set before calling the Table constructor.
     */
    newTableColumnModel :
    {
      check : "Function",
      init : function(obj) {
        return new qx.legacy.ui.table.columnmodel.Basic(obj);
      }
    },


    /**
     * A function to instantiate a table pane.  this allows subclasses of
     * Table to subclass this internal class.  To take effect, this property
     * must be set before calling the Table constructor.
     */
    newTablePane :
    {
      check : "Function",
      init : function(obj) {
        return new qx.legacy.ui.table.pane.Pane(obj);
      }
    },


    /**
     * A function to instantiate a table pane.  this allows subclasses of
     * Table to subclass this internal class.  To take effect, this property
     * must be set before calling the Table constructor.
     */
    newTablePaneHeader :
    {
      check : "Function",
      init : function(obj) {
        return new qx.legacy.ui.table.pane.Header(obj);
      }
    },


    /**
     * A function to instantiate a table pane scroller.  this allows
     * subclasses of Table to subclass this internal class.  To take effect,
     * this property must be set before calling the Table constructor.
     */
    newTablePaneScroller :
    {
      check : "Function",
      init : function(obj) {
        return new qx.legacy.ui.table.pane.Scroller(obj);
      }
    },


    /**
     * A function to instantiate a table pane model.  this allows subclasses
     * of Table to subclass this internal class.  To take effect, this
     * property must be set before calling the Table constructor.
     */
    newTablePaneModel :
    {
      check : "Function",
      init : function(columnModel) {
        return new qx.legacy.ui.table.pane.Model(columnModel);
      }
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // property modifier
    /**
     * TODOC
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applySelectionModel : function(value, old)
    {
      this._selectionManager.setSelectionModel(value);

      if (old != null) {
        old.removeListener("changeSelection", this._onSelectionChanged, this);
      }

      value.addListener("changeSelection", this._onSelectionChanged, this);
    },


    // property modifier
    /**
     * Property modifier called when the rowHeight property value is
     * changed.  We loop through each scroller and reset its vertical
     * scrollbar's maximum value.
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyRowHeight : function(value, old)
    {
      if (! this.getTableModel())
      {
        return;
      }

      var scrollerArr = this._getPaneScrollerArr();

      for (var i=0; i<scrollerArr.length; i++) {
        scrollerArr[i]._updateVerScrollBarMaximum();
      }
    },


    // property modifier
    /**
     * Property modifier called when the headerCellHeight property value is
     * changed.  We loop through each scroller and set its height to the
     * newly-requested value.
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyHeaderCellHeight : function(value, old)
    {
      var scrollerArr = this._getPaneScrollerArr();

      for (var i=0; i<scrollerArr.length; i++) {
        scrollerArr[i].getHeader().setHeight(value);
      }
    },


    // property modifier
    /**
     * TODOC
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyTableModel : function(value, old)
    {
      this.getTableColumnModel().init(value.getColumnCount(), this);

      if (old != null)
      {
        old.removeListener(qx.legacy.ui.table.ITableModel.EVENT_TYPE_META_DATA_CHANGED, this._onTableModelMetaDataChanged, this);
        old.removeListener(qx.legacy.ui.table.ITableModel.EVENT_TYPE_DATA_CHANGED, this._onTableModelDataChanged, this);
      }

      value.addListener(qx.legacy.ui.table.ITableModel.EVENT_TYPE_META_DATA_CHANGED, this._onTableModelMetaDataChanged, this);
      value.addListener(qx.legacy.ui.table.ITableModel.EVENT_TYPE_DATA_CHANGED, this._onTableModelDataChanged, this);

      // Update the status bar
      this._updateStatusBar();
    },

    // property modifier
    _applyTableColumnModel : function(value, old)
    {
      if (old != null) {
        throw new Error("The table column model can only be set once per table.");
      }

      value.addListener("visibilityChanged", this._onColVisibilityChanged, this);
      value.addListener("widthChanged", this._onColWidthChanged, this);
      value.addListener("orderChanged", this._onColOrderChanged, this);

      // Get the current table model
      var tm = this.getTableModel();

      // If one is already in effect...
      if (tm)
      {
        // ... then initialize this new table column model now.
        value.init(tm.getColumnCount(), this);
      }

      // Reset the table column model in each table pane model
      var scrollerArr = this._getPaneScrollerArr();

      for (var i=0; i<scrollerArr.length; i++)
      {
        var paneScroller = scrollerArr[i];
        var paneModel = paneScroller.getTablePaneModel();
        paneModel._tableColumnModel = value;
      }
    },

    // property modifier
    /**
     * TODOC
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyStatusBarVisible : function(value, old)
    {
      this._statusBar.setDisplay(value);

      if (value) {
        this._updateStatusBar();
      }
    },

  // property modifier
  /**
     * @param value {var} Current value
     * @param old {var} Previous value
     */
  _applyAdditionalStatusBarText : function(value, old)
  {
    this._additionalStatusBarText = value;
    this._updateStatusBar();
  },

    // property modifier
    /**
     * TODOC
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyColumnVisibilityButtonVisible : function(value, old) {
      this._columnVisibilityBt.setDisplay(value);
    },

    // property modifier
    /**
     * TODOC
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyMetaColumnCounts : function(value, old)
    {
      var metaColumnCounts = value;
      var scrollerArr = this._getPaneScrollerArr();

      // Remove the panes not needed any more
      this._cleanUpMetaColumns(metaColumnCounts.length);

      // Update the old panes
      var leftX = 0;

      for (var i=0; i<scrollerArr.length; i++)
      {
        var paneScroller = scrollerArr[i];
        var paneModel = paneScroller.getTablePaneModel();
        paneModel.setFirstColumnX(leftX);
        paneModel.setMaxColumnCount(metaColumnCounts[i]);
        leftX += metaColumnCounts[i];
      }

      // Add the new panes
      if (metaColumnCounts.length > scrollerArr.length)
      {
        var columnModel = this.getTableColumnModel();

        for (var i=scrollerArr.length; i<metaColumnCounts.length; i++)
        {
          var paneModel = this.getNewTablePaneModel()(columnModel);
          paneModel.setFirstColumnX(leftX);
          paneModel.setMaxColumnCount(metaColumnCounts[i]);
          leftX += metaColumnCounts[i];

          var paneScroller = this.getNewTablePaneScroller()(this);
          paneScroller.setTablePaneModel(paneModel);

          // Register event listener for vertical scrolling
          paneScroller.addListener("changeScrollY", this._onScrollY, this);

          this._scrollerParent.add(paneScroller);
        }
      }

      // Update all meta columns
      for (var i=0; i<scrollerArr.length; i++)
      {
        var paneScroller = scrollerArr[i];
        var isLast = (i == (scrollerArr.length - 1));

        // Set the right header height
        paneScroller.getHeader().setHeight(this.getHeaderCellHeight());

        // Put the _columnVisibilityBt in the top right corner of the last meta column
        paneScroller.setTopRightWidget(isLast ? this._columnVisibilityBt : null);
      }

      this._updateScrollerWidths();
      this._updateScrollBarVisibility();
    },

    // property modifier
    /**
     * TODOC
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyFocusCellOnMouseMove : function(value, old)
    {
      var scrollerArr = this._getPaneScrollerArr();

      for (var i=0; i<scrollerArr.length; i++) {
        scrollerArr[i].setFocusCellOnMouseMove(value);
      }
    },

    // property modifier
    /**
     * TODOC
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyShowCellFocusIndicator : function(value, old)
    {
      var scrollerArr = this._getPaneScrollerArr();

      for (var i=0; i<scrollerArr.length; i++) {
        scrollerArr[i].setShowCellFocusIndicator(value);
      }
    },


    // property modifier
    /**
     * TODOC
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     */
    _applyKeepFirstVisibleRowComplete : function(value, old)
    {
      var scrollerArr = this._getPaneScrollerArr();

      for (var i=0; i<scrollerArr.length; i++) {
        scrollerArr[i]._onKeepFirstVisibleRowCompleteChanged();
      }
    },


    /**
     * Returns the selection manager.
     *
     * @return {qx.legacy.ui.table.selection.Manager} the selection manager.
     */
    _getSelectionManager : function() {
      return this._selectionManager;
    },


    /**
     * Returns an array containing all TablePaneScrollers in this table.
     *
     * @return {qx.legacy.ui.table.pane.Scroller[]} all TablePaneScrollers in this table.
     */
    _getPaneScrollerArr : function() {
      return this._scrollerParent.getChildren();
    },


    /**
     * Returns a TablePaneScroller of this table.
     *
     * @param metaColumn {Integer} the meta column to get the TablePaneScroller for.
     * @return {qx.legacy.ui.table.pane.Scroller} the qx.legacy.ui.table.pane.Scroller.
     */
    getPaneScroller : function(metaColumn) {
      return this._getPaneScrollerArr()[metaColumn];
    },


    /**
     * Cleans up the meta columns.
     *
     * @param fromMetaColumn {Integer} the first meta column to clean up. All following
     *      meta columns will be cleaned up, too. All previous meta columns will
     *      stay unchanged. If 0 all meta columns will be cleaned up.
     * @return {void}
     */
    _cleanUpMetaColumns : function(fromMetaColumn)
    {
      var scrollerArr = this._getPaneScrollerArr();

      if (scrollerArr != null)
      {
        for (var i=scrollerArr.length-1; i>=fromMetaColumn; i--)
        {
          scrollerArr[i].dispose();
        }
      }
    },


    /**
     * Event handler. Called when the locale has changed.
     *
     * @param evt {Event} the event.
     * @return {void}
     */
    _onChangeLocale : function(evt)
    {
      this.postponedUpdateContent();
      this._updateStatusBar();
    },


    /**
     * Event handler. Called when the selection has changed.
     *
     * @param evt {Map} the event.
     * @return {void}
     */
    _onSelectionChanged : function(evt)
    {
      var scrollerArr = this._getPaneScrollerArr();

      for (var i=0; i<scrollerArr.length; i++) {
        scrollerArr[i]._onSelectionChanged(evt);
      }

      this._updateStatusBar();
    },


    /**
     * Event handler. Called when the table model meta data has changed.
     *
     * @param evt {Map} the event.
     * @return {void}
     */
    _onTableModelMetaDataChanged : function(evt)
    {
      var scrollerArr = this._getPaneScrollerArr();

      for (var i=0; i<scrollerArr.length; i++) {
        scrollerArr[i]._onTableModelMetaDataChanged(evt);
      }

      this._updateStatusBar();
    },


    /**
     * Event handler. Called when the table model data has changed.
     *
     * @param evt {Map} the event.
     * @return {void}
     */
    _onTableModelDataChanged : function(evt)
    {
      var scrollerArr = this._getPaneScrollerArr();

      for (var i=0; i<scrollerArr.length; i++) {
        scrollerArr[i]._onTableModelDataChanged(evt);
      }

      var rowCount = this.getTableModel().getRowCount();

      if (rowCount != this._lastRowCount)
      {
        this._lastRowCount = rowCount;

        this._updateScrollBarVisibility();
        this._updateStatusBar();
      }
    },


    /**
     * Event handler. Called when a TablePaneScroller has been scrolled vertically.
     *
     * @param evt {Map} the event.
     * @return {void}
     */
    _onScrollY : function(evt)
    {
      if (!this._internalChange)
      {
        this._internalChange = true;

        // Set the same scroll position to all meta columns
        var scrollerArr = this._getPaneScrollerArr();

        for (var i=0; i<scrollerArr.length; i++) {
          scrollerArr[i].setScrollY(evt.getData());
        }

        this._internalChange = false;
      }
    },


    /**
     * Event handler. Called when a key was pressed.
     *
     * @param evt {Map} the event.
     * @return {void}
     */
    _onkeydown : function(evt)
    {
      if (!this.getEnabled()) {
        return;
      }

      var identifier = evt.getKeyIdentifier();

      var consumed = false;
      var oldFocusedRow = this._focusedRow;

      if (this.isEditing())
      {
        // Editing mode
        if (evt.getModifiers() == 0)
        {
          consumed = true;

          switch(identifier)
          {
            case "Enter":
              this.stopEditing();
              var oldFocusedRow = this._focusedRow;
              this.moveFocusedCell(0, 1);

              if (this._focusedRow != oldFocusedRow) {
                consumed = this.startEditing();
              }

              break;

            case "Escape":
              this.cancelEditing();
              this.focus();
              break;

            default:
              consumed = false;
              break;
          }
        }
      }
      else
      {
        // No editing mode
        // Handle keys that are independant from the modifiers
        consumed = true;

        switch(identifier)
        {
          case "Home":
            this.setFocusedCell(this._focusedCol, 0, true);
            break;

          case "End":
            var rowCount = this.getTableModel().getRowCount();
            this.setFocusedCell(this._focusedCol, rowCount - 1, true);
            break;

          default:
            consumed = false;
            break;
        }

        // Handle keys that depend on modifiers
        if (evt.getModifiers() == 0)
        {
          consumed = true;

          switch(identifier)
          {
            case "F2":
            case "Enter":
              consumed = this.startEditing();
              break;

            default:
              consumed = false;
              break;
          }
        }
        else if (evt.isCtrlPressed())
        {
          consumed = true;

          switch(identifier)
          {
            case "A": // Ctrl + A
              var rowCount = this.getTableModel().getRowCount();

              if (rowCount > 0) {
                this.getSelectionModel().setSelectionInterval(0, rowCount - 1);
              }

              break;

            default:
              consumed = false;
              break;
          }
        }
      }

      if (oldFocusedRow != this._focusedRow)
      {
        // The focus moved -> Let the selection manager handle this event
        this._selectionManager.handleMoveKeyDown(this._focusedRow, evt);
      }

      if (consumed)
      {
        evt.preventDefault();
        evt.stopPropagation();
      }
    },


    /**
     * Event handler. Called when a key was pressed.
     *
     * @param evt {qx.legacy.event.type.KeyEvent} the event.
     * @return {void}
     */
    _onKeyPress : function(evt)
    {
      if (!this.getEnabled()) {
        return;
      }

      if (this.isEditing()) {
        return;
      }

      // No editing mode
      var oldFocusedRow = this._focusedRow;
      var consumed = true;

      // Handle keys that are independant from the modifiers
      var identifier = evt.getKeyIdentifier();

      switch(identifier)
      {
        case "Space":
          this._selectionManager.handleSelectKeyDown(this._focusedRow, evt);
          break;

        case "Left":
          this.moveFocusedCell(-1, 0);
          break;

        case "Right":
          this.moveFocusedCell(1, 0);
          break;

        case "Up":
          this.moveFocusedCell(0, -1);
          break;

        case "Down":
          this.moveFocusedCell(0, 1);
          break;

        case "PageUp":
        case "PageDown":
          var scroller = this.getPaneScroller(0);
          var pane = scroller.getTablePane();
          var rowCount = pane.getVisibleRowCount() - 1;
          var rowHeight = this.getRowHeight();
          var direction = (identifier == "PageUp") ? -1 : 1;
          scroller.setScrollY(scroller.getScrollY() + direction * rowCount * rowHeight);
          this.moveFocusedCell(0, direction * rowCount);
          break;

        default:
          consumed = false;
      }

      if (oldFocusedRow != this._focusedRow)
      {
        // The focus moved -> Let the selection manager handle this event
        this._selectionManager.handleMoveKeyDown(this._focusedRow, evt);
      }

      if (consumed)
      {
        evt.preventDefault();
        evt.stopPropagation();
      }
    },


    /**
     * Event handler. Called when the table gets the focus.
     *
     * @param evt {Map} the event.
     * @return {void}
     */
    _onFocusChanged : function(evt)
    {
      var scrollerArr = this._getPaneScrollerArr();

      for (var i=0; i<scrollerArr.length; i++) {
        scrollerArr[i]._onFocusChanged(evt);
      }
    },


    /**
     * Event handler. Called when the visibility of a column has changed.
     *
     * @param evt {Map} the event.
     * @return {void}
     */
    _onColVisibilityChanged : function(evt)
    {
      var scrollerArr = this._getPaneScrollerArr();

      for (var i=0; i<scrollerArr.length; i++) {
        scrollerArr[i]._onColVisibilityChanged(evt);
      }

      this._updateScrollerWidths();
      this._updateScrollBarVisibility();
    },


    /**
     * Event handler. Called when the width of a column has changed.
     *
     * @param evt {Map} the event.
     * @return {void}
     */
    _onColWidthChanged : function(evt)
    {
      var scrollerArr = this._getPaneScrollerArr();

      for (var i=0; i<scrollerArr.length; i++) {
        scrollerArr[i]._onColWidthChanged(evt);
      }

      this._updateScrollerWidths();
      this._updateScrollBarVisibility();
    },


    /**
     * Event handler. Called when the column order has changed.
     *
     * @param evt {Map} the event.
     * @return {void}
     */
    _onColOrderChanged : function(evt)
    {
      var scrollerArr = this._getPaneScrollerArr();

      for (var i=0; i<scrollerArr.length; i++) {
        scrollerArr[i]._onColOrderChanged(evt);
      }

      // A column may have been moved between meta columns
      this._updateScrollerWidths();
      this._updateScrollBarVisibility();
    },


    /**
     * Gets the TablePaneScroller at a certain x position in the page. If there is
     * no TablePaneScroller at this postion, null is returned.
     *
     * @param pageX {Integer} the position in the page to check (in pixels).
     * @return {qx.legacy.ui.table.pane.Scroller} the TablePaneScroller or null.
     * @see TablePaneScrollerPool
     */
    getTablePaneScrollerAtPageX : function(pageX)
    {
      var metaCol = this._getMetaColumnAtPageX(pageX);
      return (metaCol != -1) ? this.getPaneScroller(metaCol) : null;
    },


    /**
     * Sets the currently focused cell.
     *
     * @param col {Integer} the model index of the focused cell's column.
     * @param row {Integer} the model index of the focused cell's row.
     * @param scrollVisible {Boolean ? false} whether to scroll the new focused cell
     *          visible.
     * @return {void}
     * @see TablePaneScrollerPool
     */
    setFocusedCell : function(col, row, scrollVisible)
    {
      if (!this.isEditing() && (col != this._focusedCol || row != this._focusedRow))
      {
        this._focusedCol = col;
        this._focusedRow = row;

        var scrollerArr = this._getPaneScrollerArr();

        for (var i=0; i<scrollerArr.length; i++) {
          scrollerArr[i].setFocusedCell(col, row);
        }

        if (scrollVisible) {
          this.scrollCellVisible(col, row);
        }
      }
    },


    /**
     * Returns the column of the currently focused cell.
     *
     * @return {Integer} the model index of the focused cell's column.
     */
    getFocusedColumn : function() {
      return this._focusedCol;
    },


    /**
     * Returns the row of the currently focused cell.
     *
     * @return {Integer} the model index of the focused cell's column.
     */
    getFocusedRow : function() {
      return this._focusedRow;
    },


    /**
     * Moves the focus.
     *
     * @param deltaX {Integer} The delta by which the focus should be moved on the x axis.
     * @param deltaY {Integer} The delta by which the focus should be moved on the y axis.
     * @return {void}
     */
    moveFocusedCell : function(deltaX, deltaY)
    {
      var col = this._focusedCol;
      var row = this._focusedRow;

      if (deltaX != 0)
      {
        var columnModel = this.getTableColumnModel();
        var x = columnModel.getVisibleX(col);
        var colCount = columnModel.getVisibleColumnCount();
        x = qx.lang.Number.limit(x + deltaX, 0, colCount - 1);
        col = columnModel.getVisibleColumnAtX(x);
      }

      if (deltaY != 0)
      {
        var tableModel = this.getTableModel();
        row = qx.lang.Number.limit(row + deltaY, 0, tableModel.getRowCount() - 1);
      }

      this.setFocusedCell(col, row, true);
    },


    /**
     * Scrolls a cell visible.
     *
     * @param col {Integer} the model index of the column the cell belongs to.
     * @param row {Integer} the model index of the row the cell belongs to.
     * @return {void}
     */
    scrollCellVisible : function(col, row)
    {
      var columnModel = this.getTableColumnModel();
      var x = columnModel.getVisibleX(col);

      var metaColumn = this._getMetaColumnAtColumnX(x);

      if (metaColumn != -1) {
        this.getPaneScroller(metaColumn).scrollCellVisible(col, row);
      }
    },


    /**
     * Returns whether currently a cell is editing.
     *
     * @return {var} whether currently a cell is editing.
     */
    isEditing : function()
    {
      if (this._focusedCol != null)
      {
        var x = this.getTableColumnModel().getVisibleX(this._focusedCol);
        var metaColumn = this._getMetaColumnAtColumnX(x);
        return this.getPaneScroller(metaColumn).isEditing();
      }
    },


    /**
     * Starts editing the currently focused cell. Does nothing if already editing
     * or if the column is not editable.
     *
     * @return {Boolean} whether editing was started
     */
    startEditing : function()
    {
      if (this._focusedCol != null)
      {
        var x = this.getTableColumnModel().getVisibleX(this._focusedCol);
        var metaColumn = this._getMetaColumnAtColumnX(x);
        return this.getPaneScroller(metaColumn).startEditing();
      }

      return false;
    },


    /**
     * Stops editing and writes the editor's value to the model.
     *
     * @return {void}
     */
    stopEditing : function()
    {
      if (this._focusedCol != null)
      {
        var x = this.getTableColumnModel().getVisibleX(this._focusedCol);
        var metaColumn = this._getMetaColumnAtColumnX(x);
        this.getPaneScroller(metaColumn).stopEditing();
      }
    },


    /**
     * Stops editing without writing the editor's value to the model.
     *
     * @return {void}
     */
    cancelEditing : function()
    {
      if (this._focusedCol != null)
      {
        var x = this.getTableColumnModel().getVisibleX(this._focusedCol);
        var metaColumn = this._getMetaColumnAtColumnX(x);
        this.getPaneScroller(metaColumn).cancelEditing();
      }
    },


    /**
     * Does a postponed update of the table content.
     *
     * @return {void}
     * @see #updateContent
     */
    postponedUpdateContent : function()
    {
      if (!this._updateContentPlanned)
      {
        qx.event.Timer.once(function()
        {
          if (this.isDisposed()) {
            return;
          }

          this.updateContent();
          this._updateContentPlanned = false;
          qx.legacy.ui.core.Widget.flushGlobalQueues();
        },
        this, 0);

        this._updateContentPlanned = true;
      }
    },


    /**
     * Update the table content of every attached table pane.
     *
     * @return {void}
     */
    updateContent : function() {
      var scrollerArr = this._getPaneScrollerArr();
      for (var i=0; i<scrollerArr.length; i++) {
        scrollerArr[i]._tablePane._updateContent();
      }
    },


    /**
     * Gets the meta column at a certain x position in the page. If there is no
     * meta column at this postion, -1 is returned.
     *
     * @param pageX {Integer} the position in the page to check (in pixels).
     * @return {Integer} the index of the meta column or -1.
     */
    _getMetaColumnAtPageX : function(pageX)
    {
      var scrollerArr = this._getPaneScrollerArr();

      for (var i=0; i<scrollerArr.length; i++)
      {
        var elem = scrollerArr[i].getElement();

        if (pageX >= qx.bom.element.Location.getLeft(elem) && pageX <= qx.bom.element.Location.getRight(elem)) {
          return i;
        }
      }

      return -1;
    },


    /**
     * Returns the meta column a column is shown in. If the column is not shown at
     * all, -1 is returned.
     *
     * @param visXPos {Integer} the visible x position of the column.
     * @return {Integer} the meta column the column is shown in.
     */
    _getMetaColumnAtColumnX : function(visXPos)
    {
      var metaColumnCounts = this.getMetaColumnCounts();
      var rightXPos = 0;

      for (var i=0; i<metaColumnCounts.length; i++)
      {
        var counts = metaColumnCounts[i];
        rightXPos += counts;

        if (counts == -1 || visXPos < rightXPos) {
          return i;
        }
      }

      return -1;
    },


    /**
     * Updates the text shown in the status bar.
     *
     * @return {void}
     */
    _updateStatusBar : function()
    {
      if (this.getStatusBarVisible())
      {
        var selectedRowCount = this.getSelectionModel().getSelectedCount();
        var rowCount = this.getTableModel().getRowCount();

        var text;

    if(rowCount > 0) {
      if (selectedRowCount == 0) {
        text = this.trn("one row", "%1 rows", rowCount, rowCount);
      } else {
        text = this.trn("one of one row", "%1 of %2 rows", rowCount, selectedRowCount, rowCount);
      }
    }

    if(this._additionalStatusBarText) {
      if(text) {
        text += this._additionalStatusBarText;
      } else {
        text = this._additionalStatusBarText;
      }
    }

    if(text) {
      this._statusBar.setText(text);
    }
      }
    },


    /**
     * Updates the widths of all scrollers.
     *
     * @return {void}
     */
    _updateScrollerWidths : function()
    {
      // Give all scrollers except for the last one the wanted width
      // (The last one has a flex with)
      var scrollerArr = this._getPaneScrollerArr();

      for (var i=0; i<scrollerArr.length; i++)
      {
        var isLast = (i == (scrollerArr.length - 1));
        var width = isLast ? "1*" : scrollerArr[i].getTablePaneModel().getTotalWidth();
        scrollerArr[i].setWidth(width);
      }
    },


    /**
     * Updates the visibility of the scrollbars in the meta columns.
     *
     * @return {void}
     */
    _updateScrollBarVisibility : function()
    {
      if (this.isSeeable())
      {
        var horBar = qx.legacy.ui.table.pane.Scroller.HORIZONTAL_SCROLLBAR;
        var verBar = qx.legacy.ui.table.pane.Scroller.VERTICAL_SCROLLBAR;
        var scrollerArr = this._getPaneScrollerArr();

        // Check which scroll bars are needed
        var horNeeded = false;
        var verNeeded = false;

        for (var i=0; i<scrollerArr.length; i++)
        {
          var isLast = (i == (scrollerArr.length - 1));

          // Only show the last vertical scrollbar
          var bars = scrollerArr[i].getNeededScrollBars(horNeeded, !isLast);

          if (bars & horBar) {
            horNeeded = true;
          }

          if (isLast && (bars & verBar)) {
            verNeeded = true;
          }
        }

        // Set the needed scrollbars
        for (var i=0; i<scrollerArr.length; i++)
        {
          var isLast = (i == (scrollerArr.length - 1));
          var bHadVerticalScrollBar;

          // Only show the last vertical scrollbar
          scrollerArr[i].setHorizontalScrollBarVisible(horNeeded);

          // If this is the last meta-column...
          if (isLast)
          {
            // ... then get the current (old) use of vertical scroll bar
            bHadVerticalScrollBar = scrollerArr[i].getVerticalScrollBarVisible();
          }

          scrollerArr[i].setVerticalScrollBarVisible(isLast && verNeeded);

          // If this is the last meta-column and the use of a vertical scroll bar
          // has changed...
          if (isLast && verNeeded != bHadVerticalScrollBar)
          {
            // ... then dispatch an event to any awaiting listeners
            this.fireDataEvent("verticalScrollBarChanged", verNeeded);
          }
        }
      }
    },


    /**
     * Event handler. Called when the column visibiliy button was executed.
     *
     * @return {void}
     */
    _onColumnVisibilityBtExecuted : function()
    {
      if ((this._columnVisibilityMenuCloseTime == null) || (new Date().getTime() > this._columnVisibilityMenuCloseTime + 200)) {
        this._toggleColumnVisibilityMenu();
      }
    },


    /**
     * Toggels the visibility of the menu used to change the visibility of columns.
     *
     * @return {void}
     */
    _toggleColumnVisibilityMenu : function()
    {
      if (!this.getEnabled()) {
        return;
      }

      // Show the menu
      // Create the new menu
      var menu = new qx.legacy.ui.menu.Menu;

      menu.addListener("disappear", function(evt)
      {
        this._cleanupColumnVisibilityMenu();
        this._columnVisibilityMenuCloseTime = new Date().getTime();
      }, this);

      var tableModel = this.getTableModel();
      var columnModel = this.getTableColumnModel();

      // Inform listeners who may want to insert menu items at the beginning
      var data =
      {
        table : this,
        menu  : menu
      };
      this.fireDataEvent("columnVisibilityMenuCreateStart", data, true);

      for (var x=0; x<columnModel.getOverallColumnCount(); x++)
      {
        var col = columnModel.getOverallColumnAtX(x);
        var visible = columnModel.isColumnVisible(col);
        var bt = new qx.legacy.ui.menu.CheckBox(tableModel.getColumnName(col), null, visible);

        var handler = this._createColumnVisibilityCheckBoxHandler(col);
        bt._handler = handler;
        bt.addListener("execute", handler, this);

        menu.add(bt);
      }

      // Inform listeners who may want to insert menu items at the end
      var data =
      {
        table : this,
        menu  : menu
      };
      this.fireDataEvent("columnVisibilityMenuCreateEnd", data, true);

      menu.setParent(this.getTopLevelWidget());

      this._columnVisibilityMenu = menu;

      // Show the menu
      var btElem = this._columnVisibilityBt.getElement();
      menu.setRestrictToPageOnOpen(false);
      menu.setTop(qx.bom.element.Location.getBottom(btElem));
      menu.setLeft(-1000);

      // NOTE: We have to show the menu in a timeout, otherwise it won't be shown
      //       at all.
      var self = this;

      window.setTimeout(function()
      {
        if (self.isDisposed()) {
          return;
        }

        menu.show();
        qx.legacy.ui.core.Widget.flushGlobalQueues();

        menu.setLeft(qx.bom.element.Location.getRight(btElem) - menu.getOffsetWidth());
      },
      0);
    },


    /**
     * Cleans up the column visibility menu.
     *
     * @return {void}
     */
    _cleanupColumnVisibilityMenu : function()
    {
      if (this._columnVisibilityMenu != null && !this._columnVisibilityMenu.isDisposed())
      {
        var parent = this._columnVisibilityMenu.getParent();
        if (parent) {
          parent.remove(this._columnVisibilityMenu);
        }
        this._columnVisibilityMenu.dispose();
        this._columnVisibilityMenu = null;
      }
    },


    /**
     * Creates a handler for a check box of the column visibility menu.
     *
     * @param col {Integer} the model index of column to create the handler for.
     * @return {Function} TODOC
     */
    _createColumnVisibilityCheckBoxHandler : function(col)
    {
      return function(evt)
      {
        var columnModel = this.getTableColumnModel();
        columnModel.setColumnVisible(col, !columnModel.isColumnVisible(col));
      };
    },


    /**
     * Sets the width of a column.
     *
     * @param col {Integer} the model index of column.
     * @param width {Integer} the new width in pixels.
     * @return {void}
     */
    setColumnWidth : function(col, width) {
      this.getTableColumnModel().setColumnWidth(col, width);
    },


    // overridden
    _changeInnerWidth : function(vNew, vOld)
    {
      var self = this;

      window.setTimeout(function()
      {
        if (self.isDisposed()) {
          return;
        }

        self.fireEvent("tableWidthChanged");
        self._updateScrollerWidths();
        self._updateScrollBarVisibility();
        qx.legacy.ui.core.Widget.flushGlobalQueues();
      },
      0);

      return this.base(arguments, vNew, vOld);
    },


    // overridden
    _changeInnerHeight : function(vNew, vOld)
    {
      var self = this;

      window.setTimeout(function()
      {
        if (self.isDisposed()) {
          return;
        }

        self._updateScrollBarVisibility();
        qx.legacy.ui.core.Widget.flushGlobalQueues();
      },
      0);

      return this.base(arguments, vNew, vOld);
    },


    // overridden
    _afterAppear : function()
    {
      this.base(arguments);

      this._updateScrollBarVisibility();
    },

    /**
     * Add event listener to an object.
     */
    addListener : function(type, func, obj)
    {
      if (this.self(arguments).__redirectEvents[type])
      {
        for (var i = 0, arr = this._getPaneScrollerArr(); i < arr.length; i++)
        {
          arr[i].addListener.apply(arr[i], arguments);
        }
      }
      else
      {
        arguments.callee.base.apply(this, arguments);
      }
    },


    /**
     * Remove event listener from object
     */
    removeListener : function(type, func, obj)
    {
      if (this.self(arguments).__redirectEvents[type])
      {
        for (var i = 0, arr = this._getPaneScrollerArr(); i < arr.length; i++)
        {
          arr[i].removeListener.apply(arr[i], arguments);
        }
      }
      else
      {
        arguments.callee.base.apply(this, arguments);
      }
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    // remove the event listener which handled the locale change
    qx.locale.Manager.getInstance().removeListener("changeLocale",
                                                        this._onChangeLocale,
                                                        this);

    // we allocated these objects on init so we have to clean them up.
    var selectionModel = this.getSelectionModel();
    if (selectionModel)
    {
      selectionModel.dispose();
    }

    var dataRowRenderer = this.getDataRowRenderer();
    if (dataRowRenderer)
    {
      dataRowRenderer.dispose();
    }

    this._cleanUpMetaColumns(0);
    this._disposeObjects("_selectionManager", "_columnVisibilityMenu", "_tableModel", "_columnVisibilityBt", "_scrollerParent", "_statusBar");
  }
});
