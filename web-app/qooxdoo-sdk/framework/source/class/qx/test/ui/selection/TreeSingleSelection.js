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
     * Christian Schmidt (chris_schmidt)

************************************************************************ */

qx.Class.define("qx.test.ui.selection.TreeSingleSelection",
{
  extend : qx.test.ui.selection.AbstractSingleSelectonTest,

  members :
  {
    setUp : function()
    {
      var length = 10;
      this._notInSelection = [];
      this._mode = "single";

      this._widget = new qx.ui.tree.Tree().set(
      {
        selectionMode: this._mode,
        width : 200,
        height : 400
      });
      this.getRoot().add(this._widget);

      var root = new qx.ui.tree.TreeFolder("Root");
      root.setOpen(true);
      this._widget.setRoot(root);

      for (var i = 0; i < length; i++) {
        var folder = new qx.ui.tree.TreeFolder("Folder" + i);
        folder.setOpen(true);
        var file = new qx.ui.tree.TreeFile("File" + i);
        folder.add(file);
        root.add(folder);

        if (i == 5) {
          this.assertIdentical(0, this._widget.getSelection().length,
            "Couldn't setup test, because selection isn't empty");

          this._widget.setSelection([file]);
          this._selection = [file];
        } else {
          this._notInSelection.push(file);
        }
      }

      this.flush();
    },

    tearDown : function()
    {
      this.getRoot().removeAll();
      this._widget.destroy();
      this._widget = null;
      this._selection = null;
      this._notInSelection = null;
      this.flush();
    },

    _getChildren : function()
    {
      if (this._widget != null) {
        return this._widget.getItems();
      } else {
        return [];
      }
    },

    _createTestElement : function(name) {
      return new qx.ui.tree.TreeFile(name);
    }
  }
});