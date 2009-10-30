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
 * @appearance menu-separator
 * @appearance menu-separator-line {qx.legacy.ui.basic.Terminator}
 */
qx.Class.define("qx.legacy.ui.menu.Separator",
{
  extend : qx.legacy.ui.layout.CanvasLayout,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    this.initHeight();

    // Fix IE Styling Issues
    this.setStyleProperty("fontSize", "0");
    this.setStyleProperty("lineHeight", "0");

    // ************************************************************************
    //   LINE
    // ************************************************************************
    this._line = new qx.legacy.ui.basic.Terminator;
    this._line.setAnonymous(true);
    this._line.setAppearance("menu-separator-line");
    this.add(this._line);

    // ************************************************************************
    //   EVENTS
    // ************************************************************************
    // needed to stop the event, and keep the menu showing
    this.addListener("mousedown", this._onmousedown);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    height :
    {
      refine : true,
      init : "auto"
    },

    appearance :
    {
      refine : true,
      init : "menu-separator"
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    /**
     * Returns <code>false</code> to clarify that the Separator widget has no icon
     *
     * @signature function()
     * @return {Boolean} false
     */
    hasIcon : qx.lang.Function.returnFalse,

    /**
     * Returns <code>false</code> to clarify that the Separator widget has no label
     *
     * @signature function()
     * @return {Boolean} false
     */
    hasLabel : qx.lang.Function.returnFalse,

    /**
     * Returns <code>false</code> to clarify that the Separator widget has no shortcut
     *
     * @signature function()
     * @return {Boolean} false
     */
    hasShortcut : qx.lang.Function.returnFalse,

    /**
     * Returns <code>false</code> to clarify that the Separator widget has no sub menu
     *
     * @signature function()
     * @return {Boolean} false
     */
    hasMenu : qx.lang.Function.returnFalse,


    /**
     * Callback method for the "mouseDown" event<br/>
     * Simply stops the propagation of the event
     *
     * @param e {qx.legacy.event.type.MouseEvent} mouseDown event
     * @return {void}
     */
    _onmousedown : function(e) {
      e.stopPropagation();
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeObjects("_line");
  }
});
