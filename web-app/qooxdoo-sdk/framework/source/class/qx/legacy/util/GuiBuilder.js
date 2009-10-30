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
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * A class to generate a widget hierarchy from XML.
 *
 * WARNING: This class may not be up-to-date or fully functional since it
 *          it is not actively maintained. However, there are other
 *          (server-side) solutions for handling XML GUI descriptions.
 *          Please see the qooxdoo homepage for related projects or ask on
 *          the mailing list.
 */
qx.Class.define("qx.legacy.util.GuiBuilder",
{
  extend : qx.core.Object,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param flags {Map} map of flags. "flags.strict" sets strict mode.
   */
  construct : function(flags)
  {
    this.base(arguments);

    // map<className, map<propertyName, function>>
    this._propertyEditors = {};

    this._registerDefaultPropertyEditors();

    this._flags = flags || {};

    // ensure the default flags are setup
    if (this._flags.strict == null)
    {
      // strick mode throws exceptions when
      //  * widget setters don't exist
      this._flags.strict = true;
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
    ------------------------------------------------------------------------------------
      BUILD
    ------------------------------------------------------------------------------------
    */

    /**
     * Asynchronous method - fetches XML data from the URL then delegates to build to process the xml
     * Dispatches a qx.event.type.Event("done") after the hierarchy is built
     *
     * @param parent {qx.legacy.ui.core.Widget} can either be the application instance, or a widget to append the xml toplevel widgets to
     * @param url {String} URL of the XML files
     * @return {void}
     */
    buildFromUrl : function(parent, url)
    {
      var req = new qx.io.remote.Request(url, "GET", "application/xml");
      var self = this;

      req.addListener("completed", function(e)
      {
        self.build(parent, e.getData().getContent());
      });

      req.send();
    },


    /**
     * parse the children of the xml and appending all widgets to the parent widget
     *
     * @param parent {qx.legacy.ui.core.Widget} can either be the application instance, or a widget to append the xml toplevel widgets to
     * @param node {String | Document | Element} can be either a xml string, or a xml dom document or fragment
     * @return {void}
     */
    build : function(parent, node)
    {
      // support embedding of an XML string within a textarea
      if (typeof node == "object" && node.nodeName == 'TEXTAREA') {
        node = node.value;
      }

      // parse strings in to XML DOM
      if (typeof node == "string") {
        node = qx.xml.Document.fromString(node);
      }

      // TODO handle parse errors
      this._buildNodes(parent, node.childNodes);
    },


    /**
     * TODOC
     *
     * @param parent {var} TODOC
     * @param nodes {var} TODOC
     * @return {void}
     */
    _buildNodes : function(parent, nodes)
    {
      for (var i=0; i<nodes.length; i++)
      {
        var n = nodes[i];

        // 1 = ELEMENT_NODE
        if (n.nodeType == 1) {
          this._buildWidgetFromNode(parent, n);
        }
      }
    },


    /**
     * TODOC
     *
     * @param widget {var} TODOC
     * @param args {var} TODOC
     * @param text {var} TODOC
     * @return {void}
     * @throws TODOC
     */
    _buildEventListener : function(widget, args, text)
    {
      if (typeof args.type !== "string") {
        throw this._newError('eventListener requires a string type attribute');
      }

      var self = this;

      // are we delegating ?
      if (typeof args.delegate === "string")
      {
        if (args.delegate.indexOf('.') > -1)
        {
          // delegation to a global method
          var p = args.delegate.split('.');
          var o = p[0];
          var m = p[1];

          widget.addListener(args.type, function(e)
          {
            if (!window[o]) {
              throw self._newError('delegate not found', { delegate : args.delegate });
            }

            if (!window[o][m]) {
              throw self._newError('delegate not found', { delegate : args.delegate });
            }

            window[o][m].apply(window[o], [ e ]);
          });
        }
        else
        {
          // delegation to a global method
          widget.addListener(args.type, function(e)
          {
            if (!window[args.delegate]) {
              throw self._newError('delegate not found', { delegate : args.delegate });
            }

            window[args.delegate].apply(null, [ e ]);
          });
        }
      }
      else
      {
        // build a function object using text as the function body
        //
        // the args attribute indicates the name of the event argument
        // if not provided - use 'event' as the name
        if (!args.args) {
          args.args = "event";
        }

        var f = new Function(args.args, text);
        widget.addListener(args.type, f);
      }
    },


    /**
     * A node builder that will be used if no node builder is declared for a nodeName
     *
     * @param parent {qx.legacy.ui.core.Widget} can either be the application instance, or a widget to append the xml toplevel widgets to
     * @param node {String | Document | Element} can be either a xml string, or a xml dom document or fragment
     * @return {void}
     * @throws TODOC
     */
    _buildWidgetFromNode : function(parent, node)
    {
      var className = this._extractClassName(node);

      if (!className) {
        throw this._newError("unrecognised node", { nodeName : node.nodeName });
      }

      if (className == "qx.client.builder.Container")
      {
        // generic container node to allow xml to contain multiple toplevel nodes
        this._buildNodes(parent, node.childNodes);
        return;
      }

      if (className == "qx.client.builder.Script")
      {
        var e = document.createElement("script");
        var attribs = this._mapXmlAttribToObject(node);

        if (attribs.type) {
          e.type = attribs.type;
        } else {
          e.type = 'text/javascript';
        }

        // e.innerHTML = node.firstChild.nodeValue;
        // fix for Internet Explorer by Cristian Bica
        if (qx.core.Variant.isSet("qx.client", "mshtml")) {
          e.innerHTML = eval(node.firstChild.nodeValue);
        } else {
          e.innerHTML = node.firstChild.nodeValue;
        }

        document.body.appendChild(e);
        return;
      }

      if (className == "qx.client.builder.EventListener")
      {
        var attribs = this._mapXmlAttribToObject(node);
        var text;

        if (node.firstChild) {
          text = node.firstChild.nodeValue;
        }

        this._buildEventListener(parent, attribs, text);
        return;
      }

      var classConstructor = qx.Class.getByName(className);

      if (!classConstructor) {
        throw this._newError("constructor not found", { className : className });
      }

      // construct the widget instance - using the default constructor
      var widget = new classConstructor();
      var attribs = this._mapXmlAttribToObject(node, widget);
      delete attribs['qxtype'];

      var dummyWidget = attribs.id && attribs.id.indexOf("_") == 0;

      if (attribs.id)
      {
        // register a global refrence for this widget
        window[attribs.id] = widget;
        delete attribs.id;
      }

      // convert any on??  attribs into event listeners
      for (var a in attribs)
      {
        if (a.toLowerCase().indexOf('on') == 0 && a.length > 2)
        {
          // there may be issues here for XHTML based attributes - due to their case
          var type = a.substring(2);
          type = type.charAt(0) + type.substring(1);

          this._buildEventListener(widget,
          {
            type : type,
            args : 'event'
          },
          attribs[a]);

          delete attribs[a];
        }
      }

      for (var n in attribs) {
        this._setWidgetProperty(widget, n, attribs[n]);
      }

      if (!dummyWidget) {
        parent.add(widget);
      }

      // recurse to all of the nodes children, using the newly created widget as the parent
      this._buildNodes(widget, node.childNodes);
    },




    /*
    ------------------------------------------------------------------------------------
      WIDGET PROPERTIES
    ------------------------------------------------------------------------------------
    */

    /**
     * Set a widget's property using a propertyEditor
     *
     * @param widget {var} TODOC
     * @param name {var} TODOC
     * @param value {var} TODOC
     * @return {void}
     */
    _setWidgetProperty : function(widget, name, value)
    {
      var editor = this._findPropertyEditor(widget.classname, name);

      if (!editor) {
        editor = this._coercePropertyEditor;
      }

      editor.set(widget, name, value);
    },


    /**
     * TODOC
     *
     * @param className {var} TODOC
     * @param propertyName {var} TODOC
     * @return {var | null} TODOC
     */
    _findPropertyEditor : function(className, propertyName)
    {
      // get all defined propertyEditors for this widget's prototype
      var m = this._propertyEditors[className];

      // lookup the converter for this property name
      if (m && m[propertyName]) {
        return m[propertyName];
      }

      // try the widget's superclass
      var w = qx.Class.getByName(className);

      if (w && w.superclass && w.superclass.prototype.classname) {
        return this._findPropertyEditor(w.superclass.prototype.classname, propertyName);
      }

      return null;
    },


    /**
     * TODOC
     *
     * @param className {var} TODOC
     * @param propertyName {var} TODOC
     * @param editor {var} TODOC
     * @return {void}
     */
    registerPropertyEditor : function(className, propertyName, editor)
    {
      if (!this._propertyEditors[className]) this._propertyEditors[className] = {};
      this._propertyEditors[className][propertyName] = editor;
    },


    /**
     * TODOC
     *
     * @return {void}
     */
    _registerDefaultPropertyEditors : function()
    {
      var self = this;

      // a property editor that splits the values on a comma and coerces each one into a suitable type
      var commaDelimitedPropertyEditor = {};

      commaDelimitedPropertyEditor.set = function(widget, name, value)
      {
        if (value == null || value == "")
        {
          self._setProperty(widget, name, null);
          return;
        }

        var s = value.split(",");
        var v = [];

        for (var i=0; i<s.length; i++) {
          v[i] = self._coerce(s[i]);
        }

        self._setProperties(widget, name, v);
      };

      var evalPropertyEditor = {};

      evalPropertyEditor.set = function(widget, name, value)
      {
        if (value == null || value == "")
        {
          self._setProperty(widget, name, null);
          return;
        }

        self._setProperty(widget, name, eval(value));
      };

      var referencePropertyEditor = {};

      referencePropertyEditor.set = function(widget, name, value) {
        self._setProperty(widget, name, window[value]);
      };

      this.registerPropertyEditor('qx.legacy.ui.core.Widget', 'location', commaDelimitedPropertyEditor);
      this.registerPropertyEditor('qx.legacy.ui.core.Widget', 'dimension', commaDelimitedPropertyEditor);

      this.registerPropertyEditor('qx.legacy.ui.core.Widget', 'space', commaDelimitedPropertyEditor);
      this.registerPropertyEditor('qx.legacy.ui.core.Widget', 'edge', commaDelimitedPropertyEditor);

      this.registerPropertyEditor('qx.legacy.ui.core.Widget', 'padding', commaDelimitedPropertyEditor);
      this.registerPropertyEditor('qx.legacy.ui.core.Widget', 'margin', commaDelimitedPropertyEditor);

      this.registerPropertyEditor('qx.legacy.ui.core.Widget', 'heights', commaDelimitedPropertyEditor);
      this.registerPropertyEditor('qx.legacy.ui.core.Widget', 'widths', commaDelimitedPropertyEditor);

      this.registerPropertyEditor('qx.legacy.ui.core.Widget', 'align', commaDelimitedPropertyEditor);
      this.registerPropertyEditor('qx.legacy.ui.core.Widget', 'stretch', commaDelimitedPropertyEditor);

      this.registerPropertyEditor('qx.legacy.ui.core.Widget', 'clipLocation', commaDelimitedPropertyEditor);
      this.registerPropertyEditor('qx.legacy.ui.core.Widget', 'clipDimension', commaDelimitedPropertyEditor);
      this.registerPropertyEditor('qx.legacy.ui.core.Widget', 'clip', commaDelimitedPropertyEditor);

      this.registerPropertyEditor('qx.legacy.ui.menu.Button', 'menu', referencePropertyEditor);
      this.registerPropertyEditor('qx.legacy.ui.toolbar.MenuButton', 'menu', referencePropertyEditor);
      this.registerPropertyEditor('qx.legacy.ui.form.RadioButton', 'manager', referencePropertyEditor);
      this.registerPropertyEditor('qx.legacy.ui.menu.RadioButton', 'group', referencePropertyEditor);

      // a property editor that just tries to coerce the string value into a suitable type
      this._coercePropertyEditor = {};

      this._coercePropertyEditor.set = function(widget, name, value) {
        self._setProperty(widget, name, self._coerce(value));
      };
    },


    /**
     * TODOC
     *
     * @param value {var} TODOC
     * @return {var | boolean | null} TODOC
     */
    _coerce : function(value)
    {
      // don't really care if its null
      if (value == null) return value;

      // is it alreay a javascript type
      if (typeof value == 'object') return value;
      if (typeof value == 'function') return value;
      if (typeof value == 'number') return value;
      if (typeof value == 'boolean') return value;
      if (typeof value == 'date') return value;
      if (typeof value == 'array') return value;

      // is it a number ?
      var n = new Number(value);
      if (!isNaN(n)) return n.valueOf();

      // is it a boolean ?
      if (value == "true") return true;
      if (value == "false") return false;

      // is it a date ?
      var d = Date.parse(value);
      if (d != null && !isNaN(d)) return d;

      // leave it as a string
      if (typeof value == 'string')
      {
        // convert empty string into null
        if (value == "") return null;
      }

      return value;
    },


    /**
     * TODOC
     *
     * @param widget {var} TODOC
     * @param name {var} TODOC
     * @param value {var} TODOC
     * @return {void}
     */
    _setProperty : function(widget, name, value) {
      this._setProperties(widget, name, [ value ]);
    },


    /**
     * TODOC
     *
     * @param widget {var} TODOC
     * @param name {var} TODOC
     * @param value {var} TODOC
     * @return {void}
     * @throws TODOC
     */
    _setProperties : function(widget, name, value)
    {
      // TODO : find a cheaper way to find the setter
      // NOTE : the name is LOWERCASE - hence we iterate all properties of the widget
      //         to try and find a matching one
      var n = "set" + name;

      for (var a in widget)
      {
        if (n == a.toLowerCase())
        {
          var setter = widget[a];
          break;
        }
      }

      if (!setter && this._flags.strict) throw this._newError('no setter defined on widget instance',
      {
        widget   : widget,
        property : name
      });
      setter.apply(widget, value);
    },




    /*
    ------------------------------------------------------------------------------------
      UTILS
    ------------------------------------------------------------------------------------
    */

    /*
    2 format
    1. <qx.legacy.ui.basic.Atom/>
    3. <div qxtype="qx.legacy.ui.basic.Atom"/>
    */

    /**
     * TODOC
     *
     * @param node {Node} TODOC
     * @return {null | var} TODOC
     */
    _extractClassName : function(node)
    {
      if (node.nodeName.toLowerCase() == "div")
      {
        if (!node.attributes['qxtype']) return null;
        return node.attributes['qxtype'].value;
      }
      else
      {
        return node.nodeName;
      }
    },


    /**
     * TODOC
     *
     * @param node {Node} TODOC
     * @return {var} TODOC
     */
    _mapXmlAttribToObject : function(node)
    {
      var r = {};
      var c = node.attributes;

      for (var i=0; i<c.length; i++) {
        r[c[i].name.toLowerCase()] = c[i].value;
      }

      return r;
    },




    /*
    ------------------------------------------------------------------------------------
      EXCEPTION HANDLING / DEBUGGING
    ------------------------------------------------------------------------------------
    */

    /**
     * TODOC
     *
     * @param message {var} TODOC
     * @param data {var} TODOC
     * @param exception {var} TODOC
     * @return {var} TODOC
     */
    _newError : function(message, data, exception)
    {
      var m = message;
      var joiner = "";
      var d = "";

      if (data)
      {
        for (var p in data)
        {
          d += joiner + p + "=" + data[p] + '';
          joiner = " ";
        }

        m += " " + d + " ";
      }

      if (exception) {
        m += " error: " + exception + " ";
      }

      return new Error(m);
    }
  }
});
