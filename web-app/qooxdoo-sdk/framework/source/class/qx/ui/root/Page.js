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
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * This widget provides a root widget for popups and tooltips if qooxdoo is used
 * inside a traditional HTML page. Widgets placed into a page will overlay the
 * HTML content.
 *
 * For this reason the widget's layout is initialized with an instance of
 * {@link qx.ui.layout.Basic}. The widget's layout cannot be changed.
 *
 * Note: This widget does not support decorations!
 *
 * If you want to place widgets inside existing DOM elements
 * use {@link qx.ui.root.Inline}.
 */
qx.Class.define("qx.ui.root.Page",
{
  extend : qx.ui.root.Abstract,





  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param doc {Document} Document to use
   */
  construct : function(doc)
  {
    // Temporary storage of element to use
    this.__doc = doc;

    this.base(arguments);

    // Use a hard-coded basic layout
    this._setLayout(new qx.ui.layout.Basic());

    // Set a high zIndex to make sure the widgets really overlay the HTML page.
    this.setZIndex(10000);

    // Directly add to layout queue
    qx.ui.core.queue.Layout.add(this);

    // Register resize listener
    this.addListener("resize", this.__onResize, this);

    // Register as root
    qx.ui.core.FocusHandler.getInstance().connectTo(this);
  },





  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    __timer : null,
    __doc : null,

    // overridden
    _createContainerElement : function()
    {
      var elem = this.__doc.createElement("div");
      this.__doc.body.appendChild(elem);

      var root = new qx.html.Root(elem);
      root.setStyle("position", "absolute");

      // Store "weak" reference to the widget in the DOM element.
      root.setAttribute("$$widget", this.toHashCode());

      // Mark the element of this root with a special attribute to prevent
      // that qx.event.handler.Focus is performing a focus action.
      // This would end up in a scrolling to the top which is not wanted in
      // a inline scenario
      // see Bug #2740
      if (qx.core.Variant.isSet("qx.client", "gecko")) {
        root.setAttribute("qxIsRootPage", 1);
      }

      return root;
    },


    // overridden
    _createContentElement : function()
    {
      // we do not want overflow=hidden for the page root
      return new qx.html.Element("div");
    },


    // overridden
    _computeSizeHint : function()
    {
      var width = qx.bom.Document.getWidth(this._window);
      var height = qx.bom.Document.getHeight(this._window);

      return {
        minWidth : width,
        width : width,
        maxWidth : width,
        minHeight : height,
        height : height,
        maxHeight : height
      };
    },


    /**
     * Adjust html element size on layout resizes.
     *
     * @param e {qx.event.type.Data} event object
     */
    __onResize : function(e)
    {
      // set the size to 0 so make the content element invisible
      // this works because the content element has overflow "show"
      this.getContainerElement().setStyles({
        width: 0,
        height: 0
      });
      this.getContentElement().setStyles({
        width: 0,
        height: 0
      });
    },


    /**
     * Whether the configured layout supports a maximized window
     * e.g. is a Canvas.
     *
     * @return {Boolean} Whether the layout supports maximized windows
     */
    supportsMaximize : function() {
      return false;
    }
  },




  /*
  *****************************************************************************
     DESTRUCT
  *****************************************************************************
  */

  destruct : function() {
    this._disposeFields("__doc");
  }
});
