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

qx.Class.define("qx.test.lang.Object",
{
  extend : qx.dev.unit.TestCase,

  members :
  {
    testObject : function() {
      this.assertNotUndefined(qx.lang.Object);
    },


    testEmpty : function()
    {
      var object = {a: 1};
      qx.lang.Object.empty(object);
      this.assertTrue(qx.lang.Object.isEmpty(object));

      var object = {};
      qx.lang.Object.empty(object);
      this.assertTrue(qx.lang.Object.isEmpty(object));
    },


    testIsEmpty : function()
    {
      this.assertEquals(true, qx.lang.Object.isEmpty({}));
      this.assertEquals(false, qx.lang.Object.isEmpty({a:undefined}));
      this.assertEquals(false, qx.lang.Object.isEmpty({a:null}));
      this.assertEquals(false, qx.lang.Object.isEmpty({a:1}));
    },


    testHasMinLength : function()
    {
      var object = {};
      this.assertTrue(qx.lang.Object.hasMinLength(object, 0));
      this.assertFalse(qx.lang.Object.hasMinLength(object, 1));

      var object = {a: 1};
      this.assertTrue(qx.lang.Object.hasMinLength(object, 1));
      this.assertFalse(qx.lang.Object.hasMinLength(object, 2));

      var object = {a:undefined, b: null, c: 1};
      this.assertTrue(qx.lang.Object.hasMinLength(object, 3));
      this.assertFalse(qx.lang.Object.hasMinLength(object, 4));
    },


    testGetLength : function()
    {
      var object = {};
      this.assertEquals(0, qx.lang.Object.getLength(object));

      var object = {a: 1};
      this.assertEquals(1, qx.lang.Object.getLength(object));

      var object = {a:undefined, b: null, c: 1};
      this.assertEquals(3, qx.lang.Object.getLength(object));
    },


    testGetKeys : function()
    {
      var object = {
        a: undefined,
        b: null,
        c: 1
      }
      this.assertArrayEquals(
        ["a", "b", "c"].sort(),
        qx.lang.Object.getKeys(object).sort()
      );

      var object = {}
      this.assertArrayEquals(
        [],
        qx.lang.Object.getKeys(object)
      );

      var object = {
        "isPrototypeOf": 1,
        "hasOwnProperty": 1,
        "toLocaleString": 1,
        "toString": 1,
        "valueOf": 1
      };
      this.assertArrayEquals(
        [
          "isPrototypeOf",
          "hasOwnProperty",
          "toLocaleString",
          "toString",
          "valueOf"
        ].sort(),
        qx.lang.Object.getKeys(object).sort()
      );
    },


    testGetKeysAsString : function()
    {
      var object = {
        a: undefined,
        b: null,
        c: 1
      }
      this.assertEquals(
        '"a", "b", "c"',
        qx.lang.Object.getKeysAsString(object)
      );

      var object = {}
      this.assertEquals(
        '',
        qx.lang.Object.getKeysAsString(object)
      );

      var object = {
        "isPrototypeOf": 1,
        "hasOwnProperty": 1,
        "toLocaleString": 1,
        "toString": 1,
        "valueOf": 1
      };
      this.assertEquals(
        '"isPrototypeOf", "hasOwnProperty", "toLocaleString", "toString", "valueOf"',
        qx.lang.Object.getKeysAsString(object)
      );
    },


    testGetValues : function()
    {
      var object = {
        a: undefined,
        b: null,
        c: 1
      }
      this.assertArrayEquals(
        [undefined, null, 1].sort(),
        qx.lang.Object.getValues(object).sort()
      );

      var object = {}
      this.assertArrayEquals(
        [],
        qx.lang.Object.getValues(object)
      );

      var object = {
        "isPrototypeOf": 1,
        "hasOwnProperty": 2,
        "toLocaleString": 3,
        "toString": 4,
        "valueOf": 5
      };
      this.assertArrayEquals(
        [1, 2, 3, 4, 5].sort(),
        qx.lang.Object.getValues(object).sort()
      );
    },


    testMergeWith : function() {
      this.warn("needs test!");
    },


    testCarefullyMergeWith : function() {
      this.warn("needs test!");
    },


    testMerge : function() {
      this.warn("needs test!");
    },


    testClone : function() {
      this.warn("needs test!");
    },


    testInvert : function()
    {
      this.assertNotUndefined(qx.lang.Object.invert);
      var Obj = qx.lang.Object;

      this.assertJsonEquals(
      {
        a   : "1",
        "2" : "b"
      },
      Obj.invert(
      {
        1 : "a",
        b : 2
      }));
    },


    testGetKeyFromValue : function() {
      this.warn("needs test!");
    },


    testContains : function() {
      this.warn("needs test!");
    },


    testSelect : function() {
      this.warn("needs test!");
    },


    testFromArray : function() {
      this.warn("needs test!");
    },

    /**
     * Some behavior, which must be consistent in all browsers for some
     * assertions to work.
     */
    testObjectAssertions : function()
    {
      var objConstructor = ({}).constructor;

      this.assertIdentical(({a: 12}).constructor, objConstructor);
      this.assertIdentical(new Object().constructor, objConstructor);

      this.assertNotIdentical(new qx.core.Object().constructor, objConstructor);
      this.assertNotIdentical((1).constructor, objConstructor);
      this.assertNotIdentical(("Juhu").constructor, objConstructor);
      this.assertNotIdentical((/abc/).constructor, objConstructor);
    }
  }
});
