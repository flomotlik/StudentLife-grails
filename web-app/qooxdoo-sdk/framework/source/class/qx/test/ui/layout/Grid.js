/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

qx.Class.define("qx.test.ui.layout.Grid",
{
  extend : qx.dev.unit.TestCase,

  members :
  {

    setUp : function()
    {
      this._gridWidget = new qx.test.ui.layout.LayoutItem(100, 50);
      this._gridLayout = new qx.ui.layout.Grid();
      this._gridWidget.setLayout(this._gridLayout);

      this.root = new qx.test.ui.layout.LayoutRoot();
      this.root.add(this._gridWidget);
    },


    tearDown : function()
    {
      this.root.dispose();
      this._gridWidget.dispose();
      this._gridLayout.dispose();
    },


    flush : function() {
      qx.ui.core.queue.Manager.flush();
    },


    assertSize : function(layoutItem, width, height)
    {
      this.flush();
      this.assertEquals(width, layoutItem.bounds.width);
      this.assertEquals(height, layoutItem.bounds.height);
    },


    _getFixedWidget : function()
    {
      var widget = new qx.test.ui.layout.LayoutItem(200, 100);
      widget.set({
        allowGrowX: false,
        allowShrinkX: false,
        allowGrowY: false,
        allowShrinkY: false
      });
      return widget;
    },


    testGetCellWidget : function()
    {
      var grid = this._gridLayout;

      this.assertNull(grid.getCellWidget(0, 0));
      this.assertNull(grid.getCellWidget(1, 1));

      var w00 = this._getFixedWidget();
      this._gridWidget.add(w00, {row: 0, column: 0});
      this.assertEquals(w00, grid.getCellWidget(0, 0));
      this.assertNull(grid.getCellWidget(1, 1));

      var w11 = this._getFixedWidget();
      this._gridWidget.add(w11, {row: 1, column: 1});
      this.assertEquals(w00, grid.getCellWidget(0, 0));
      this.assertEquals(w11, grid.getCellWidget(1, 1));
      this.assertNull(grid.getCellWidget(1, 0));
    },


    testAutoSize : function()
    {
      this._gridWidget.add(this._getFixedWidget(), {row: 0, column: 0});
      this._gridWidget.add(this._getFixedWidget(), {row: 0, column: 1});
      this._gridWidget.add(this._getFixedWidget(), {row: 1, column: 0});
      this._gridWidget.add(this._getFixedWidget(), {row: 1, column: 1});

      this.assertSize(this._gridWidget, 400, 200);

      // spacing
      this._gridLayout.setSpacingY(10);
      this._gridLayout.setSpacingX(20);

      this.assertSize(this._gridWidget, 420, 210);
    },


    testAddRemove : function()
    {
      var a = this._getFixedWidget();
      var b = this._getFixedWidget();
      var c = this._getFixedWidget();
      var d = this._getFixedWidget();

      this._gridLayout.setSpacingY(10);
      this._gridLayout.setSpacingX(20);

      // initial layout:
      // ab
      // cd
      this._gridWidget.add(a, {row: 0, column: 0});
      this._gridWidget.add(b, {row: 0, column: 1});
      this._gridWidget.add(c, {row: 1, column: 0});
      this._gridWidget.add(d, {row: 1, column: 1});
      this.assertSize(this._gridWidget, 420, 210);

      // layout:
      // a
      // c
      this._gridWidget.remove(b);
      this._gridWidget.remove(d);
      this.assertSize(this._gridWidget, 200, 210);

      // layout:
      // a, d, b, c
      this._gridWidget.remove(c);
      this._gridWidget.add(d, {row: 0, column: 1});
      this._gridWidget.add(b, {row: 0, column: 2});
      this._gridWidget.add(c, {row: 0, column: 3});
      this.assertSize(this._gridWidget, 860, 100);
    },


    testVisibility : function()
    {
      var a = this._getFixedWidget();
      var b = this._getFixedWidget();
      var c = this._getFixedWidget();
      var d = this._getFixedWidget();

      this._gridLayout.setSpacingY(10);
      this._gridLayout.setSpacingX(20);

      // initial layout:
      // ab
      // cd
      this._gridWidget.add(a, {row: 0, column: 0});
      this._gridWidget.add(b, {row: 0, column: 1});
      this._gridWidget.add(c, {row: 1, column: 0});
      this._gridWidget.add(d, {row: 1, column: 1});
      this.assertSize(this._gridWidget, 420, 210);

      // layout:
      // ab
      // cd
      a.setVisibility("hidden");
      b.setVisibility("hidden");
      c.setVisibility("hidden");
      this.assertSize(this._gridWidget, 420, 210);


      // layout:
      // ab
      b.setVisibility("visible");
      c.setVisibility("excluded");
      d.setVisibility("excluded");
      this.assertSize(this._gridWidget, 420, 100);

      // layout:
      // cd
      a.setVisibility("excluded");
      b.setVisibility("excluded");
      c.setVisibility("visible");
      d.setVisibility("visible");

      this.assertSize(this._gridWidget, 420, 110);
    },


    testCellSize : function()
    {
      this._gridLayout.setRowHeight(0, 40);
      this._gridLayout.setRowHeight(1, 150);
      this._gridLayout.setColumnWidth(0, 70);
      this._gridLayout.setColumnWidth(1, 290);

      var a = new qx.test.ui.layout.LayoutItem(100, 50);
      var b = new qx.test.ui.layout.LayoutItem(100, 50);
      var c = new qx.test.ui.layout.LayoutItem(100, 50);
      var d = new qx.test.ui.layout.LayoutItem(100, 50);

      this._gridWidget.add(a, {row: 0, column: 0});
      this._gridWidget.add(b, {row: 0, column: 1});
      this._gridWidget.add(c, {row: 1, column: 0});
      this._gridWidget.add(d, {row: 1, column: 1});

      this.assertSize(a, 70, 40);
      this.assertSize(b, 290, 40);
      this.assertSize(c, 70, 150);
      this.assertSize(d, 290, 150);
    }
  },

  destruct : function() {
    this._disposeFields("_gridWidget", "_gridLayout");
  }
});
