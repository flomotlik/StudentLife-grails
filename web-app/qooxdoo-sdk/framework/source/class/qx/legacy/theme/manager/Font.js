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

qx.Class.define("qx.legacy.theme.manager.Font",
{
  type : "singleton",
  extend : qx.legacy.util.ValueManager,





  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** the currently selected font theme */
    fontTheme :
    {
      check : "Theme",
      nullable : true,
      apply : "_applyFontTheme",
      event : "changeFontTheme"
    }
  },





  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Returns the dynamically interpreted result for the incoming value
     *
     * @param value {String} dynamically interpreted idenfier
     * @return {var} return the (translated) result of the incoming value
     */
    resolveDynamic : function(value) {
      return value instanceof qx.legacy.ui.core.Font ? value : this._dynamic[value];
    },


    /**
     * Whether a value is interpreted dynamically
     *
     * @param value {String} dynamically interpreted idenfier
     * @return {Boolean} returns true if the value is interpreted dynamically
     */
    isDynamic : function(value) {
      return value && (value instanceof qx.legacy.ui.core.Font || this._dynamic[value] !== undefined);
    },


    /**
     * Sync dependend objects with internal database
     *
     * @return {void}
     */
    syncFontTheme : function() {
      this.updateAll();
    },


    _applyFontTheme : function(value)
    {
      var dest = this._dynamic;

      for (var key in dest)
      {
        if (dest[key].themed)
        {
          dest[key].dispose();
          delete dest[key];
        }
      }

      if (value)
      {
        var source = value.fonts;
        var font = qx.legacy.ui.core.Font;

        for (var key in source)
        {
          dest[key] = (new font).set(source[key]);
          dest[key].themed = true;
        }
      }

      if (qx.legacy.theme.manager.Meta.getInstance().getAutoSync()) {
        this.syncFontTheme();
      }
    }
  }
});
