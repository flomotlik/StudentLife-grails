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
 * A cell editor factory creating text fields.
 *
 * @appearance table-editor-textfield {qx.ui.form.TextField}
 */
qx.Class.define("qx.ui.table.celleditor.TextField",
{
  extend : qx.core.Object,
  implement : qx.ui.table.ICellEditorFactory,



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
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {

    /**
     * function that validates the result
     * the function will be called with the new value and the old value and is
     * supposed to return the value that is set as the table value.
     **/
    validationFunction :
    {
      check : "Function",
      nullable : true,
      init : null
    }

  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    __done : null,


    // interface implementation
    createCellEditor : function(cellInfo)
    {
      var cellEditor = new qx.ui.form.TextField;
      cellEditor.setAppearance("table-editor-textfield");

      cellEditor.originalValue = cellInfo.value;
      if ( cellInfo.value === null ) {
        cellInfo.value = "";
      }
      cellEditor.setValue("" + cellInfo.value);

      cellEditor.addListener("appear", function() {
        cellEditor.selectAllText();
      });

      return cellEditor;
    },

    // interface implementation
    getCellEditorValue : function(cellEditor)
    {
      var value = cellEditor.getValue();

      // validation function will be called with new and old value
      var validationFunc = this.getValidationFunction();
      if ( ! this.__done && validationFunc )
      {
         value = validationFunc( value, cellEditor.originalValue );
         this.__done = true;
      }

      if (typeof cellEditor.originalValue == "number") {
        value = parseFloat(value);
      }

      return value;
    }
  }
});
