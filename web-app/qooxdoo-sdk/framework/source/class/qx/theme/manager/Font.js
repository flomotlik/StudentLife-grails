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
 * Manager for font themes
 */
qx.Class.define("qx.theme.manager.Font",
{
  type : "singleton",
  extend : qx.util.ValueManager,


  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** the currently selected font theme */
    theme :
    {
      check : "Theme",
      nullable : true,
      apply : "_applyTheme",
      event : "changeTheme"
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
     * @param value {String} dynamically interpreted identifier
     * @return {var} return the (translated) result of the incoming value
     */
    resolveDynamic : function(value)
    {
      var dynamic = this._dynamic;
      return value instanceof qx.bom.Font ? value : dynamic[value];
    },


    /**
     * Returns the dynamically interpreted result for the incoming value,
     * (if available), otherwise returns the original value
     * @param value {String} Value to resolve
     * @return {var} either returns the (translated) result of the incoming
     * value or the value itself
     */
    resolve : function(value)
    {
      var cache = this._dynamic;
      var resolved = cache[value];

      if (resolved)
      {
        return resolved;
      }

      // If the font instance is not yet cached create a new one to return
      // This is true whenever a runtime include occurred (using "qx.Theme.include"
      // or "qx.Theme.patch"), since these methods only merging the keys of
      // the theme and are not updating the cache
      var theme = this.getTheme();
      if (theme !== null && theme.fonts[value])
      {
        return cache[value] = (new qx.bom.Font).set(theme.fonts[value]);
      }

      return value;
    },


    /**
     * Whether a value is interpreted dynamically
     *
     * @param value {String} dynamically interpreted identifier
     * @return {Boolean} returns true if the value is interpreted dynamically
     */
    isDynamic : function(value)
    {
      var cache = this._dynamic;

      if (value && (value instanceof qx.bom.Font || cache[value] !== undefined))
      {
        return true;
      }

      // If the font instance is not yet cached create a new one to return
      // This is true whenever a runtime include occurred (using "qx.Theme.include"
      // or "qx.Theme.patch"), since these methods only merging the keys of
      // the theme and are not updating the cache
      var theme = this.getTheme();
      if (theme !== null && value && theme.fonts[value])
      {
        cache[value] = (new qx.bom.Font).set(theme.fonts[value]);
        return true;
      }

      return false;
    },


    _applyTheme : function(value)
    {
      var dest = this._getDynamic();

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
        var font = qx.bom.Font;

        for (var key in source)
        {
          dest[key] = (new font).set(source[key]);
          dest[key].themed = true;
        }
      }
      this._setDynamic(dest);
    }
  }
});
