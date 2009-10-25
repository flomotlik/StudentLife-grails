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

/*
#asset(qx/test/*)
*/

qx.Class.define("qx.test.io.remote.transport.XmlHttp",
{
  extend : qx.dev.unit.TestCase,

  members :
  {
    setUp : function()
    {
      this.request = new qx.io.remote.transport.XmlHttp();

      this.request.addListener("aborted", this.responseError, this);
      this.request.addListener("failed", this.responseError, this);
      this.request.addListener("timeout", this.responseError, this);

      this.resourceBase = qx.util.AliasManager.getInstance().resolve("qx/test/");

      // These tests will always fail in Safari 3/FF1.5 due to the behavior
      // described in qooxdoo bug #2529, so they will be skipped.
      this.buggyBrowser = false;
      var engineString = qx.bom.client.Engine.FULLVERSION;
      var engineFloat = parseFloat(engineString);
      if ( (qx.bom.client.Engine.WEBKIT && engineFloat < 526)
            || (qx.bom.client.Engine.GECKO && engineString.indexOf("1.8.0") == 0 ) ) {
        this.buggyBrowser = true;
        this.warn("Tests skipped in Safari 3/FF 1.5, see bug #2529");
      }
    },


    tearDown : function() {
      this.request.dispose();
    },


    responseError : function(e)
    {
      var request = e.getTarget();
      var type = e.getType();

      qx.event.Timer.once(function() {
        this.resume(function() {
          if (!this.buggyBrowser) {
            this.fail(
              "Response error: " + type + " " +
              request.getStatusCode() + " " +
              request.getStatusText()
            );
          }
        }, this);
      }, this);
    },


    getUrl : function(path) {
      return qx.util.ResourceManager.getInstance().toUri(path);
    },


    isLocal : function() {
      return window.location.protocol == "file:";
    },


    needsPHPWarning : function() {
      this.warn("This test can only be run from a web server with PHP support.");
    },


    testSetHeader : function()
    {
      if (this.isLocal()) {
        this.needsPHPWarning();
        return;
      }

      this.request.setUrl(this.getUrl("qx/test/xmlhttp/echo_header.php"));

      this.request.getRequestHeaders()["foo"] = "bar";
      this.request.setRequestHeader("juhu", "kinners");

      this.request.addListener("completed", function(e) { this.resume(function() {
        if (this.buggyBrowser) {
          this.fail("Test succeeded in Safari 3 or FF 1.5, exemption can be removed!");
          return;
        }
        var response = qx.util.Json.parse(this.request.getResponseText().toLowerCase());
        this.assertEquals("kinners", response["juhu"]);
        this.assertEquals("bar", response["foo"]);
      }, this); }, this);

      this.request.send();
      this.wait(2000)
    },


    testGetResponseHeader : function()
    {
      if (this.isLocal()) {
        this.needsPHPWarning();
        return;
      }

      this.request.setUrl(this.getUrl("qx/test/xmlhttp/send_known_header.php"));

      this.request.addListener("completed", function(e) { this.resume(function() {
        if (this.buggyBrowser) {
          this.fail("Test succeeded in Safari 3 or FF 1.5, exemption can be removed!");
          return;
        }
        var juhu = this.request.getResponseHeader("juhu") || this.request.getResponseHeader("Juhu");
        this.assertEquals("kinners", juhu);
      }, this); }, this);

      this.request.send();
      this.wait(2000);
    }
  }
});