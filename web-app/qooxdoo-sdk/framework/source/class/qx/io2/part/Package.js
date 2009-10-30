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
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * The Package wraps a list of related script URLs, which are required by one
 * or more parts.
 */
qx.Class.define("qx.io2.part.Package",
{
  extend : qx.core.Object,


  /**
   * @param urls {String[]} A list of script URLs
   * @param loaded {Boolean?false} Whether the package is already loaded.
   */
  construct : function(urls, loaded)
  {
    this.base(arguments);

    this.__readyState = loaded ? "complete" : "initialized";
    this.__urls = urls;
  },


  events :
  {
    /** This event is fired after the part has been loaded successfully. */
    "load" : "qx.event.type.Event"
  },


  members :
  {

    __urls : null,

    __readyState : null,

    /**
     * Loads a list of scripts in the correct order.
     *
     * @param urlList {String[]} List of script urls
     * @param callback {Function} Function to execute on completion
     * @param self {Object?window} Context to execute the given function in
     */
    __loadScriptList : function(urlList, callback, self)
    {
      if (urlList.length == 0)
      {
        callback.call(self);
        return;
      }

      this.__readyState = "loading";

      var urlsLoaded = 0;
      var onLoad = function(urls)
      {
        if (urlsLoaded >= urlList.length)
        {
          this.__readyState = "complete";
          callback.call(self);
          return;
        }

        var loader = new qx.io2.ScriptLoader()
        loader.load(urls.shift(), function()
        {
          urlsLoaded += 1;
          loader.dispose();
          if (qx.core.Variant.isSet("qx.client", "webkit"))
          {
            // force asynchronous load
            // Safari fails with an "maximum recursion depth exceeded" error if it is
            // called sync.
            qx.event.Timer.once(function() {
              onLoad.call(this, urls, callback, self);
            }, this, 0);
          } else {
            onLoad.call(this, urls, callback, self);
          }
        }, this);
      }

      onLoad(qx.lang.Array.clone(urlList));
    },


    /**
     * Get the ready state of the package. The value is one of
     * <ul>
     * <li>
     *   <b>initialized</b>: The package is initialized. The {@link #load}
     *   method has not yet been called
     * </li>
     * <li><b>loading</b>: The package is still loading.</li>
     * <li><b>complete</b>: The package has been loaded successfully</li>
     * </li>
     *
     * @return {String} The ready state.
     */
    getReadyState : function() {
      return this.__readyState;
    },


    /**
     * Load the part's script URL's in the correct order. A {@link #load} event
     * if fired once all scrips are loaded.
     */
    load : function()
    {
      if (this.__readyState !== "initialized") {
        return;
      }
      this.__readyState == "loading";
      this.__loadScriptList(this.__urls, function()
      {
        this.__readyState = "complete";
        this.fireEvent("load");
      }, this);
    }
  },



  /*
   *****************************************************************************
      DESTRUCTOR
   *****************************************************************************
   */

   destruct : function() {
     this._disposeArray("__urls");
   }
});