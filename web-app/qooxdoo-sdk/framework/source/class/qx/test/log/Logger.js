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

qx.Class.define("qx.test.log.Logger",
{
  extend : qx.dev.unit.TestCase,

  members :
  {
    testLogException : function()
    {
      var appender = new qx.log.appender.RingBuffer();

      qx.log.Logger.clear();
      qx.log.Logger.register(appender);

      qx.log.Logger.debug(this.newException());

      var events = appender.getAllLogEvents();
      this.assertEquals(1, events.length);

      if (qx.core.Variant.isSet("qx.client", "webkit|gecko"))
      {
        if (window.navigator.userAgent.indexOf("Chrome") === -1) {
          this.assert(events[0].items[0].trace.length > 0);
        }
      }

      qx.log.Logger.unregister(appender);
    },


    newException : function()
    {
      var exc;
      try {
        throw new Error();
      } catch (e) {
        exc = e;
      }
      return exc;
    }
  }
})