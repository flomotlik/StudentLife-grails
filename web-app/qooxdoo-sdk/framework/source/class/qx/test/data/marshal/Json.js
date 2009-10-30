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

/* ************************************************************************

#asset(qx/test/*)

************************************************************************ */

qx.Class.define("qx.test.data.marshal.Json",
{
  extend : qx.dev.unit.TestCase,

  members :
  {
    __marshaler : null,
    __data : null,
    __propertyNames : null,

    setUp : function()
    {
      this.__marshaler = new qx.data.marshal.Json();

      this.__data = eval("({s: 'String', n: 12, b: true})");
      this.__propertyNames = ["s", "n", "b"];
    },


    tearDown : function()
    {
      this.__marshaler.dispose();

      // remove the former created classes
      qx.data.model = {};
      for (var name in qx.Class.$$registry) {
        if (name.search("qx.data.model") != -1) {
          delete qx.Class.$$registry[name];
        }
      }
    },


    testClassCreationSingle: function() {
      this.__marshaler.toClass(this.__data);

      // check if the class is defined
      this.assertTrue(qx.Class.isDefined('qx.data.model.b"n"s'), "Class not created.");

      var clazz = qx.Class.getByName('qx.data.model.b"n"s');
      // check for the properties
      var i = 0;
      for (var name in clazz.$$properties) {
        this.assertEquals(this.__propertyNames[i], name, "Property " + i + "does have the wrong name.");
        this.assertEquals("change" + qx.lang.String.firstUp(this.__propertyNames[i]), clazz.$$properties[name].event, "event has a wrong name.");
        i++;
      }
    },


    testClassCreationArray: function() {
      this.__data = eval("({a: ['a', 'b', 'c']})");

      this.__marshaler.toClass(this.__data);

      // check if the class is defined
      this.assertTrue(qx.Class.isDefined("qx.data.model.a"), "Class not created.");

      var clazz = qx.Class.getByName("qx.data.model.a");
      // check for the property
      this.assertNotNull(clazz.$$properties.a, "Property does not exist.");
    },


    testClassCreationObject: function() {
      this.__data = eval("({a: {b: 'test'}})");

      this.__marshaler.toClass(this.__data);

      // check if the classes are defined
      this.assertTrue(qx.Class.isDefined("qx.data.model.a"), "Class not created.");
      this.assertTrue(qx.Class.isDefined("qx.data.model.b"), "Class not created.");


      var clazz = qx.Class.getByName("qx.data.model.a");
      var clazz2 = qx.Class.getByName("qx.data.model.b");
      // check for the property
      this.assertNotNull(clazz.$$properties.a, "Property does not exist.");
      this.assertNotNull(clazz2.$$properties.b, "Property does not exist.");
    },


    testClassCreationArrayWithObject: function() {
      this.__data = eval("({a: [{b: 'test'}, {b: 'test'}]})");

      this.__marshaler.toClass(this.__data);

      // check if the classes are defined
      this.assertTrue(qx.Class.isDefined("qx.data.model.a"), "Class not created.");
      this.assertTrue(qx.Class.isDefined("qx.data.model.b"), "Class not created.");

      var clazz = qx.Class.getByName("qx.data.model.a");
      var clazz2 = qx.Class.getByName("qx.data.model.b");
      // check for the property
      this.assertNotNull(clazz.$$properties.a, "Property does not exist.");
      this.assertNotNull(clazz2.$$properties.b, "Property does not exist.");
    },


    testClassCreationAllSmoke: function() {
      this.__data = eval("({a: [{b: 'test', c: ['f', 'x', 'e']}, {b: 'test', affe: false}], t: {f: null, r: 152, q: true}})");
      this.__marshaler.toClass(this.__data);
    },


    testModelWithNumber: function() {
      this.__data = eval("({a: 10, b: -15, c: 10.5e10})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the model
      this.assertEquals(10, model.getA(), "getA does not work.");
      this.assertEquals(-15, model.getB(), "getB does not work.");
      this.assertEquals(10.5e10, model.getC(), "getC does not work.");
    },


    testModelWithBoolean: function() {
      this.__data = eval("({a: true, b: false})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the model
      this.assertEquals(true, model.getA(), "getA does not work.");
      this.assertEquals(false, model.getB(), "getB does not work.");
    },


    testModelWithString: function() {
      this.__data = eval("({a: 'affe', b: 'AFFE'})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the model
      this.assertEquals("affe", model.getA(), "getA does not work.");
      this.assertEquals("AFFE", model.getB(), "getB does not work.");
    },


    testModelWithPrimitive: function() {
      this.__data = eval("({a: 'affe', b: true, c: 156})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the model
      this.assertEquals("affe", model.getA(), "getA does not work.");
      this.assertEquals(true, model.getB(), "getB does not work.");
      this.assertEquals(156, model.getC(), "getC does not work.");
    },


    testModelWithArrayPrimitive: function() {
      this.__data = eval("({a: ['affe', 'affen', 'AFFE']})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the model
      var a = model.getA();
      this.assertNotNull(a, "Nothing stored in the property a.");
      this.assertEquals("qx.data.Array", a.classname, "Its not an data array.");
      this.assertEquals("affe", a.getItem(0), "Item 0 is wrong");
      this.assertEquals("affen", a.getItem(1), "Item 1 is wrong");
      this.assertEquals("AFFE", a.getItem(2), "Item 2 is wrong");
    },


    testModelWithArrayArray: function() {
      this.__data = eval("({a: [[true, false], [10, 15]]})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the model
      var a = model.getA();
      this.assertNotNull(a, "Nothing stored in the property a.");
      this.assertEquals("qx.data.Array", a.classname, "Its not an data array.");

      var a0 = a.getItem(0);
      this.assertEquals("qx.data.Array", a0.classname, "Its not an data array.");
      this.assertEquals(true, a0.getItem(0), "Item 0 is wrong");
      this.assertEquals(false, a0.getItem(1), "Item 1 is wrong");

      var a1 = a.getItem(1);
      this.assertEquals("qx.data.Array", a1.classname, "Its not an data array.");
      this.assertEquals(10, a1.getItem(0), "Item 0 is wrong");
      this.assertEquals(15, a1.getItem(1), "Item 1 is wrong");
    },


    testModelWithObjectPrimitive: function() {
      this.__data = eval("({a: {b: true, bb: false}, aa: {c: 15, cc: -89}})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the model
      var a = model.getA();
      this.assertNotNull(a, "Nothing stored in the property a.");
      this.assertEquals(true, a.getB(), "b is not set");
      this.assertEquals(false, a.getBb(), "bb is not set");

      var aa = model.getAa();
      this.assertNotNull(aa, "Nothing stored in the property a.");
      this.assertEquals(15, aa.getC(), "c is not set");
      this.assertEquals(-89, aa.getCc(), "cc is not set");
    },


    testModelWithObjectArray: function() {
      this.__data = eval("({a: {b: ['affe', 'AFFE']}})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the model
      var a = model.getA();
      this.assertNotNull(a, "Nothing stored in the property a.");
      var b = a.getB();
      this.assertNotNull(b, "Nothing stored in the property b.");
      this.assertEquals("qx.data.Array", b.classname, "b is not an data array");
      this.assertEquals("affe", b.getItem(0), "Item 0 is wrong.");
      this.assertEquals("AFFE", b.getItem(1), "Item 1 is wrong.");
    },


    testModelWithArrayObject: function() {
      this.__data = eval("({a: [{a: 15}, {a: true}]})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the model
      var a = model.getA();
      this.assertNotNull(a, "Nothing stored in the property a.");
      this.assertEquals("qx.data.Array", a.classname, "b is not an data array");

      this.assertEquals(15, a.getItem(0).getA(), "Item 0 is wrong.");
      this.assertEquals(true, a.getItem(1).getA(), "Item 1 is wrong.");

      // check if only one class is created and used
      this.assertEquals(model.classname, a.getItem(0).classname, "Differen classes");
      this.assertEquals(model.classname, a.getItem(1).classname, "Differen classes");
      this.assertEquals(a.getItem(0).classname, a.getItem(1).classname, "Differen classes");
    },


    testModelWithObjectObject: function() {
      this.__data = eval("({a: {a: {a: 'affe'}}})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the model
      this.assertEquals("affe", model.getA().getA().getA(), "No affe is there!");
    },


    testModelWithAllSmoke: function() {
      this.__data = eval("({a: [{aa: ['affe'], ab: false, ac: []}, {}, true, 15, 'affe'], b: 'Affe', c: {ca: 156, cb: [null, null], cc: true}})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      this.assertNotNull(model, "No model set.");
    },


    testBubbleEventsDepth1: function() {
      this.__data = eval("({a: 10, b: -15, c: 10.5e10})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data, true);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the event for a
      var self = this;
      this.assertEventFired(model, "changeBubble", function() {
        model.setA(0);
      }, function(e) {
        self.assertEquals(0, e.getData().value, "Not the right value in the event.");
        self.assertEquals(10, e.getData().old, "Not the right old value in the event.");
        self.assertEquals("a", e.getData().name, "Not the right name in the event.");
      }, "Change event not fired!");

      // check the event for b
      this.assertEventFired(model, "changeBubble", function() {
        model.setB(0);
      }, function(e) {
        self.assertEquals(0, e.getData().value, "Not the right value in the event.");
        self.assertEquals(-15, e.getData().old, "Not the right old value in the event.");
        self.assertEquals("b", e.getData().name, "Not the right name in the event.");
      }, "Change event not fired!");
    },


    testBubbleEventsDepth2: function() {
      this.__data = eval("({a: {b: 10, c: 20}})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data, true);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the event for b
      var self = this;
      this.assertEventFired(model, "changeBubble", function() {
        model.getA().setB(0);
      }, function(e) {
        self.assertEquals(0, e.getData().value, "Not the right value in the event.");
        self.assertEquals(10, e.getData().old, "Not the right old value in the event.");
        self.assertEquals("a.b", e.getData().name, "Not the right name in the event.");
      }, "Change event not fired!");

      // check the event for a
      this.assertEventFired(model, "changeBubble", function() {
        model.setA(true);
      }, function(e) {
        self.assertEquals(true, e.getData().value, "Not the right value in the event.");
        self.assertEquals("a", e.getData().name, "Not the right name in the event.");
      }, "Change event not fired!");
    },


    testBubbleEventsDepth3: function() {
      this.__data = eval("({a: {b: {c: 10}}})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data, true);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the event for c
      var self = this;
      this.assertEventFired(model, "changeBubble", function() {
        model.getA().getB().setC(0);
      }, function(e) {
        self.assertEquals(0, e.getData().value, "Not the right value in the event.");
        self.assertEquals(10, e.getData().old, "Not the right old value in the event.");
        self.assertEquals("a.b.c", e.getData().name, "Not the right name in the event.");
      }, "Change event not fired!");
    },


    testBubbleEventsArrayDepth1: function() {
      this.__data = eval("({a: [12, 23, 34]})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data, true);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the event for the first array element
      var self = this;
      this.assertEventFired(model, "changeBubble", function() {
        model.getA().setItem(0, 1);
      }, function(e) {
        self.assertEquals(1, e.getData().value, "Not the right value in the event.");
        self.assertEquals("a[0]", e.getData().name, "Not the right name in the event.");
      }, "Change event not fired!");
    },


    testBubbleEventsArrayDepth2: function() {
      this.__data = eval("({a: [{b: 10}, {b: 11}]})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data, true);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the event for the first array element
      var self = this;
      this.assertEventFired(model, "changeBubble", function() {
        model.getA().getItem(0).setB(0);
      }, function(e) {
        self.assertEquals(0, e.getData().value, "Not the right value in the event.");
        self.assertEquals("a[0].b", e.getData().name, "Not the right name in the event.");
      }, "Change event not fired!");
    },


    testBubbleEventsArrayDepthAlot: function() {
      this.__data = eval("({a: [[[[{b:10}]]]]})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data, true);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the event for the first array element
      var self = this;
      this.assertEventFired(model, "changeBubble", function() {
        model.getA().getItem(0).getItem(0).getItem(0).getItem(0).setB(0);
      }, function(e) {
        self.assertEquals(0, e.getData().value, "Not the right value in the event.");
        self.assertEquals("a[0][0][0][0].b", e.getData().name, "Not the right name in the event.");
      }, "Change event not fired!");
    },


    testBubbleEventsArrayDepthAlotMix: function() {
      this.__data = eval("({a: [ {b: [ [{c: {d: [0, 1]}}] ]} ]})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data, true);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the event for the first array element
      var self = this;
      this.assertEventFired(model, "changeBubble", function() {
        model.getA().getItem(0).getB().getItem(0).getItem(0).getC().getD().setItem(1, 12);
      }, function(e) {
        self.assertEquals(12, e.getData().value, "Not the right value in the event.");
        self.assertEquals("a[0].b[0][0].c.d[1]", e.getData().name, "Not the right name in the event.");
      }, "Change event not fired!");
    },


    testBubbleEventsArrayLong: function() {
      this.__data = eval("({a: [0, 1, 2, 3, 4, 5, 6 , 7, 8, 9, 10]})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data, true);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      // check the event for the first array element
      var self = this;
      this.assertEventFired(model, "changeBubble", function() {
        model.getA().setItem(10, "AFFE");
      }, function(e) {
        self.assertEquals("AFFE", e.getData().value, "Not the right value in the event.");
        self.assertEquals("a[10]", e.getData().name, "Not the right name in the event.");
      }, "Change event not fired!");
    },


    testBubbleEventsArrayReorder: function() {
      this.__data = eval("({a: [11, 1, 2, 3, 4, 5, 6 , 7, 8, 9, 10]})");
      // first create the classes befor setting the data
      this.__marshaler.toClass(this.__data, true);
      // set the data
      var model = this.__marshaler.toModel(this.__data);

      model.getA().sort();

      // check the event for the first array element
      var self = this;
      this.assertEventFired(model, "changeBubble", function() {
        model.getA().setItem(0, "AFFE");
      }, function(e) {
        self.assertEquals("AFFE", e.getData().value, "Not the right value in the event.");
        self.assertEquals("a[0]", e.getData().name, "Not the right name in the event.");
      }, "Change event not fired!");
    },

    testBubbleEventsWithRemove: function() {
      qx.Class.define("qx.Test", {
        extend : qx.core.Object,
        include : qx.data.marshal.MEventBubbling,
        properties : {
          fonts: {
            "event": "changeFonts",
            "check": "qx.data.Array",
            "apply": "_applyEventPropagation"
          }
        }
      });

      var model = new qx.Test();
      model.setFonts(new qx.data.Array());
      model.getFonts().push("one", "two", "three");

      var i = 0;
      var names = ["fonts[0]", "fonts[1]", "fonts[2]"];
      var olds = ["one", "two", "three"];
      model.addListener("changeBubble", function(e) {
        this.assertEquals(names[i], e.getData().name, "Wrong name in " + i);
        this.assertEquals(olds[i], e.getData().old, "Wrong old data in " + i);
        this.assertNull(e.getData().value, "Wrong data in " + i);
        i++;
      }, this);

      // remove all
      model.getFonts().removeAll();

      this.assertEquals(0, model.getFonts().length, "The remove did not work.");
    }

  }
});