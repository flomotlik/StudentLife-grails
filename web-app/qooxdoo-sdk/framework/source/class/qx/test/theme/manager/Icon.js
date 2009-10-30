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

qx.Class.define("qx.test.theme.manager.Icon",
{
  extend : qx.dev.unit.TestCase,

  members :
  {
    setUp : function() {
      this.manager = qx.theme.manager.Icon.getInstance();
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
          icon: "test/icon",
          custom : "test/custom"
        },
        icons : {}
      });

      this.manager.setTheme(qx.test.Theme.themes.A);

      // make sure the icon alias is set
      var alias = qx.util.AliasManager.getInstance();
      this.assertEquals("test/icon", alias.resolve("icon"));
      this.assertEquals("test/custom", alias.resolve("custom"));
    },


    testAliasExtend : function()
    {
      qx.Theme.define("qx.test.Theme.themes.A", {
        aliases : {
          icon: "test/icon",
          custom : "test/custom"
        },
        icons : {}
      });

      qx.Theme.define("qx.test.Theme.themes.B", {
        extend : qx.test.Theme.themes.A,
        icons : {}
      });

      this.manager.setTheme(qx.test.Theme.themes.B);

      // make sure the icon alias is set
      var alias = qx.util.AliasManager.getInstance();
      this.assertEquals("test/icon", alias.resolve("icon"));
      this.assertEquals("test/custom", alias.resolve("custom"));
    },


    testAliasOverride : function()
    {
      qx.Theme.define("qx.test.Theme.themes.A", {
        aliases : {
          icon: "test/icon",
          custom : "test/custom"
        },
        icons : {}
      });

      qx.Theme.define("qx.test.Theme.themes.B", {
        extend : qx.test.Theme.themes.A,
        aliases : {
          icon: "juhu/icon"
        },
        icons : {}
      });

      this.manager.setTheme(qx.test.Theme.themes.B);

      // make sure the icon alias is set
      var alias = qx.util.AliasManager.getInstance();
      this.assertEquals("juhu/icon", alias.resolve("icon"));
      this.assertEquals("test/custom", alias.resolve("custom"));
    },


    testResource : function()
    {
      qx.Theme.define("qx.test.Theme.themes.A", {
        resource : "test/icon",
        icons : {}
      });

      this.manager.setTheme(qx.test.Theme.themes.A);

      // make sure the icon alias is set
      var alias = qx.util.AliasManager.getInstance();
      this.assertEquals("test/icon", alias.resolve("icon"));
    },


    testResourceExtend : function()
    {
      qx.Theme.define("qx.test.Theme.themes.A", {
        resource : "test/icon",
        icons : {}
      });

      qx.Theme.define("qx.test.Theme.themes.B", {
        extend : qx.test.Theme.themes.A,
        icons : {}
      });

      this.manager.setTheme(qx.test.Theme.themes.B);

      // make sure the icon alias is set
      var alias = qx.util.AliasManager.getInstance();
      this.assertEquals("test/icon", alias.resolve("icon"));
    },


    testResourceOverride : function()
    {
      qx.Theme.define("qx.test.Theme.themes.A", {
        resource : "test/icon",
        icons : {}
      });

      qx.Theme.define("qx.test.Theme.themes.B", {
        extend : qx.test.Theme.themes.A,
        resource : "juhu/icon",
        icons : {}
      });

      this.manager.setTheme(qx.test.Theme.themes.B);

      // make sure the icon alias is set
      var alias = qx.util.AliasManager.getInstance();
      this.assertEquals("juhu/icon", alias.resolve("icon"));
    }
  }
});
