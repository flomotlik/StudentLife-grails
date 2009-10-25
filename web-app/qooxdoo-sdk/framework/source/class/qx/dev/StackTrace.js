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
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * Methods to get information about the JavaScript call stack.
 */
qx.Class.define("qx.dev.StackTrace",
{
  statics:
  {

    /**
     * Get a stack trace of the current position in the code.
     *
     * Browser compatibility:
     * <ul>
     *   <li> Mozilla combines the output of {@link #getStackTraceFromError}
     *        and {@link getStackTraceFromCaller} and thus generates the richest trace.
     *   </li>
     *   <li> Internet Explorer and WebKit always use {@link getStackTraceFromCaller}</li>
     *   <li> Opera is able to return file/class names and line numbers.</li>
     * </ul>
     *
     * @return {String[]} Stack trace of the current position in the code. Each line in the array
     *     represents one call in the stack trace.
     * @signature function()
     */
    getStackTrace : qx.core.Variant.select("qx.client",
    {
      "gecko" : function()
      {
        try
        {
          throw new Error();
        }
        catch(ex)
        {
          var errorTrace = this.getStackTraceFromError(ex);
          qx.lang.Array.removeAt(errorTrace, 0);
          var callerTrace = this.getStackTraceFromCaller(arguments);

          var trace = callerTrace.length > errorTrace.length ? callerTrace : errorTrace;
          for (var i=0; i<Math.min(callerTrace.length, errorTrace.length); i++)
          {
            var callerCall = callerTrace[i];
            if (callerCall.indexOf("anonymous") >= 0) {
              continue;
            }

            var callerArr = callerCall.split(":");
            if (callerArr.length != 2) {
              continue;
            }
            var callerClassName = callerArr[0];
            var methodName = callerArr[1];

            var errorCall = errorTrace[i];
            var errorArr = errorCall.split(":");
            var errorClassName = errorArr[0];
            var lineNumber = errorArr[1];

            if (qx.Class.getByName(errorClassName)) {
              var className = errorClassName;
            } else {
              className = callerClassName;
            }
            var line = className + ":";
            if (methodName) {
              line += methodName + ":";
            }
            line += lineNumber;
            trace[i] = line;
          }

          return trace;
        }
      },

      "mshtml|webkit" : function()
      {
        return this.getStackTraceFromCaller(arguments);
      },

      "opera" : function()
      {
        var foo;
        try {
          // force error
          foo.bar();
        }
        catch (ex)
        {
          var trace = this.getStackTraceFromError(ex);
          qx.lang.Array.removeAt(trace, 0)
          return trace;
        }
        return [];
      }
    }),


    /**
     * Get a stack trace from the arguments special variable using the
     * <code>caller</code> property. This is currently not supported
     * for Opera.
     *
     * This methods returns class/mixin and function names of each step
     * in the call stack.
     *
     * Recursion is not supported.
     *
     * @param args {arguments} arguments variable.
     * @return {String[]} Stack trace of caller of the function the arguments variable belongs to.
     *     Each line in the array represents one call in the stack trace.
     * @signature function(args)
     */
    getStackTraceFromCaller : qx.core.Variant.select("qx.client",
    {
      "opera" : function(args)
      {
        return [];
      },

      "default" : function(args)
      {
        var trace = [];
        var fcn = qx.lang.Function.getCaller(args);
        var knownFunction = {};
        while (fcn)
        {
          var fcnName = qx.lang.Function.getName(fcn);
          trace.push(fcnName);

          try {
            fcn = fcn.caller;
          } catch(ex) {
            break;
          }

          if (!fcn) {
            break;
          }

          // avoid infinite recursion
          var hash = qx.core.ObjectRegistry.toHashCode(fcn);
          if (knownFunction[hash]) {
            trace.push("...");
            break;
          }
          knownFunction[hash] = fcn;
        }
        return trace;
      }
    }),


    /**
     * Try to get a stack trace from an Error object. Mozilla sets the field
     * <code>stack</code> for Error objects thrown using <code>throw new Error()</code>.
     * From this field it is possible to get a stack trace from the position,
     * the exception was thrown.
     *
     * This will get the JavaScript file names and the line numbers of each call.
     * The file names are converted into qooxdoo class names is possible.
     *
     * This function works best in Mozilla based browsers. Opera returns useful
     * information only for browser generated exceptions. WebKit will at least
     * return the position of the error.
     *
     * @param error {Error} Error exception instance.
     * @return {String[]} Stack trace of the exception. Each line in the array
     *     represents one call in the stack trace.
     * @signature function(error)
     */
    getStackTraceFromError : qx.core.Variant.select("qx.client",
    {
      "gecko" : function(error)
      {
        if (!error.stack) {
          return [];
        }
        // e.g. "()@http://localhost:8080/webcomponent-test-SNAPSHOT/webcomponent/js/com/ptvag/webcomponent/common/log/Logger:253"
        var lineRe = /@(.+):(\d+)$/gm;
        var hit;
        var trace = [];


        while ((hit = lineRe.exec(error.stack)) != null)
        {
          var url = hit[1];
          var lineNumber = hit[2];

          var className = this.__fileNameToClassName(url);
          trace.push(className + ":" + lineNumber);
        }

        return trace;
      },

      "webkit" : function(error)
      {
        if (error.sourceURL && error.line) {
          return [this.__fileNameToClassName(error.sourceURL) + ":" + error.line];
        } else {
          return [];
        }
      },

      "opera" : function(error)
      {
        if (error.message.indexOf("Backtrace:") < 0) {
          return [];
        }
        var trace = [];
        var traceString = qx.lang.String.trim(error.message.split("Backtrace:")[1]);
        var lines = traceString.split("\n");
        for (var i=0; i<lines.length; i++)
        {
          var reResult = lines[i].match(/\s*Line ([0-9]+) of.* (\S.*)/);
          if (reResult && reResult.length >= 2) {
            var lineNumber = reResult[1];
            var fileName = this.__fileNameToClassName(reResult[2]);
            trace.push(fileName + ":" + lineNumber);
          }
        }
        return trace;
      },

      "default": function() {
        return [];
      }
    }),


    /**
     * Convert an URL of a JavaScript class into a class name if the file is named using
     * the qooxdoo naming conventions.
     *
     * @param fileName {String} URL of the JavaScript file
     * @return {String} class name of the file if conversion was possible. Otherwise the
     *     fileName is returned unmodified.
     */
    __fileNameToClassName : function(fileName)
    {
      var scriptDir = "/source/class/";
      var jsPos = fileName.indexOf(scriptDir);
      var className = (jsPos == -1) ? fileName : fileName.substring(jsPos + scriptDir.length).replace(/\//g, ".").replace(/\.js$/, "");
      return className;
    }
  }
});
