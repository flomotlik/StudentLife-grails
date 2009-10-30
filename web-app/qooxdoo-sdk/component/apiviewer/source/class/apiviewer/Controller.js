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
     * Til Schneider (til132)
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)
     * Fabian Jakobs (fjakobs)
     * Jonathan Weiß (jonathan_rass)

************************************************************************ */

/**
 * Implements the dynamic behavior of the API viewer.
 * The GUI is defined in {@link Viewer}.
 */
qx.Class.define("apiviewer.Controller",
{
  extend : qx.core.Object,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param widgetRegistry {Viewer} the GUI
   */
  construct : function(widgetRegistry)
  {
    this.base(arguments);

    this._widgetRegistry = apiviewer.MWidgetRegistry;

    this._titlePrefix = "API Documentation";
    document.title = this._titlePrefix;

    this._classLoader = new apiviewer.ClassLoader("./script");

    this._detailLoader = this._widgetRegistry.getWidgetById("detail_loader");
    this._packageViewer = this._widgetRegistry.getWidgetById("package_viewer");
    this.__bindViewer(this._packageViewer);

    this._classViewer = this._widgetRegistry.getWidgetById("class_viewer");
    this.__bindClassViewer();

    this._tree = this._widgetRegistry.getWidgetById("tree");
    this.__bindTree();

    this.__bindToolbar();

    this._history = qx.bom.History.getInstance();
    this.__bindHistory();
  },


  members :
  {
    // overridden
    $$logCategory : "application",

    /**
     * Loads the API doc tree from a URL. The URL must point to a JSON encoded
     * doc tree.
     *
     * @param url {String} the URL.
     */
    load : function(url)
    {
      var req = new qx.io.remote.Request(url);

      req.setTimeout(180000);
      req.setProhibitCaching(false);

      req.addListener("completed", function(evt)
      {
        var loadEnd = new Date();

        if (qx.core.Variant.isSet("qx.debug", "on")) {
          this.debug("Time to load data from server: " + (loadEnd.getTime() - loadStart.getTime()) + "ms");
        }

        var content = evt.getContent();

        var start = new Date();
        var treeData = eval("(" + content + ")");
        var end = new Date();

        if (qx.core.Variant.isSet("qx.debug", "on")) {
          this.debug("Time to eval tree data: " + (end.getTime() - start.getTime()) + "ms");
        }

        // give the browser a chance to update its UI before doing more
        qx.event.Timer.once(function() {
          this.__setDocTree(treeData);

          // Handle bookmarks
          var state = this._history.getState();
          if (state)
          {
            qx.event.Timer.once(function() {
              this.__selectItem(this.__decodeState(state));
            }, this, 0);
          }

          this._detailLoader.setHtml(
            '<div style="padding:10px;"><h1><small>' +
            qx.core.Setting.get("apiviewer.title") +
            '</small>API Documentation</h1></div>'
          );

        }, this, 0);
      }, this);

      req.addListener("failed", function(evt) {
        this.error("Couldn't load file: " + url);
      }, this);

      var loadStart = new Date();
      req.send();
    },


    /**
     * binds the events of the class viewer
     */
    __bindClassViewer : function()
    {
      this._classViewer.addListener("classLinkClicked", function(e) {
          this.__selectItem(e.getData());
      }, this);

      this.__bindViewer(this._classViewer);
    },


    __bindViewer : function(viewer)
    {
      var uiModel = apiviewer.UiModel.getInstance();
      uiModel.bind("showInherited", viewer, "showInherited");
      uiModel.bind("expandProperties", viewer, "expandProperties");
      uiModel.bind("showProtected", viewer, "showProtected");
      uiModel.bind("showPrivate", viewer, "showPrivate");
    },


    /**
     * binds the selection event of the package tree.
     */
    __bindTree : function()
    {
      this._tree.addListener("changeSelection", function(evt) {
        var treeNode = evt.getData()[0];
        if (treeNode && treeNode.getUserData("nodeName") && !this._ignoreTreeSelection)
        {
          var nodeName = treeNode.getUserData("nodeName");

          // the history update will cause _selectClass to be called.
          this._updateHistory(nodeName);
        }
      }, this);
    },


    /**
     * binds the actions of the toolbar buttons.
     */
    __bindToolbar : function()
    {
      var uiModel = apiviewer.UiModel.getInstance();

      var btn_inherited = this._widgetRegistry.getWidgetById("btn_inherited");
      btn_inherited.bind("value", uiModel, "showInherited");
      uiModel.bind("showInherited", btn_inherited, "value");


      var btn_expand = this._widgetRegistry.getWidgetById("btn_expand");
      btn_expand.bind("value", uiModel, "expandProperties");
      uiModel.bind("expandProperties", btn_expand, "value");

      var btn_protected = this._widgetRegistry.getWidgetById("btn_protected");
      btn_protected.bind("value", uiModel, "showProtected");
      uiModel.bind("showProtected", btn_protected, "value");

      var btn_private = this._widgetRegistry.getWidgetById("btn_private");
      btn_private.bind("value", uiModel, "showPrivate");
      uiModel.bind("showPrivate", btn_private, "value");
    },


    /**
     * bind history events
     */
    __bindHistory : function()
    {
      this._history.addListener("request", function(evt) {
        var item = this.__decodeState(evt.getData());
        if (item) {
          this.__selectItem(item);
        }
      }, this);
    },


    /**
     * Loads the documentation tree.
     *
     * @param docTree {apiviewer.dao.Package} root node of the documentation tree
     */
    __setDocTree : function(docTree)
    {
      var start = new Date();
      var rootPackage = new apiviewer.dao.Package(docTree);
      var end = new Date();

      if (qx.core.Variant.isSet("qx.debug", "on")) {
        this.debug("Time to build data tree: " + (end.getTime() - start.getTime()) + "ms");
      }

      var start = new Date();
      this._tree.setTreeData(rootPackage);
      var end = new Date();

      if (qx.core.Variant.isSet("qx.debug", "on")) {
        this.debug("Time to update tree: " + (end.getTime() - start.getTime()) + "ms");
      }

      return true;
    },


    /**
     * Push the class to the browser history
     *
     * @param className {String} name of the class
     */
    _updateHistory : function(className)
    {
      var newTitle = className + " - " + this._titlePrefix;
      qx.bom.History.getInstance().addToHistory(this.__encodeState(className), newTitle);
    },


    /**
     * Display information about a class
     *
     * @param classNode {apiviewer.dao.Class} class node to display
     */
    _selectClass : function(classNode, callback, self)
    {
      this._detailLoader.exclude();

      var cb = callback ? qx.lang.Function.bind(callback, self) : function() {};

      if (classNode instanceof apiviewer.dao.Class)
      {
        this._classLoader.classLoadDependendClasses(classNode, function(cls)
        {
          this._packageViewer.exclude();
          this._classViewer.setDocNode(cls);
          this._classViewer.show();
          cb();
        }, this);
      }
      else
      {
        this._classLoader.packageLoadDependendClasses(classNode, function()
        {
          this._classViewer.exclude();
          this._packageViewer.setDocNode(classNode);
          this._packageViewer.show();
          cb();
        }, this);
      }
    },


    /**
     * Selects an item (class, property, method or constant).
     *
     * @param fullItemName {String} the full name of the item to select.
     *          (e.g. "qx.mypackage.MyClass" or "qx.mypackage.MyClass#myProperty")
     *
     * @lint ignoreDeprecated(alert)
     */
    __selectItem : function(fullItemName)
    {
      var className = fullItemName;
      var itemName = null;
      var hashPos = fullItemName.indexOf("#");

      if (hashPos != -1)
      {
        className = fullItemName.substring(0, hashPos);
        itemName = fullItemName.substring(hashPos + 1);

        var parenPos = itemName.indexOf("(");

        if (parenPos != -1) {
          itemName = qx.lang.String.trim(itemName.substring(0, parenPos));
        }
      }

      // ignore changeSelection events
      this._ignoreTreeSelection = true;
      var couldSelectTreeNode = this._tree.selectTreeNodeByClassName(className);
      this._ignoreTreeSelection = false;

      if (!couldSelectTreeNode) {
        this.error("Unknown class: " + className);
        alert("Unknown class: " + className);
        return;
      }

      var nodeName = this._tree.getSelection()[0].getUserData("nodeName");

      /**
       * @lint ignoreDeprecated(alert)
       */
      this._selectClass(apiviewer.dao.Class.getClassByName(nodeName), function()
      {
        if (itemName)
        {
          if (!this._classViewer.showItem(itemName))
          {
            this.error("Unknown item of class '"+ className +"': " + itemName);
            alert("Unknown item of class '"+ className +"': " + itemName);
            return;
          }
        } else {
          this._classViewer.getContainerElement().scrollToY(0);
        }
        this._updateHistory(fullItemName);

      }, this);

    },


    __encodeState : function(state) {
      return state.replace(/(.*)#(.*)/g, "$1~$2")
    },

    __decodeState : function(encodedState) {
      return encodedState.replace(/(.*)~(.*)/g, "$1#$2")
    }
  },



  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function()
  {
    this._disposeFields("_widgetRegistry");
    this._disposeObjects("_detailLoader", "_packageViewer",
      "_classViewer", "_classLoader", "_tree", "_history");
  }
});
