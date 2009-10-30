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
     * Daniel Wagner (d_wagner)

************************************************************************ */

/**
 * Base class for all unit tests.
 */
qx.Class.define("qx.dev.unit.TestCase",
{
  extend  : qx.core.Object,
  include : [qx.core.MAssert],

  properties :
  {
    /** The TestResult instance that runs the test */
    testResult :
    {
      init : null
    },
    /** The test currently running */
    testFunc :
    {
      init : null
    }
  },

  members :
  {
    /**
     * Whether If debugging code is enabled. (i.e. the setting
     * <code>qx.debug</code> has the value <code>on</code>.)
     *
     * @return {Boolean} Whether debugging is enabled
     */
    isDebugOn : function() {
      return qx.core.Variant.isSet("qx.debug", "on") ? true : false;
    },

    /**
     * Instruct the test to wait. Used for asynchronous tests.
     *
     * @param delay {Integer?5000} Amount of time in milliseconds to wait.
     * @param deferredFunction {Function?false} Optional function to run after
     * timeout has expired.
     */
    wait : function(delay, deferredFunction) {
      throw new qx.dev.unit.AsyncWrapper(delay, deferredFunction);
    },

    /**
     * Cancel a timeout started with <code>wait()</code> and run the given
     * function. Used for asynchronous tests, e.g. in a listener's callback
     * function.
     *
     * @param deferredFunction {Function?false} Function to run
     * @param self {Object?false} reference to the ‘this’ variable inside the
     * callback
     */
    resume : function(deferredFunction, self) {
      this.getTestResult().run(this.getTestFunc(), deferredFunction, self);
    }
  }
});
