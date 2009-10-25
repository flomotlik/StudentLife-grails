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
     * Martin Wittemann (martinwittemann)

************************************************************************ */
qx.Class.define("qx.test.ui.form.Range",
{
  extend : qx.test.ui.LayoutTestCase,

  members :
  {
    __test: function(widget) {
      // min
      widget.setMinimum(10);
      this.assertEquals(10, widget.getMinimum(), "Set or get does not work. (min)");

      // max
      widget.setMaximum(20);
      this.assertEquals(20, widget.getMaximum(), "Set or get does not work. (max)");

      // singleStep
      widget.setSingleStep(2);
      this.assertEquals(2, widget.getSingleStep(), "Set or get does not work. (singleStep)");

      // pageStep
      widget.setPageStep(11);
      this.assertEquals(11, widget.getPageStep(), "Set or get does not work. (pageStep)");

      // get rid of the widget
      widget.destroy();
    },

    testSpinner: function() {
     this.__test(new qx.ui.form.Spinner());
    },

    testSlider: function() {
     this.__test(new qx.ui.form.Slider());
    }

  }
});