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

qx.Class.define("qx.test.util.Serializer",
{
  extend : qx.dev.unit.TestCase,

  construct : function() {
    this.__s = qx.util.Serializer;

    qx.Class.define("qx.test.SerializModel", {
      extend : qx.core.Object,
      properties : {
        data1 : {
          nullable: true
        },

        data2 : {
          nullable: true
        },

        data3 : {
          nullable: true
        }
      }
    });
  },

  members :
  {
    __model: null,
    __s: null,


    setUp : function() {
      this.__model = new qx.test.SerializModel();
    },

    tearDown : function() {
      this.__model.dispose();
    },


    testUrlString : function() {
      this.__model.setData1("a");
      this.__model.setData2("b");
      this.__model.setData3("c");
      this.assertEquals("data1=a&data2=b&data3=c", this.__s.toUriParameter(this.__model));

      this.__model.setData1("A");
      this.__model.setData2("B");
      this.__model.setData3("C");
      this.assertEquals("data1=A&data2=B&data3=C", this.__s.toUriParameter(this.__model));

      this.__model.setData1("1");
      this.__model.setData2("11");
      this.__model.setData3("111");
      this.assertEquals("data1=1&data2=11&data3=111", this.__s.toUriParameter(this.__model));
    },

    testUrlStringEncoded : function() {
      this.__model.setData1("ä");
      this.__model.setData2("ö");
      this.__model.setData3("ü");
      this.assertEquals("data1=%C3%A4&data2=%C3%B6&data3=%C3%BC", this.__s.toUriParameter(this.__model));

      this.__model.setData1("–");
      this.__model.setData2(" ");
      this.__model.setData3("ß");
      this.assertEquals("data1=%E2%80%93&data2=%20&data3=%C3%9F", this.__s.toUriParameter(this.__model));
    },

    testUrlBoolean : function() {
      this.__model.setData1(true);
      this.__model.setData2(false);
      this.__model.setData3(null);
      this.assertEquals("data1=true&data2=false&data3=null", this.__s.toUriParameter(this.__model));
    },

    testUrlNumber : function() {
      this.__model.setData1(10);
      this.__model.setData2(-15.3443);
      this.__model.setData3(Number.NaN);
      this.assertEquals("data1=10&data2=-15.3443&data3=NaN", this.__s.toUriParameter(this.__model));
    },


    testUrlKeyEncoded : function() {
      qx.Class.define("qx.test.SerializModelEnc", {
        extend: qx.core.Object,
        properties : {
          "äüö" : {
            init: "ÄÜÖ"
          }
        }
      });
      var model = new qx.test.SerializModelEnc();

      this.assertEquals("%C3%A4%C3%BC%C3%B6=%C3%84%C3%9C%C3%96", this.__s.toUriParameter(model));

      model.dispose();
    },


    testUrlQxSerializer : function()
    {
      var qxSerializer = function(object) {
        return object.getLabel();
      }

      var item = new qx.ui.form.ListItem("a");
      this.__model.setData1(item);
      this.__model.setData2("b");
      this.__model.setData3("c");
      this.assertEquals("data1=a&data2=b&data3=c", this.__s.toUriParameter(this.__model, qxSerializer));

      item.dispose();
    },


    testJsonFlat : function() {
      this.__model.setData1("a");
      this.__model.setData2(10.456);
      this.__model.setData3(true);
      this.assertEquals('{"data1":"a","data2":10.456,"data3":true}', this.__s.toJson(this.__model));
    },


    testJsonExp : function() {
      var date = new Date(1000);
      this.__model.setData1(date);
      this.__model.setData2(/[0]/);
      this.__model.setData3(45e12);
      this.assertEquals('{"data1":"' + date + '","data2":"/[0]/","data3":45000000000000}', this.__s.toJson(this.__model));
    },


    testJsonDeep2 : function() {
      var model = new qx.test.SerializModel();
      model.setData1("a");
      model.setData2(11);
      model.setData3(false);

      this.__model.setData1(model);
      this.__model.setData3(null);
      this.assertEquals('{"data1":{"data1":"a","data2":11,"data3":false},"data2":null,"data3":null}', this.__s.toJson(this.__model));

      model.dispose();
    },


    testJsonArray : function() {
      this.__model.setData1([12, 1]);
      this.__model.setData2(["a", "b"]);
      this.__model.setData3([true, false]);
      this.assertEquals('{"data1":[12,1],"data2":["a","b"],"data3":[true,false]}', this.__s.toJson(this.__model));
    },

    testJsonDataArray : function() {
      this.__model.setData1(new qx.data.Array([12, 1]));
      this.__model.setData2(new qx.data.Array(["a", "b"]));
      this.__model.setData3(new qx.data.Array([true, false]));
      this.assertEquals('{"data1":[12,1],"data2":["a","b"],"data3":[true,false]}', this.__s.toJson(this.__model));

      this.__model.getData1().dispose();
      this.__model.getData2().dispose();
      this.__model.getData3().dispose();
    },

    testJsonBig : function() {
      var model = new qx.ui.core.Widget();
      this.__s.toJson(model);
      model.dispose();
    },


    testJsonEmpty : function() {
      this.__model.setData1(new qx.data.Array());
      this.__model.setData2([]);
      this.__model.setData3(this);
      this.assertEquals('{"data1":[],"data2":[],"data3":{}}', this.__s.toJson(this.__model));

      this.__model.getData1().dispose();
    },


    testJsonEscape : function() {
      this.__model.setData1("''");
      this.__model.setData2('""');
      this.__model.setData3("\b\t\n\f\r\\");
      this.assertEquals('{"data1":"\'\'","data2":"\\"\\"","data3":"\\b\\t\\n\\f\\r\\\\"}', this.__s.toJson(this.__model));
    },

    testJsonQxSerializer : function()
    {
      var qxSerializer = function(object) {
        if (object instanceof qx.ui.form.ListItem) {
          return object.getLabel();
        }
      }

      var item = new qx.ui.form.ListItem("a");
      this.__model.setData1(item);
      this.__model.setData2(10.456);
      this.__model.setData3(true);
      this.assertEquals('{"data1":"a","data2":10.456,"data3":true}', this.__s.toJson(this.__model, qxSerializer));

      item.dispose();
    },

    testJsonWithMarshaler : function()
    {
      this.__model.setData1("a");
      this.__model.setData2(["b"]);
      this.__model.setData3("c");

      var json = this.__s.toJson(this.__model);
      var model = qx.data.marshal.Json.createModel(qx.util.Json.parse(json));

      this.assertEquals(this.__model.getData1(), model.getData1());
      this.assertEquals(this.__model.getData2()[0], model.getData2().getItem(0));
      this.assertEquals(this.__model.getData3(), model.getData3());
    }

  }
});
