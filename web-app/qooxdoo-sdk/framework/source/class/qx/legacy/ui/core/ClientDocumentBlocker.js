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
 * qx.legacy.ui.core.ClientDocumentBlocker blocks the inputs from the user.
 * This will be used internally to allow better modal dialogs for example.
 *
 * @appearance blocker
 */
qx.Class.define("qx.legacy.ui.core.ClientDocumentBlocker",
{
  extend : qx.legacy.ui.basic.Terminator,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    this.initTop();
    this.initLeft();

    this.initWidth();
    this.initHeight();

    this.initZIndex();
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    appearance :
    {
      refine : true,
      init : "client-document-blocker"
    },

    zIndex :
    {
      refine : true,
      init : 1e8
    },

    top :
    {
      refine : true,
      init : 0
    },

    left :
    {
      refine : true,
      init : 0
    },

    width :
    {
      refine : true,
      init : "100%"
    },

    height :
    {
      refine : true,
      init : "100%"
    },

    display :
    {
      refine : true,
      init : false
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    // We must omit that the focus root is changed to the client document
    // when processing a mouse down event on this widget.
    getFocusRoot : function() {
      return null;
    }
  }
});
