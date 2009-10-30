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

/** This singleton selects the icon theme to use. */
qx.Class.define("qx.legacy.theme.manager.Icon",
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
    iconTheme :
    {
      check : "Theme",
      nullable : true,
      apply : "_applyIconTheme",
      event : "changeIconTheme"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    _applyIconTheme : function(value, old)
    {
      if (qx.legacy.theme.manager.Meta.getInstance().getAutoSync()) {
        this.syncIconTheme();
      }
    },

    /**
     * Sync dependend objects with internal database
     *
     * @return {void}
     */
    syncIconTheme : function()
    {
      var value = this.getIconTheme();
      var aliasManager = qx.legacy.util.AliasManager.getInstance();

      if (value) {
        aliasManager.add("icon", value.resource);
      } else {
        aliasManager.remove("icon");
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
