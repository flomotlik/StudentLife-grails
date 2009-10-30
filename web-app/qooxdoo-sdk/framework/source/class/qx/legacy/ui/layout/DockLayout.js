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

qx.Class.define("qx.legacy.ui.layout.DockLayout",
{
  extend : qx.legacy.ui.core.Parent,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function() {
    this.base(arguments);
  },




  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /** The layout mode (in which order the children should be laid out) */
    mode :
    {
      check : [ "vertical", "horizontal", "ordered" ],
      init : "vertical",
      apply : "_applyMode",
      themeable : true
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
    ---------------------------------------------------------------------------
      APPLY ROUTINES
    ---------------------------------------------------------------------------
    */

    _applyMode : function(value, old) {
      this.addToQueueRuntime("mode");
    },




    /*
    ---------------------------------------------------------------------------
      INIT LAYOUT IMPL
    ---------------------------------------------------------------------------
    */

    /**
     * This creates an new instance of the layout impl this widget uses
     *
     * @param widget {var} TODOC
     * @return {qx.legacy.ui.layout.BoxLayout} TODOC
     */
    _createLayoutImpl : function() {
      return new qx.legacy.ui.layout.impl.DockLayoutImpl(this);
    },




    /*
    ---------------------------------------------------------------------------
      ENHANCED CHILDREN FEATURES
    ---------------------------------------------------------------------------
    */

    /**
     * Add multiple childrens and make them left aligned
     *
     * @param widget {var} TODOC
     * @return {void}
     */
    addLeft : function(widget) {
      this._addAlignedHorizontal("left", arguments);
    },


    /**
     * Add multiple childrens and make them right aligned
     *
     * @param widget {var} TODOC
     * @return {void}
     */
    addRight : function(widget) {
      this._addAlignedHorizontal("right", arguments);
    },


    /**
     * Add multiple childrens and make them top aligned
     *
     * @param widget {var} TODOC
     * @return {void}
     */
    addTop : function(widget) {
      this._addAlignedVertical("top", arguments);
    },


    /**
     * Add multiple childrens and make them bottom aligned
     *
     * @param widget {var} TODOC
     * @return {void}
     */
    addBottom : function(widget) {
      this._addAlignedVertical("bottom", arguments);
    },


    /**
     * TODOC
     *
     * @param vAlign {var} TODOC
     * @param vArgs {var} TODOC
     * @return {void}
     */
    _addAlignedVertical : function(vAlign, vArgs)
    {
      for (var i=0, l=vArgs.length; i<l; i++) {
        vArgs[i].setVerticalAlign(vAlign);
      }

      this.add.apply(this, vArgs);
    },


    /**
     * TODOC
     *
     * @param vAlign {var} TODOC
     * @param vArgs {var} TODOC
     * @return {void}
     */
    _addAlignedHorizontal : function(vAlign, vArgs)
    {
      for (var i=0, l=vArgs.length; i<l; i++) {
        vArgs[i].setHorizontalAlign(vAlign);
      }

      this.add.apply(this, vArgs);
    }
  }
});
