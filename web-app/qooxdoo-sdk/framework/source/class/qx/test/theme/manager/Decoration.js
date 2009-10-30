/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

qx.Class.define("qx.test.theme.manager.Decoration",
{
  extend : qx.dev.unit.TestCase,

  members :
  {
    setUp : function() {
      this.manager = qx.theme.manager.Decoration.getInstance();
    },

    tearDown : function()
    {
      qx.test.Theme.themes = null;
      this.manager.setTheme(null);
    },


    testAlias : function()
    {
      qx.Theme.define("qx.test.Theme.themes.A", {
        aliases : {
          decoration: "test/decoration",
          custom : "test/custom"
        },
        decorations : {}
      });

      this.manager.setTheme(qx.test.Theme.themes.A);

      // make sure the decoration alias is set
      var alias = qx.util.AliasManager.getInstance();
      this.assertEquals("test/decoration", alias.resolve("decoration"));
      this.assertEquals("test/custom", alias.resolve("custom"));
    },


    testAliasExtend : function()
    {
      qx.Theme.define("qx.test.Theme.themes.A", {
        aliases : {
          decoration: "test/decoration",
          custom : "test/custom"
        },
        decorations : {}
      });

      qx.Theme.define("qx.test.Theme.themes.B", {
        extend : qx.test.Theme.themes.A,
        decorations : {}
      });

      this.manager.setTheme(qx.test.Theme.themes.B);

      // make sure the decoration alias is set
      var alias = qx.util.AliasManager.getInstance();
      this.assertEquals("test/decoration", alias.resolve("decoration"));
      this.assertEquals("test/custom", alias.resolve("custom"));
    },


    testAliasOverride : function()
    {
      qx.Theme.define("qx.test.Theme.themes.A", {
        aliases : {
          decoration: "test/decoration",
          custom : "test/custom"
        },
        decorations : {}
      });

      qx.Theme.define("qx.test.Theme.themes.B", {
        extend : qx.test.Theme.themes.A,
        aliases : {
          decoration: "juhu/decoration"
        },
        decorations : {}
      });

      this.manager.setTheme(qx.test.Theme.themes.B);

      // make sure the decoration alias is set
      var alias = qx.util.AliasManager.getInstance();
      this.assertEquals("juhu/decoration", alias.resolve("decoration"));
      this.assertEquals("test/custom", alias.resolve("custom"));
    },


    testResource : function()
    {
      qx.Theme.define("qx.test.Theme.themes.A", {
        resource : "test/decoration",
        decorations : {}
      });

      this.manager.setTheme(qx.test.Theme.themes.A);

      // make sure the decoration alias is set
      var alias = qx.util.AliasManager.getInstance();
      this.assertEquals("test/decoration", alias.resolve("decoration"));
    },


    testResourceExtend : function()
    {
      qx.Theme.define("qx.test.Theme.themes.A", {
        resource : "test/decoration",
        decorations : {}
      });

      qx.Theme.define("qx.test.Theme.themes.B", {
        extend : qx.test.Theme.themes.A,
        decorations : {}
      });

      this.manager.setTheme(qx.test.Theme.themes.B);

      // make sure the decoration alias is set
      var alias = qx.util.AliasManager.getInstance();
      this.assertEquals("test/decoration", alias.resolve("decoration"));
    },


    testResourceOverride : function()
    {
      qx.Theme.define("qx.test.Theme.themes.A", {
        resource : "test/decoration",
        decorations : {}
      });

      qx.Theme.define("qx.test.Theme.themes.B", {
        extend : qx.test.Theme.themes.A,
        resource : "juhu/decoration",
        decorations : {}
      });

      this.manager.setTheme(qx.test.Theme.themes.B);

      // make sure the decoration alias is set
      var alias = qx.util.AliasManager.getInstance();
      this.assertEquals("juhu/decoration", alias.resolve("decoration"));
    }
  }
});
