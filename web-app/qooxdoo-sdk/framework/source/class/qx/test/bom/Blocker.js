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
     * Alexander Back (aback)

************************************************************************ */

qx.Class.define("qx.test.bom.Blocker",
{
  extend : qx.dev.unit.TestCase,

  members :
  {

    setUp : function() {
      this.__blocker = new qx.bom.Blocker;
      this.__blocker.setBlockerZIndex(199);

      this.__blockedElement = qx.bom.Element.create("div");
      qx.bom.element.Style.setStyles(this.__blockedElement, {
        position: "absolute",
        top: "100px",
        left: "100px",
        width: "500px",
        height: "400px",
        zIndex: 200
      });

      qx.dom.Element.insertBegin(this.__blockedElement, document.body);
    },


    tearDown : function() {
      this.__blocker.dispose();
    },

    testBlockWholeDocument : function()
    {
      this.__blocker.block();

      var blockerElement = this.__blocker.getBlockerElement();

      this.assertNotNull(blockerElement, "Blocker element not inserted.");
      this.assertEquals(qx.bom.Document.getWidth(), qx.bom.element.Dimension.getWidth(blockerElement));
      this.assertEquals(qx.bom.Document.getHeight(), qx.bom.element.Dimension.getHeight(blockerElement));

      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        var childElements = qx.dom.Hierarchy.getChildElements(document.body);
        var blockerIframeElement = childElements[0];

        this.assertNotNull(blockerIframeElement, "Blocker iframe element not inserted");
        this.assertEquals(qx.bom.Document.getWidth(), qx.bom.element.Dimension.getWidth(blockerIframeElement));
        this.assertEquals(qx.bom.Document.getHeight(), qx.bom.element.Dimension.getHeight(blockerIframeElement));
      }

      this.__blocker.unblock();
    },


    testUnblockWholeDocument : function()
    {
      this.__blocker.block();

      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        var childElements = qx.dom.Hierarchy.getChildElements(document.body);
        var blockerIframeElement = childElements[0];
      }

      this.__blocker.unblock();

      var blockerElement = this.__blocker.getBlockerElement();
      this.assertFalse(qx.dom.Element.isInDom(blockerElement, window), "Blocker element not correctly removed");

      if (qx.core.Variant.isSet("qx.client", "mshtml")) {
        this.assertFalse(qx.dom.Element.isInDom(blockerIframeElement, window), "Blocker iframe element not correctly removed");
      }
    },


    testBlockElement : function()
    {
      this.__blocker.block(this.__blockedElement);

      // Timer is needed for IE6, otherwise the test will fail because IE6
      // is not able to resize the blockerElement fast enough
      qx.event.Timer.once(function() {
        var self = this;
        this.resume(function() {
          var blockerElement = self.__blocker.getBlockerElement();

          self.assertNotNull(blockerElement, "Blocker element not inserted.");

          self.assertEquals(qx.bom.element.Dimension.getWidth(self.__blockedElement), qx.bom.element.Dimension.getWidth(blockerElement));
          self.assertEquals(qx.bom.element.Dimension.getHeight(self.__blockedElement), qx.bom.element.Dimension.getHeight(blockerElement));

          self.assertEquals(qx.bom.element.Location.getLeft(self.__blockedElement), qx.bom.element.Location.getLeft(blockerElement));
          self.assertEquals(qx.bom.element.Location.getTop(self.__blockedElement), qx.bom.element.Location.getTop(blockerElement));

          self.assertEquals(qx.bom.element.Style.get(self.__blockedElement, "zIndex") - 1, qx.bom.element.Style.get(blockerElement, "zIndex"));

          if (qx.core.Variant.isSet("qx.client", "mshtml"))
          {
            var childElements = qx.dom.Hierarchy.getChildElements(self.__blockedElement);
            var blockerIframeElement = childElements[0];
            self.assertEquals(qx.bom.element.Style.get(self.__blockedElement, "zIndex") - 2, qx.bom.element.Style.get(blockerIframeElement, "zIndex"));
          }

          self.__blocker.unblock();
        }, self);
      }, this, 1000);


      this.wait();
    },


    testBlockerColor : function()
    {
      this.__blocker.setBlockerColor("#FF0000");
      this.__blocker.block();

      var blockerElement = this.__blocker.getBlockerElement();

      if (qx.bom.client.Engine.MSHTML || qx.bom.client.Engine.OPERA) {
        this.assertEquals(qx.bom.element.Style.get(blockerElement, "backgroundColor"), "#ff0000");
      } else {
        this.assertEquals(qx.bom.element.Style.get(blockerElement, "backgroundColor"), "rgb(255, 0, 0)");
      }

      this.__blocker.unblock();
    },


    testBlockerOpacity : function()
    {
      this.__blocker.setBlockerOpacity(0.7);
      this.__blocker.block();

      var blockerElement = this.__blocker.getBlockerElement();
      this.assertEquals(qx.bom.element.Opacity.get(blockerElement), 0.7);

      this.__blocker.unblock();
    },


    testDoubleBlocking : function()
    {
      var before = qx.dom.Hierarchy.getChildElements(this.__blockedElement);

      this.__blocker.block(this.__blockedElement);
      this.__blocker.block(this.__blockedElement);

      var after = qx.dom.Hierarchy.getChildElements(this.__blockedElement);

      this.assertEquals(before.length, 0);

      if (qx.core.Variant.isSet("qx.client", "mshtml")) {
        this.assertEquals(after.length, 2);
      } else {
        this.assertEquals(after.length, 1);
      }

      this.__blocker.unblock();
    },


    testDoubleUnBlocking : function()
    {
      this.__blocker.block(this.__blockedElement);
      this.__blocker.unblock();
      this.__blocker.unblock();

      var blockerElement = this.__blocker.getBlockerElement();
      this.assertNotEquals(blockerElement.parentNode, this.__blockedElement);
    }
  }
});
