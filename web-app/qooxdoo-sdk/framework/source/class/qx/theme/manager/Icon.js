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
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * Manager for icon themes
 */
qx.Class.define("qx.theme.manager.Icon",
{
  type : "singleton",
  extend : qx.core.Object,





  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** currently used icon theme */
    theme :
    {
      check : "Theme",
      nullable : true,
      apply : "_applyTheme"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // property apply
    _applyTheme : function(value, old)
    {
      var aliasManager = qx.util.AliasManager.getInstance();

      // @deprecated
      if (value) {
        aliasManager.add("icon", value.resource);
      } else {
        aliasManager.remove("icon");
      }

      if (old)
      {
        for (var alias in old.aliases) {
          aliasManager.remove(alias);
        }
      }

      if (value)
      {
        for (var alias in value.aliases) {
          aliasManager.add(alias, value.aliases[alias]);
        }
      }
    }
  }
});
