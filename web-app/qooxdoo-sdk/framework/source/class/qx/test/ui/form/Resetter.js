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
     * Martin Wittemann (martinwittemann)

************************************************************************ */
qx.Class.define("qx.test.ui.form.Resetter",
{
  extend : qx.test.ui.LayoutTestCase,

  construct : function() {
    this.base(arguments);
  },

  members :
  {
    __username : null,
    __password1 : null,
    __password2 : null,
    __resetter : null,

    setUp: function() {
      this.__username = new qx.ui.form.TextField();
      this.__password1 = new qx.ui.form.TextField();
      this.__password2 = new qx.ui.form.TextField();
      this.__resetter = new qx.ui.form.Resetter();
    },

    tearDown: function() {
      this.__resetter.dispose();
      this.__username.dispose();
      this.__password1.dispose();
      this.__password2.dispose();
    },


    testReset: function() {
      // set the initla values
      this.__username.setValue("A");
      this.__password1.setValue("B");
      this.__password2.setValue("C");
      // add the fields to the form manager
      this.__resetter.add(this.__username);
      this.__resetter.add(this.__password1);
      this.__resetter.add(this.__password2);
      // change the values of the fields
      this.__username.setValue("a");
      this.__password1.setValue("b");
      this.__password2.setValue("c");
      // reset the manager
      this.__resetter.reset();

      // check if the initial values are reset
      this.assertEquals("A", this.__username.getValue());
      this.assertEquals("B", this.__password1.getValue());
      this.assertEquals("C", this.__password2.getValue());
    },


    testResetWithSelectBox : function() {
      var box = new qx.ui.form.SelectBox();
      var item1 = new qx.ui.form.ListItem("1");
      var item2 = new qx.ui.form.ListItem("2");

      box.add(item1);
      box.add(item2);
      box.setSelection([item2]);

      // check the initial selection
      this.assertEquals(item2, box.getSelection()[0], "1");

      // add the box to the manager
      this.__resetter.add(box);
      // change the selection
      box.setSelection([item1]);
      // check the new selection
      this.assertEquals(item1, box.getSelection()[0], "");

      // reset the manager
      this.__resetter.reset();

      // check if the selection has been reseted
      this.assertEquals(item2, box.getSelection()[0], "3");

      item2.dispose();
      item1.dispose();
      box.dispose();
    },


    testDifferentWidgets : function() {
      // set up
      var slider = new qx.ui.form.Slider();
      var textarea = new qx.ui.form.TextArea();
      var radiobutton = new qx.ui.form.RadioButton();
      var list = new qx.ui.form.List();
      var l1 = new qx.ui.form.ListItem("1");
      list.add(l1);
      var l2 = new qx.ui.form.ListItem("2");
      list.add(l2);

      // set the init values
      slider.setValue(22);
      textarea.setValue("aaa");
      radiobutton.setValue(false);
      list.setSelection([l2]);

      // add the resetter
      this.__resetter.add(slider);
      this.__resetter.add(textarea);
      this.__resetter.add(radiobutton);
      this.__resetter.add(list);

      // change the values
      slider.setValue(55);
      textarea.setValue("bbb");
      radiobutton.setValue(true);
      list.setSelection([l1]);

      // reset
      this.__resetter.reset();

      // check
      this.assertEquals(22, slider.getValue());
      this.assertEquals("aaa", textarea.getValue());
      this.assertEquals(false, radiobutton.getValue());
      this.assertEquals(l2, list.getSelection()[0]);

      // tear down
      list.dispose();
      radiobutton.dispose();
      textarea.dispose();
      slider.dispose();
    }

  }
});
