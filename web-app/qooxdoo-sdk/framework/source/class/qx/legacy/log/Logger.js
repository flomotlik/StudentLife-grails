/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 STZ-IDA, Germany, http://www.stz-ida.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Til Schneider (til132)

************************************************************************ */

/**
 * A logger. Logs messages of one log category.
 */
qx.Class.define("qx.legacy.log.Logger",
{
  extend : qx.legacy.log.LogEventProcessor,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param name {String} The category name of this logger. (Normally a class or
   *    package name)
   * @param parentLogger {Logger} The parent logger.
   */
  construct : function(name, parentLogger)
  {
    this.base(arguments);

    this._name = name;
    this._parentLogger = parentLogger;
  },




  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {

    /**
     * Prints a method deprecation warning and a stack trace if the setting
     * <code>"qx.debug"</code> is set to <code>on</code>.
     *
     * @param fcn {Function} reference to the deprecated function. This is
     *     arguments.callee is the calling method is deprecated.
     * @param msg {String?} Optional message which is printed.
     */
    deprecatedMethodWarning : function(fcn, msg)
    {
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        var logger = qx.legacy.log.Logger.getClassLogger(fcn.self||this);

        var functionName = qx.lang.Function.getName(fcn);
        var className = fcn.self ? fcn.self.classname : "unknown";
        logger.warn(
          "The method '"+ functionName +"' of class '"+className+"' is deprecated: " +
          msg || "Please consult the API documentation of this method for alternatives."
        );
        logger.trace();
      }
    },


    /**
     * Prints a class deprecation warning and a stack trace if the setting
     * <code>"qx.debug"</code> is set to <code>on</code>.
     *
     * @param clazz {Class} reference to the deprecated class.
     * @param msg {String?} Optional message which is printed.
     */
    deprecatedClassWarning : function(clazz, msg)
    {
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        var logger = qx.legacy.log.Logger.getClassLogger(clazz);

        var className = clazz.self ? clazz.self.classname : "unknown";
        logger.warn(
          "The method class '"+className+"' is deprecated: " +
          msg || "Please consult the API documentation of this class for alternatives."
        );
        logger.trace();
      }
    },


    /**
     * Returns the logger of a class.
     *
     * @param clazz {Function} The class of which to return the logger.
     * @return {var} TODOC
     */
    getClassLogger : function(clazz)
    {
      var logger = clazz._logger;

      if (logger == null)
      {
        // Get the parent logger
        var classname = clazz.classname;
        var splits = classname.split(".");
        var currPackage = window;
        var currPackageName = "";
        var parentLogger = qx.legacy.log.Logger.ROOT_LOGGER;

        for (var i=0; i<splits.length-1; i++)
        {
          currPackage = currPackage[splits[i]];
          currPackageName += ((i != 0) ? "." : "") + splits[i];

          if (currPackage._logger == null)
          {
            // This package has no logger -> Create one
            currPackage._logger = new qx.legacy.log.Logger(currPackageName, parentLogger);
          }

          parentLogger = currPackage._logger;
        }

        // Create the class logger
        logger = new qx.legacy.log.Logger(classname, parentLogger);
        clazz._logger = logger;
      }

      return logger;
    },


    /** {Integer} The current indent. */
    _indent : 0,


    /**
     * {Integer} The ALL level has the lowest possible rank and is intended to turn on
     * all logging.
     */
    LEVEL_ALL : 0,

    /**
     * {Integer} The DEBUG Level designates fine-grained informational events that are
     * most useful to debug an application.
     */
    LEVEL_DEBUG : 200,

    /**
     * {Integer} The INFO level designates informational messages that highlight the
     * progress of the application at coarse-grained level.
     */
    LEVEL_INFO : 500,

    /** {Integer} The WARN level designates potentially harmful situations. */
    LEVEL_WARN : 600,

    /**
     * {Integer} The ERROR level designates error events that might still allow the
     * application to continue running.
     */
    LEVEL_ERROR : 700,

    /**
     * {Integer} The FATAL level designates very severe error events that will
     * presumably lead the application to abort.
     */
    LEVEL_FATAL : 800,

    /**
     * {Integer} The OFF has the highest possible rank and is intended to turn off
     * logging.
     */
    LEVEL_OFF : 1000,


    /**
     * {Logger} The root logger. This is the root of the logger tree. All loggers
     * should be a child or grand child of this root logger.
     * <p>
     * This logger logs by default everything greater than level INFO to a log
     * window.
     */
    ROOT_LOGGER : null // set in defer
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Returns the name of this logger. (Normally a class or package name)
     *
     * @return {String} the name.
     */
    getName : function() {
      return this._name;
    },


    /**
     * Returns the parent logger.
     *
     * @return {Logger} the parent logger.
     */
    getParentLogger : function() {
      return this._parentLogger;
    },


    /**
     * Indents all following log messages by one.
     *
     * This affects all log messages. Even those of other loggers.
     *
     * @return {void}
     */
    indent : function() {
      qx.legacy.log.Logger._indent++;
    },


    /**
     * Unindents all following log messages by one.
     *
     * This affects all log messages. Even those of other loggers.
     *
     * @return {void}
     */
    unindent : function() {
      qx.legacy.log.Logger._indent--;
    },


    /**
     * Adds an appender.
     *
     * If a logger has an appender, log events will not be passed to the
     * appenders of parent loggers. If you want this behaviour, also append a
     * {@link ForwardAppender}.
     *
     * @param appender {Appender} the appender to add.
     * @return {void}
     */
    addAppender : function(appender)
    {
      if (this._appenderArr == null) {
        this._appenderArr = [];
      }

      this._appenderArr.push(appender);
    },


    /**
     * Removes an appender.
     *
     * @param appender {Appender} the appender to remove.
     * @return {void}
     */
    removeAppender : function(appender)
    {
      if (this._appenderArr != null) {
        this._appenderArr.remove(appender);
      }
    },


    /**
     * Removes all appenders.
     *
     * @return {void}
     */
    removeAllAppenders : function() {
      this._appenderArr = null;
    },

    // overridden
    handleLogEvent : function(evt)
    {
      var Filter = qx.legacy.log.Filter;

      var decision = Filter.NEUTRAL;
      var logger = this;

      while (decision == Filter.NEUTRAL && logger != null)
      {
        decision = logger.decideLogEvent(evt);
        logger = logger.getParentLogger();
      }

      if (decision != Filter.DENY) {
        this.appendLogEvent(evt);
      }
    },


    /**
     * Passes a log event to the appenders. If the logger has no appenders the
     * event will be passed to the appenders of the parent logger, and so on.
     *
     * @param evt {Map} The event to append.
     * @return {void}
     */
    appendLogEvent : function(evt)
    {
      if (this._appenderArr != null && this._appenderArr.length != 0)
      {
        for (var i=0; i<this._appenderArr.length; i++) {
          this._appenderArr[i].handleLogEvent(evt);
        }
      }
      else if (this._parentLogger != null)
      {
        this._parentLogger.appendLogEvent(evt);
      }
    },


    /**
     * Logs a message.
     *
     * @param level {Integer} the log level.
     * @param msg {var} the message to log. If this is not a string, the
     *      object dump will be logged.
     * @param instanceId {var ? null} the ID of the instance the log message comes from.
     * @param exc {var ? null} the exception to log.
     * @param trace {string ? null} optional stack trace string to display
     * @return {void}
     */
    log : function(level, msg, instanceId, exc, trace)
    {
      var evt =
      {
        logger     : this,
        level      : level,
        message    : msg,
        throwable  : exc,
        trace      : trace,
        indent     : qx.legacy.log.Logger._indent,
        instanceId : instanceId
      };

      this.handleLogEvent(evt);
    },


    /**
     * Logs a debug message.
     *
     * @param msg {var} the message to log. If this is not a string, the
     *      object dump will be logged.
     * @param instanceId {var ? null} the ID of the instance the log message comes from.
     * @param exc {var ? null} the exception to log.
     * @return {void}
     */
    debug : function(msg, instanceId, exc) {
      this.log(qx.legacy.log.Logger.LEVEL_DEBUG, msg, instanceId, exc);
    },


    /**
     * Logs an info message.
     *
     * @param msg {var} the message to log. If this is not a string, the
     *      object dump will be logged.
     * @param instanceId {var ? null} the ID of the instance the log message comes from.
     * @param exc {var ? null} the exception to log.
     * @return {void}
     */
    info : function(msg, instanceId, exc) {
      this.log(qx.legacy.log.Logger.LEVEL_INFO, msg, instanceId, exc);
    },


    /**
     * Logs a warning message.
     *
     * @param msg {var} the message to log. If this is not a string, the
     *      object dump will be logged.
     * @param instanceId {var ? null} the ID of the instance the log message comes from.
     * @param exc {var ? null} the exception to log.
     * @return {void}
     */
    warn : function(msg, instanceId, exc) {
      this.log(qx.legacy.log.Logger.LEVEL_WARN, msg, instanceId, exc);
    },


    /**
     * Logs an error message.
     *
     * @param msg {var} the message to log. If this is not a string, the
     *      object dump will be logged.
     * @param instanceId {var ? null} the ID of the instance the log message comes from.
     * @param exc {var ? null} the exception to log.
     * @return {void}
     */
    error : function(msg, instanceId, exc) {
      this.log(qx.legacy.log.Logger.LEVEL_ERROR, msg, instanceId, exc);
    },


    /**
     * Logs a fatal message.
     *
     * @param msg {var} the message to log. If this is not a string, its
     *      object dump will be logged.
     * @param instanceId {var ? null} the ID of the instance the log message comes from.
     * @param exc {var ? null} the exception to log.
     * @return {void}
     */
    fatal : function(msg, instanceId, exc) {
      this.log(qx.legacy.log.Logger.LEVEL_FATAL, msg, instanceId, exc);
    },


    /**
     * Resets the measure timer.
     *
     * @return {void}
     */
    measureReset : function()
    {
      if (this._totalMeasureTime != null) {
        this.debug("Measure reset. Total measure time: " + this._totalMeasureTime + " ms");
      }

      this._lastMeasureTime = null;
      this._totalMeasureTime = null;
    },


    /**
     * Logs a debug message and measures the time since the last call of measure.
     *
     * @param msg {String} the message to log.
     * @param instanceId {var ? null} the ID of the instance the log message comes from.
     * @param exc {var ? null} the exception to log.
     * @return {void}
     */
    measure : function(msg, instanceId, exc)
    {
      if (this._lastMeasureTime == null) {
        msg = "(measure start) " + msg;
      }
      else
      {
        var delta = new Date().getTime() - this._lastMeasureTime;

        if (this._totalMeasureTime == null) {
          this._totalMeasureTime = 0;
        }

        this._totalMeasureTime += delta;
        msg = "(passed time: " + delta + " ms) " + msg;
      }

      this.debug(msg, instanceId, exc);

      this._lastMeasureTime = new Date().getTime();
    }
  },




  /*
  *****************************************************************************
     SETTINGS
  *****************************************************************************
  */

  settings :
  {
    "qx.logAppender" : "qx.legacy.log.appender.Native",
    "qx.minLogLevel" : 200 // qx.legacy.log.Logger.LEVEL_DEBUG
  },




  /*
  *****************************************************************************
     DEFER
  *****************************************************************************
  */

  defer : function(statics)
  {
    statics.ROOT_LOGGER = new statics("root", null);
    statics.ROOT_LOGGER.setMinLevel(qx.core.Setting.get("qx.minLogLevel"));

    var clazz = qx.Class.getByName(qx.core.Setting.get("qx.logAppender"));
    if (clazz) {
      statics.ROOT_LOGGER.addAppender(new clazz);
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeFields("_parentLogger", "_appenderArr");
  }
});

