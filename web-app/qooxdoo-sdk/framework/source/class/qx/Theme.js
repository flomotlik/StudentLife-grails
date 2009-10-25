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
 * Theme classes contain styling information for certain aspects of the
 * graphical user interface.
 *
 * Supported themes are: colors, decorations, fonts, icons, appearances.
 * The additional meta theme allows for grouping of the individual
 * themes.
 *
 * The following themes are deprecated in 0.8: borders, widgets
 */
qx.Class.define("qx.Theme",
{
  statics:
  {
    /*
    ---------------------------------------------------------------------------
       PUBLIC API
    ---------------------------------------------------------------------------
    */

    /**
     * Theme config
     *
     * Example:
     * <pre class='javascript'>
     * qx.Theme.define("name",
     * {
     *   aliases : {
     *     "aliasKey" : "resourceFolderOrUri"
     *   },
     *   extend : otherTheme,
     *   include : [MMixinTheme],
     *   patch : [MMixinTheme],
     *   colors : {},
     *   decorations : {},
     *   fonts : {},
     *   icons : {},
     *   widgets : {},
     *   appearances : {},
     *   meta : {}
     * });
     * </pre>
     *
     * @param name {String} name of the mixin
     * @param config {Map} config structure
     * @return {void}
     */
    define : function(name, config)
    {
      if (!config) {
        var config = {};
      }

      config.include = this.__normalizeArray(config.include);
      config.patch = this.__normalizeArray(config.patch);

      // Validate incoming data
      if (qx.core.Variant.isSet("qx.debug", "on")) {
        this.__validateConfig(name, config);
      }

      // Create alias
      var theme =
      {
        $$type : "Theme",
        name : name,
        title : config.title,

        // Attach toString
        toString : this.genericToString
      };

      // Remember extend
      if (config.extend) {
        theme.supertheme = config.extend;
      }

      // Assign to namespace
      theme.basename = qx.Bootstrap.createNamespace(name, theme);

      // Convert theme entry from Object to Function (for prototype inheritance)
      this.__convert(theme, config);

      this.__initializeResources(theme, config);
      this.__initializeAliases(theme, config);

      // Store class reference in global class registry
      this.$$registry[name] = theme;

      // Include mixin themes
      for (var i=0, a=config.include, l=a.length; i<l; i++) {
        this.include(theme, a[i]);
      }

      for (var i=0, a=config.patch, l=a.length; i<l; i++) {
        this.patch(theme, a[i]);
      }
    },

    /**
     * Normalize an object to an array
     *
     * @param objectOrArray {Object|Array} Either an object that is to be
     *   normalized to an array, or an array, which is just passed through
     *
     * @return {Array} Either an array that has the original object as its
     *   single item, or the original array itself
     */
    __normalizeArray : function(objectOrArray)
    {
      if (!objectOrArray) {
        return [];
      }

      if (qx.lang.Type.isArray(objectOrArray)) {
        return objectOrArray;
      } else {
        return [objectOrArray];
      }
    },


    /**
     * Initialize resource inheritance
     *
     * @deprecated 'resources' will be replaced by 'aliases'
     * @param theme {Map} The theme
     * @param config {Map} config structure
     */
    __initializeResources : function(theme, config)
    {
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        if (config.resource)
        {
          var aliasKey = theme.type == "icons" ? "icon" : "decoration";
          qx.log.Logger.warn(
            "The configuration key 'resource' in the " + aliasKey + " theme" +
            " '" + theme.name + "' is deprecated. Please replace " +
            "'resource: \"" + config.resource + "\"' with " +
            "'aliases : { " + aliasKey + ": \"" + config.resource + "\"}'"
          );
          qx.log.Logger.trace();
        }
      }

      if (config.resource) {
        theme.resource = config.resource;
      } else if (config.extend && config.extend.resource) {
        theme.resource = config.extend.resource;
      }
    },


    /**
     * Initialize alias inheritance
     *
     * @param theme {Map} The theme
     * @param config {Map} config structure
     */
    __initializeAliases : function(theme, config)
    {
      var aliases = config.aliases || {};
      if (config.extend && config.extend.aliases) {
        qx.lang.Object.mergeWith(aliases, config.extend.aliases, false);
      }

      theme.aliases = aliases;
    },


    /**
     * Return a map of all known themes
     *
     * @return {Map} known themes
     */
    getAll : function() {
      return this.$$registry;
    },


    /**
     * Returns a theme by name
     *
     * @param name {String} theme name to check
     * @return {Object ? void} theme object
     */
    getByName : function(name) {
      return this.$$registry[name];
    },


    /**
     * Determine if theme exists
     *
     * @param name {String} theme name to check
     * @return {Boolean} true if theme exists
     */
    isDefined : function(name) {
      return this.getByName(name) !== undefined;
    },


    /**
     * Determine the number of themes which are defined
     *
     * @return {Number} the number of classes
     */
    getTotalNumber : function() {
      return qx.lang.Object.getLength(this.$$registry);
    },




    /*
    ---------------------------------------------------------------------------
       PRIVATE/INTERNAL API
    ---------------------------------------------------------------------------
    */

    /**
     * This method will be attached to all themes to return
     * a nice identifier for them.
     *
     * @internal
     * @return {String} The interface identifier
     */
    genericToString : function() {
      return "[Theme " + this.name + "]";
    },


    /**
     * Extract the inheritable key (could be only one)
     *
     * @param config {Map} The map from where to extract the key
     * @return {String} the key which was found
     */
    __extractType : function(config)
    {
      for (var i=0, keys=this.__inheritableKeys, l=keys.length; i<l; i++)
      {
        if (config[keys[i]]) {
          return keys[i];
        }
      }
    },


    /**
     * Convert existing entry to a prototype based inheritance function
     *
     * @param theme {Theme} newly created theme object
     * @param config {Map} incoming theme configuration
     */
    __convert : function(theme, config)
    {
      var type = this.__extractType(config);

      // Use theme key from extended theme if own one is not available
      if (config.extend && !type) {
        type = config.extend.type;
      }

      // Save theme type
      theme.type = type || "other";

      // Return if there is no key defined at all
      if (!type) {
        return;
      }

      // Create pseudo class
      var clazz = function() {};

      // Process extend config
      if (config.extend) {
        clazz.prototype = new config.extend.$$clazz;
      }

      var target = clazz.prototype;
      var source = config[type];

      // Copy entries to prototype
      for (var id in source)
      {
        target[id] = source[id];

        // Appearance themes only:
        // Convert base flag to class reference (needed for mixin support)
        if (target[id].base)
        {
          if (qx.core.Variant.isSet("qx.debug", "on"))
          {
            if (!config.extend) {
              throw new Error("Found base flag in entry '" + id + "' of theme '" + config.name + "'. Base flags are not allowed for themes without a valid super theme!");
            }
          }

          target[id].base = config.extend;
        }
      }

      // store pseudo class
      theme.$$clazz = clazz;

      // and create instance under the old key
      theme[type] = new clazz;
    },


    /** {Map} Internal theme registry */
    $$registry : {},


    /** {Array} Keys which support inheritance */
    __inheritableKeys : [ "colors", "borders", "decorations", "fonts", "icons", "widgets", "appearances", "meta" ],


    /** {Map} allowed keys in theme definition */
    __allowedKeys : qx.core.Variant.select("qx.debug",
    {
      "on":
      {
        "title"       : "string", // String
        "resource"    : "string", // String, @deprecated
        "aliases"     : "object", // Map
        "type"        : "string", // String
        "extend"      : "object", // Theme
        "colors"      : "object", // Map
        "borders"     : "object", // Map
        "decorations" : "object", // Map
        "fonts"       : "object", // Map
        "icons"       : "object", // Map
        "widgets"     : "object", // Map
        "appearances" : "object", // Map
        "meta"        : "object", // Map
        "include"     : "object", // Array
        "patch"       : "object"  // Array
      },

      "default" : null
    }),

    /** {Map} allowed keys inside a meta theme block */
    __metaKeys :qx.core.Variant.select("qx.debug",
    {
      "on":
      {
        "color" : "object",
        "border" : "object",
        "decoration" : "object",
        "font" : "object",
        "icon" : "object",
        "appearance" : "object",
        "widget" : "object"
      },

      "default" : null
    }),

    /**
     * Validates incoming configuration and checks keys and values
     *
     * @signature function(name, config)
     * @param name {String} The name of the class
     * @param config {Map} Configuration map
     * @return {void}
     * @throws An error if the given config is not valid (e.g. wrong key or wrong key value)
     */
    __validateConfig : qx.core.Variant.select("qx.debug",
    {
      "on": function(name, config)
      {
        var allowed = this.__allowedKeys;
        for (var key in config)
        {
          if (allowed[key] === undefined) {
            throw new Error('The configuration key "' + key + '" in theme "' + name + '" is not allowed!');
          }

          if (config[key] == null) {
            throw new Error('Invalid key "' + key + '" in theme "' + name + '"! The value is undefined/null!');
          }

          if (allowed[key] !== null && typeof config[key] !== allowed[key]) {
            throw new Error('Invalid type of key "' + key + '" in theme "' + name + '"! The type of the key must be "' + allowed[key] + '"!');
          }
        }

        // Validate maps
        var maps = [ "colors", "borders", "decorations", "fonts", "icons", "widgets", "appearances", "meta" ];
        for (var i=0, l=maps.length; i<l; i++)
        {
          var key = maps[i];

          if (config[key] !== undefined && (config[key] instanceof Array || config[key] instanceof RegExp || config[key] instanceof Date || config[key].classname !== undefined)) {
            throw new Error('Invalid key "' + key + '" in theme "' + name + '"! The value needs to be a map!');
          }
        }

        // Check conflicts (detect number ...)
        var counter = 0;
        for (var i=0, l=maps.length; i<l; i++)
        {
          var key = maps[i];

          if (config[key]) {
            counter++;
          }

          if (counter > 1) {
            throw new Error("You can only define one theme category per file! Invalid theme: " + name);
          }
        }

        // At least one entry
        if (!config.extend && counter === 0) {
          throw new Error("You must define at least one entry in your theme configuration :" + name);
        }

        // Validate meta
        if (config.meta)
        {
          var value;
          for (var key in config.meta)
          {
            value = config.meta[key];

            if (this.__metaKeys[key] === undefined) {
              throw new Error('The key "' + key + '" is not allowed inside a meta theme block.');
            }

            if (typeof value !== this.__metaKeys[key]) {
              throw new Error('The type of the key "' + key + '" inside the meta block is wrong.');
            }

            if (!(typeof value === "object" && value !== null && value.$$type === "Theme")) {
              throw new Error('The content of a meta theme must reference to other themes. The value for "' + key + '" in theme "' + name + '" is invalid: ' + value);
            }
          }
        }

        // Validate extend
        if (config.extend && config.extend.$$type !== "Theme") {
          throw new Error('Invalid extend in theme "' + name + '": ' + config.extend);
        }
      },

      "default" : function() {}
    }),


    /**
     * Include all keys of the given mixin theme into the theme. The mixin may
     * include keys which are already defined in the target theme. Existing
     * features of equal name will be overwritten.
     *
     * @param theme {Theme} An existing theme which should be modified by including the mixin theme.
     * @param mixinTheme {Theme} The theme to be included.
     */
    patch : function(theme, mixinTheme)
    {
      var type = this.__extractType(mixinTheme);
      if (type !== this.__extractType(theme)) {
        throw new Error("The mixins '" + theme.name + "' are not compatible '" + mixinTheme.name + "'!");
      }

      var source = mixinTheme[type];
      var target = theme.$$clazz.prototype;

      for (var key in source) {
        target[key] = source[key];
      }
    },


    /**
     * Include all keys of the given mixin theme into the theme. If the
     * mixin includes any keys that are already available in the
     * class, they will be silently ignored. Use the {@link #patch} method
     * if you need to overwrite keys in the current class.
     *
     * @param theme {Theme} An existing theme which should be modified by including the mixin theme.
     * @param mixinTheme {Theme} The theme to be included.
     */
    include : function(theme, mixinTheme)
    {
      var type = mixinTheme.type;
      if (type !== theme.type) {
        throw new Error("The mixins '" + theme.name + "' are not compatible '" + mixinTheme.name + "'!");
      }

      var source = mixinTheme[type];
      var target = theme.$$clazz.prototype;

      for (var key in source)
      {
        //Skip keys already present
        if (target[key] !== undefined) {
          continue;
        }

        target[key] = source[key];
      }
    }
  }
});
