/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Sebastian Werner (wpbasti)
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * This handler provides events for qooxdoo application startup/shutdown logic.
 */
qx.Class.define("qx.event.handler.Application",
{
  extend : qx.core.Object,
  implement : qx.event.IEventHandler,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * Create a new instance
   *
   * @param manager {qx.event.Manager} Event manager for the window to use
   */
  construct : function(manager)
  {
    this.base(arguments);

    // Define shorthands
    this._window = manager.getWindow();

    this.__domReady = false;
    this.__loaded = false;

    // Initialize observers
    this._initObserver();

    // Store instance (only supported for main app window, this
    // is the reason why this is OK here)
    qx.event.handler.Application.$$instance = this;
  },





  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /** {Integer} Priority of this handler */
    PRIORITY : qx.event.Registration.PRIORITY_NORMAL,


    /** {Map} Supported event types */
    SUPPORTED_TYPES :
    {
      ready : 1,
      shutdown : 1
    },


    /** {Integer} Which target check to use */
    TARGET_CHECK : qx.event.IEventHandler.TARGET_WINDOW,


    /** {Integer} Whether the method "canHandleEvent" must be called */
    IGNORE_CAN_HANDLE : true,


    __scriptLoaded : false,

    /**
     * Sends the currently running application the ready signal. Used
     * exclusively by package loader system.
     *
     * @internal
     * @return {void}
     */
    onScriptLoaded : function()
    {
      this.__scriptLoaded = true;

      var inst = qx.event.handler.Application.$$instance;
      if (inst) {
        inst.__fireReady();
      }
    }
  },





  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER INTERFACE
    ---------------------------------------------------------------------------
    */

    // interface implementation
    canHandleEvent : function(target, type) {},


    // interface implementation
    registerEvent : function(target, type, capture) {
      // Nothing needs to be done here
    },


    // interface implementation
    unregisterEvent : function(target, type, capture) {
      // Nothing needs to be done here
    },

    __isReady : null,
    __domReady : null,
    __loaded : null,
    __isUnloaded : null,





    /*
    ---------------------------------------------------------------------------
      USER ACCESS
    ---------------------------------------------------------------------------
    */

    /**
     * Fires a global ready event.
     *
     * @return {void}
     */
    __fireReady : function()
    {
      var clazz = qx.event.handler.Application;

      // Wrapper qxloader needed to be compatible with old generator
      if (!this.__isReady && this.__domReady && clazz.__scriptLoaded)
      {
        this.__isReady = true;

        // Fire user event
        qx.event.Registration.fireEvent(this._window, "ready");
      }
    },


    /**
     * Whether the application is ready.
     *
     * @return {Boolean} ready status
     */
    isApplicationReady : function()
    {
      return this.__isReady;
    },




    /*
    ---------------------------------------------------------------------------
      OBSERVER INIT/STOP
    ---------------------------------------------------------------------------
    */

    /**
     * Initializes the native mouse event listeners.
     *
     * @return {void}
     */
    _initObserver : function()
    {
      // in Firefox the loader script sets the ready state
      if (qx.$$domReady || document.readyState == "complete")
      {
        this.__domReady = true;
        this.__fireReady();
      }
      else
      {
        this._onNativeLoadWrapped = qx.lang.Function.bind(this._onNativeLoad, this);

        if (qx.core.Variant.isSet("qx.client", "gecko|opera|webkit"))
        {
          // Using most native method supported by Mozilla and Opera >= 9.0
          qx.bom.Event.addNativeListener(this._window, "DOMContentLoaded", this._onNativeLoadWrapped);
        }
        else if (qx.core.Variant.isSet("qx.client", "mshtml"))
        {
          // Continually check to see if the document is ready
          var timer = function()
          {
            try
            {
              // If IE is used, use the trick by Diego Perini
              // http://javascript.nwbox.com/IEContentLoaded/
              document.documentElement.doScroll("left");
              this._onNativeLoadWrapped();
            }
            catch(error) {
              window.setTimeout(timer, 100);
            }
          };

          timer();
        }

        // Additional load listener as fallback
        qx.bom.Event.addNativeListener(this._window, "load", this._onNativeLoadWrapped);
      }

      this._onNativeUnloadWrapped = qx.lang.Function.bind(this._onNativeUnload, this);
      qx.bom.Event.addNativeListener(this._window, "unload", this._onNativeUnloadWrapped);
    },


    /**
     * Disconnect the native mouse event listeners.
     *
     * @return {void}
     */
    _stopObserver : function()
    {
      if (this._onNativeLoadWrapped) {
        qx.bom.Event.removeNativeListener(this._window, "load", this._onNativeLoadWrapped);
      }
      qx.bom.Event.removeNativeListener(this._window, "unload", this._onNativeUnloadWrapped);

      this._onNativeLoadWrapped = null;
      this._onNativeUnloadWrapped = null;
    },





    /*
    ---------------------------------------------------------------------------
      NATIVE LISTENER
    ---------------------------------------------------------------------------
    */

    /**
     * Event listener for native load event
     *
     * @signature function()
     */
    _onNativeLoad : qx.event.GlobalError.observeMethod(function()
    {
      this.__domReady = true;
      this.__fireReady();
    }),


    /**
     * Event listener for native unload event
     *
     * @signature function()
     */
    _onNativeUnload : qx.event.GlobalError.observeMethod(function()
    {
      if (!this.__isUnloaded)
      {
        this.__isUnloaded = true;

        try
        {
          // Fire user event
          qx.event.Registration.fireEvent(this._window, "shutdown");
        }
        finally
        {
          // Execute registry shutdown
          qx.core.ObjectRegistry.shutdown();
        }

      }
    })

  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._stopObserver();

    this._disposeFields("_window");
  },




  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */

  defer : function(statics) {
    qx.event.Registration.addHandler(statics);
  }
});
