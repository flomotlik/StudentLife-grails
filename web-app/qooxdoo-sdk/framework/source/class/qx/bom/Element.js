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

/* ************************************************************************

#require(qx.event.dispatch.Direct)
#require(qx.event.dispatch.DomBubbling)
#require(qx.event.handler.Keyboard)
#require(qx.event.handler.Mouse)
#require(qx.event.handler.DragDrop)
#require(qx.event.handler.Element)
#require(qx.event.handler.Appear)

************************************************************************ */

/**
 * This class is mainly a convenience wrapper for DOM elements to
 * qooxdoo's event system.
 */
qx.Class.define("qx.bom.Element",
{
  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /*
    ---------------------------------------------------------------------------
      CREATION
    ---------------------------------------------------------------------------
    */

    /** {Map} A list of all attributes which needs to be part of the initial element to work correctly */
    __initialAttributes :
    {
      "onload" : true,
      "onpropertychange" : true,
      "oninput" : true,
      "onchange" : true,
      "name" : true,
      "type" : true,
      "checked" : true,
      "disabled" : true
    },


    /**
     * Creates an DOM element.
     *
     * Attributes may be given directly with this call. This is critical
     * for some attributes e.g. name, type, ... in many clients.
     *
     * @param name {String} Tag name of the element
     * @param attributes {Map?} Map of attributes to apply
     * @param win {Window?} Window to create the element for
     * @return {Element} The created element node
     */
    create : function(name, attributes, win)
    {
      if (!win) {
        win = window;
      }

      if (!name) {
        throw new Error("The tag name is missing!");
      }

      var initial = this.__initialAttributes;
      var attributesHtml = "";

      for (var key in attributes)
      {
        if (initial[key]) {
          attributesHtml += key + "='" + attributes[key] + "' ";
        }
      }

      var element;

      // If specific attributes are defined we need to process
      // the element creation in a more complex way.
      if (attributesHtml != "")
      {
        // Internet Explorer supports attribute within createElement()
        // This is not standard, but a welcome addition here.
        if (qx.bom.client.Engine.MSHTML)
        {
          element = win.document.createElement("<" + name + " " + attributesHtml + ">");
        }

        // Other browsers create an helper element to put some generated HTML
        // into it and extract the interesting content via 'firstChild'
        else
        {
          var helper = win.document.createElement("div");
          helper.innerHTML = "<" + name + " " + attributesHtml + "></" + name + ">";
          element = helper.firstChild;
        }
      }
      else
      {
        element = win.document.createElement(name);
      }

      for (var key in attributes)
      {
        if (!initial[key]) {
          qx.bom.element.Attribute.set(element, key, attributes[key]);
        }
      }

      return element;
    },





    /*
    ---------------------------------------------------------------------------
      MODIFICATION
    ---------------------------------------------------------------------------
    */

    /**
     * Removes all content from the given element
     *
     * @param element {Element} element to clean
     * @return {String} empty string (new HTML content)
     */
    empty : function(element) {
      return element.innerHTML = "";
    },





    /*
    ---------------------------------------------------------------------------
      EVENTS
    ---------------------------------------------------------------------------
    */

    /**
     * Add an event listener to a DOM element. The event listener is passed an
     * instance of {@link Event} containing all relevant information
     * about the event as parameter.
     *
     * @param element {Element} DOM element to attach the event on.
     * @param type {String} Name of the event e.g. "click", "keydown", ...
     * @param listener {Function} Event listener function
     * @param self {Object} Reference to the 'this' variable inside
     *       the event listener.
     * @param capture {Boolean} Whether to attach the event to the
     *       capturing phase of the bubbling phase of the event. The default is
     *       to attach the event handler to the bubbling phase.
     * @return {String} An opaque id, which can be used to remove the event listener
     *       using the {@link #removeListenerById} method.
     */
    addListener : function(element, type, listener, self, capture) {
      return qx.event.Registration.addListener(element, type, listener, self, capture);
    },


    /**
     * Remove an event listener from a from DOM node.
     *
     * Note: All registered event listeners will automatically be removed from
     *   the DOM at page unload so it is not necessary to detach events yourself.
     *
     * @param element {Element} DOM Element
     * @param type {String} Name of the event
     * @param listener {Function} The pointer to the event listener
     * @param self {Object} Reference to the 'this' variable inside
     *       the event listener.
     * @param capture {Boolean} Whether to remove the event listener of
     *       the bubbling or of the capturing phase.
     */
    removeListener : function(element, type, listener, self, capture) {
      return qx.event.Registration.removeListener(element, type, listener, self, capture);
    },


    /**
     * Removes an event listener from an event target by an id returned by
     * {@link #addListener}
     *
     * @param target {Object} The event target
     * @param id {String} The id returned by {@link #addListener}
     */
    removeListenerById : function(target, id) {
      return qx.event.Registration.removeListenerById(target, id);
    },


    /**
     * Check whether there are one or more listeners for an event type
     * registered at the element.
     *
     * @param element {Element} DOM element
     * @param type {String} The event type
     * @param capture {Boolean ? false} Whether to check for listeners of
     *       the bubbling or of the capturing phase.
     * @return {Boolean} Whether the element has event listeners of the given type.
     */
    hasListener : function(element, type, capture) {
      return qx.event.Registration.hasListener(element, type, capture);
    },


    /**
     * Focuses the given element. The element needs to have a positive <code>tabIndex</code> value.
     *
     * @param element {Element} DOM element to focus
     * @return {void}
     */
    focus : function(element) {
      qx.event.Registration.getManager(element).getHandler(qx.event.handler.Focus).focus(element);
    },


    /**
     * Blurs the given element
     *
     * @param element {Element} DOM element to blur
     * @return {void}
     */
    blur : function(element) {
      qx.event.Registration.getManager(element).getHandler(qx.event.handler.Focus).blur(element);
    },


    /**
     * Activates the given element. The active element receives all key board events.
     *
     * @param element {Element} DOM element to focus
     * @return {void}
     */
    activate : function(element) {
      qx.event.Registration.getManager(element).getHandler(qx.event.handler.Focus).activate(element);
    },


    /**
     * Deactivates the given element. The active element receives all key board events.
     *
     * @param element {Element} DOM element to focus
     * @return {void}
     */
    deactivate : function(element) {
      qx.event.Registration.getManager(element).getHandler(qx.event.handler.Focus).deactivate(element);
    },


    /**
     * Captures the given element
     *
     * @param element {Element} DOM element to capture
     * @return {void}
     */
    capture : function(element) {
      qx.event.Registration.getManager(element).getDispatcher(qx.event.dispatch.MouseCapture).activateCapture(element);
    },


    /**
     * Releases the given element (from a previous {@link #capture} call)
     *
     * @param element {Element} DOM element to release
     * @return {void}
     */
    releaseCapture : function(element) {
      qx.event.Registration.getManager(element).getDispatcher(qx.event.dispatch.MouseCapture).releaseCapture(element);
    },




    /*
    ---------------------------------------------------------------------------
      UTILS
    ---------------------------------------------------------------------------
    */

    /**
     * Clone given DOM element. May optionally clone all attached
     * events (recursively) as well.
     *
     * @param element {Element} Element to clone
     * @param events {Boolean?false} Whether events should be copied as well
     * @return {Element} The copied element
     */
    clone : function(element, events)
    {
      var clone;

      if (events || (qx.core.Variant.isSet("qx.client", "mshtml") && !qx.xml.Document.isXmlDocument(element)))
      {
        var mgr = qx.event.Registration.getManager(element);
        var all = qx.dom.Hierarchy.getDescendants(element);
        all.push(element);
      }

      // IE copies events bound via attachEvent() when
      // using cloneNode(). Calling detachEvent() on the
      // clone will also remove the events from the orignal.
      //
      // In order to get around this, we detach all locally
      // attached events first, do the cloning and recover
      // them afterwards again.
      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        for (var i=0, l=all.length; i<l; i++) {
          mgr.toggleAttachedEvents(all[i], false);
        }
      }

      // Do the native cloning
      var clone = element.cloneNode(true);

      // Recover events on original elements
      if (qx.core.Variant.isSet("qx.client", "mshtml"))
      {
        for (var i=0, l=all.length; i<l; i++) {
          mgr.toggleAttachedEvents(all[i], true);
        }
      }

      // Attach events from original element
      if (events === true)
      {
        // Produce recursive list of elements in the clone
        var cloneAll = qx.dom.Hierarchy.getDescendants(clone);
        cloneAll.push(clone);

        // Process all elements and copy over listeners
        var eventList, cloneElem, origElem, eventEntry;
        for (var i=0, il=all.length; i<il; i++)
        {
          origElem = all[i];
          eventList = mgr.serializeListeners(origElem);

          if (eventList.length > 0)
          {
            cloneElem = cloneAll[i];

            for (var j=0, jl=eventList.length; j<jl; j++)
            {
              eventEntry = eventList[j];
              mgr.addListener(cloneElem, eventEntry.type, eventEntry.handler, eventEntry.self, eventEntry.capture);
            }
          }
        }
      }

      // Finally return the clone
      return clone;
    }
  }
});
