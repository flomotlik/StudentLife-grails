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

************************************************************************ */

/**
 * EXPERIMENTAL - NOT READY FOR PRODUCTION
 *
 * Loading of local or remote scripts.
 *
 * * Supports cross-domain communication
 * * Automatically "embeds" script so when the loaded event occours the new features are useable as well
 */
qx.Class.define("qx.io2.ScriptLoader",
{
  extend : qx.core.Object,


  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    this.__oneventWrapped = qx.lang.Function.bind(this.__onevent, this);
    this.__elem = document.createElement("script");
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /** {Boolean} Whether the request is running */
    __running : null,

    /** {Function} Callback method to execute */
    __callback : null,

    /** {Object} Context to execute the callback in */
    __context : null,

    /** {Function} This function is a wrapper for the DOM listener */
    __oneventWrapped : null,

    /** {Element} Stores the DOM element of the script tag */
    __elem : null,


    /**
     * Loads the script from the given URL. It is possible to define
     * a callback and a context in which the callback is executed.
     *
     * The callback is executed when the process is done with any
     * of these status messages: success, fail or abort.
     *
     * @param url {String} URL of the script
     * @param callback {Function} Callback to execute
     * @param context {Object?window} Context in which the function should be executed
     * @return {void}
     */
    load : function(url, callback, context)
    {
      if (this.__running) {
        throw new Error("Another request is still running!");
      }

      this.__running = true;

      // Place script element into head
      var head = document.getElementsByTagName("head")[0];

      // Create script element
      var script = this.__elem;

      // Store user data
      this.__callback = callback || null;
      this.__context = context || window;

      // Define mimetype
      script.type = "text/javascript";

      // Attach handlers for all browsers
      script.onerror = script.onload = script.onreadystatechange = this.__oneventWrapped;

      // Setup URL
      script.src = url;

      // Finally append child
      // This will execute the script content
      head.appendChild(script);
    },


    /**
     * Aborts a currently running process.
     *
     * @return {void}
     */
    abort : function()
    {
      if (this.__running) {
        this.__cleanup("abort");
      }
    },


    /**
     * Internal cleanup method used after every successful
     * or failed loading attempt.
     *
     * @param status {String} Any of success, fail or abort.
     * @return {void}
     */
    __cleanup : function(status)
    {
      // Get script
      var script = this.__elem;

      // Clear out listeners
      script.onerror = script.onload = script.onreadystatechange = null;

      // Remove script from head
      document.getElementsByTagName("head")[0].removeChild(script);

      // Free object
      delete this.__running;

      // Execute user callback
      this.__callback.call(this.__context, status);
    },


    /**
     * Internal event listener for load and error events.
     *
     * @signature function(e)
     * @param e {Event} Native event object
     */
    __onevent : qx.event.GlobalError.observeMethod(qx.core.Variant.select("qx.client",
    {
      "mshtml" : function(e)
      {
        var state = this.__elem.readyState;

        if (state == "loaded") {
          this.__cleanup("success");
        } else if (state == "complete") {
         this.__cleanup("success");
        } else {
          return;
        }
      },

      "default" : function(e)
      {
        if (qx.lang.Type.isString(e) || e.type === "error") {
          this.__cleanup("fail");
        } else if (e.type === "load") {
          this.__cleanup("success");
        } else if (e.type === "readystatechange" && (e.target.readyState === "complete" || e.target.readyState === "loaded")) {
         this.__cleanup("success");
        } else {
          return;
        }
      }
    }))
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeFields("__elem", "__oneventWrapped", "__callback", "__context");
  }
});
