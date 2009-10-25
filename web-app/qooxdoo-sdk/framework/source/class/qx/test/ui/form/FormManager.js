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
qx.Class.define("qx.test.ui.form.FormManager",
{
  extend : qx.test.ui.LayoutTestCase,


  construct : function()
  {
    this.base(arguments);

    // create the test renderer
    qx.Class.define("qx.test.DummyFormRenderer", {
      extend : qx.core.Object,
      implement : qx.ui.form.renderer.IFormRenderer,

      construct : function() {
        this.groups = [];
        this.buttons = [];
      },

      properties : {
        buttons : {},
        groups : {}
      },

      members : {
        addItems : function(items, names, title) {
          this.groups.push({
            items : items,
            names : names,
            title : title
          });
        },

        addButton : function(button) {
          this.buttons.push(button);
        }
      }
    });
  },

  members :
  {
    __form : null,
    __tf1 : null,
    __tf2 : null,

    setUp : function() {
      this.__form = new qx.ui.form.Form();
      this.__tf1 = new qx.ui.form.TextField();
      this.__tf2 = new qx.ui.form.TextField();
    },


    tearDown : function() {
      this.__tf2.dispose();
      this.__tf1.dispose();
      this.__form.dispose();
    },


    testAddTwo : function() {
      // add the widgets
      this.__form.add(this.__tf1, "TF1");
      this.__form.add(this.__tf2, "TF2");

      // get the view
      var view = this.__form.createView(qx.test.DummyFormRenderer);

      // check the items
      this.assertEquals(view.groups[0].items[0], this.__tf1);
      this.assertEquals(view.groups[0].items[1], this.__tf2);

      // check the names
      this.assertEquals(view.groups[0].names[0], "TF1");
      this.assertEquals(view.groups[0].names[1], "TF2");
    },


    testWrongRenderer : function() {
      // add a form item so the view contains something
      this.__form.add(this.__tf1, "TF1");
      var self = this;
      this.assertException(function() {
        self.__form.createView(qx.core.Object);
      }, Error, null);
    },


    testAddTwoWithValidator : function() {
      // add the widgets
      this.__tf1.setRequired(true);
      this.__form.add(this.__tf1, "TF1");
      this.__form.add(this.__tf2, "TF2", qx.util.Validate.email());

      // validation should fail
      this.assertFalse(this.__form.validate());
      this.assertFalse(this.__tf1.getValid());
      this.assertFalse(this.__tf2.getValid());

      // correct the values
      this.__tf1.setValue("a");
      this.__tf2.setValue("ab@cd.ef");

      // validation should be ok
      this.assertTrue(this.__form.validate());
      this.assertTrue(this.__tf1.getValid());
      this.assertTrue(this.__tf2.getValid());

      // check the validation manager itself
      this.assertTrue(this.__form.getValidationManager().validate());
    },


    testAddTwoWithHeader : function() {
      this.__form.addGroupHeader("affe");

      // add the widgets
      this.__form.add(this.__tf1, "TF1");
      this.__form.add(this.__tf2, "TF2");

      // get the view
      var view = this.__form.createView(qx.test.DummyFormRenderer);

      // check the items
      this.assertEquals(view.groups[0].items[0], this.__tf1);
      this.assertEquals(view.groups[0].items[1], this.__tf2);

      // check the names
      this.assertEquals(view.groups[0].names[0], "TF1");
      this.assertEquals(view.groups[0].names[1], "TF2");

      // check the title
      this.assertEquals("affe", view.groups[0].title);
    },


    testAddTwoWithTwoGroups : function() {
      this.__form.addGroupHeader("affe");
      this.__form.add(this.__tf1, "TF1");
      this.__form.addGroupHeader("affee");
      this.__form.add(this.__tf2, "TF2");

      // get the view
      var view = this.__form.createView(qx.test.DummyFormRenderer);

      // check the items
      this.assertEquals(view.groups[0].items[0], this.__tf1);
      this.assertEquals(view.groups[1].items[0], this.__tf2);

      // check the names
      this.assertEquals(view.groups[0].names[0], "TF1");
      this.assertEquals(view.groups[1].names[0], "TF2");

      // check the title
      this.assertEquals("affe", view.groups[0].title);
      this.assertEquals("affee", view.groups[1].title);
    },

    testAddTwoButtons : function() {
      var b1 = new qx.ui.form.Button();
      var b2 = new qx.ui.form.RepeatButton();

      this.__form.addButton(b1);
      this.__form.addButton(b2);

      // get the view
      var view = this.__form.createView(qx.test.DummyFormRenderer);

      // check the buttons
      this.assertEquals(b1, view.buttons[0]);
      this.assertEquals(b2, view.buttons[1]);

      b2.dispose();
      b1.dispose();
    },

    testAddTwoWithButtons : function() {
      var b1 = new qx.ui.form.Button();
      var b2 = new qx.ui.form.RepeatButton();

      // add the widgets
      this.__form.add(this.__tf1, "TF1");
      this.__form.addButton(b1);
      this.__form.add(this.__tf2, "TF2");
      this.__form.addButton(b2);

      // get the view
      var view = this.__form.createView(qx.test.DummyFormRenderer);

      // check the items
      this.assertEquals(view.groups[0].items[0], this.__tf1);
      this.assertEquals(view.groups[0].items[1], this.__tf2);

      // check the names
      this.assertEquals(view.groups[0].names[0], "TF1");
      this.assertEquals(view.groups[0].names[1], "TF2");

      // check the buttons
      this.assertEquals(b1, view.buttons[0]);
      this.assertEquals(b2, view.buttons[1]);

      b2.dispose();
      b1.dispose();
    },

    testDefaultRenderer : function() {
      var b1 = new qx.ui.form.Button();
      var b2 = new qx.ui.form.RepeatButton();

      // add the widgets
      this.__form.add(this.__tf1, "TF1");
      this.__form.addButton(b1);
      this.__form.add(this.__tf2, "TF2");
      this.__form.addButton(b2);

      // get the view
      var view = this.__form.createView();

      view.destroy();
      b2.dispose();
      b1.dispose();
    },


    testResetter : function() {
      // set the init values of the textfields
      this.__tf1.setValue("aaaa");
      this.__tf2.setValue("bbbb");

      // add the widgets
      this.__form.add(this.__tf1, "TF1");
      this.__form.add(this.__tf2, "TF2");

      // set some other values
      this.__tf1.setValue("111");
      this.__tf2.setValue("222");

      this.__form.reset();

      // check
      this.assertEquals("aaaa", this.__tf1.getValue());
      this.assertEquals("bbbb", this.__tf2.getValue());
    },


    testAll : function() {
      var widgets = [];
      widgets.push(new qx.ui.control.DateChooser());
      widgets.push(new qx.ui.form.CheckBox());
      widgets.push(new qx.ui.form.ComboBox());
      widgets.push(new qx.ui.form.DateField());
      widgets.push(new qx.ui.form.List());
      widgets.push(new qx.ui.form.PasswordField());
      widgets.push(new qx.ui.form.RadioButton());
      widgets.push(new qx.ui.form.SelectBox());
      widgets.push(new qx.ui.form.Slider());
      widgets.push(new qx.ui.form.Spinner());
      widgets.push(new qx.ui.form.TextArea());
      widgets.push(new qx.ui.form.TextField());
      widgets.push(new qx.ui.groupbox.CheckGroupBox());
      widgets.push(new qx.ui.form.RadioButtonGroup());
      widgets.push(new qx.ui.groupbox.RadioGroupBox());

      // add all
      for (var i = 0; i < widgets.length; i++) {
        this.__form.add(widgets[i], "name" + i);
      }

      // create a test renderer (default)
      this.__form.createView();

      // reset
      this.__form.reset();

      // validate
      this.assertTrue(this.__form.validate());

      // get rid of the widgets
      for (var i = 0; i < widgets.length; i++) {
        widgets[i].dispose();
      }
    },


    testGetItems : function() {
      // add the widgets
      this.__form.add(this.__tf1, "TF1", null, "a");
      this.__form.add(this.__tf2, "TF2", null, "b");

      var items = this.__form.getItems();

      this.assertEquals(items.a, this.__tf1);
      this.assertEquals(items.b, this.__tf2);
    },


    testGetItemsFallback : function() {
      // add the widgets
      this.__form.add(this.__tf1, "TF1");
      this.__form.add(this.__tf2, "T F 2");

      var items = this.__form.getItems();

      this.assertEquals(items.TF1, this.__tf1);
      this.assertEquals(items.TF2, this.__tf2);
    },


    testGetItemsMixedWithGroups : function() {
      // add the widgets
      this.__form.add(this.__tf1, "TF1");
      this.__form.add(this.__tf2, "TF2", null, "b");
      this.__form.addGroupHeader("x");
      var tf3 = new qx.ui.form.TextField();
      this.__form.add(tf3, "TF3");

      var items = this.__form.getItems();

      this.assertEquals(items.TF1, this.__tf1);
      this.assertEquals(items.b, this.__tf2);
      this.assertEquals(items.TF3, tf3);

      tf3.destroy();
    }

  }
});
