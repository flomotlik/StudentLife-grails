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

/* ************************************************************************


************************************************************************ */

qx.Class.define("qx.legacy.ui.pageview.AbstractBar",
{
  type : "abstract",
  extend : qx.legacy.ui.layout.BoxLayout,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  construct : function()
  {
    this.base(arguments);

    this._manager = new qx.legacy.ui.selection.RadioManager;

    this.addListener("mousewheel", this._onmousewheel);
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * Get the selection manager.
     *
     * @return {qx.legacy.ui.selection.RadioManager} the selection manager of the bar.
     */
    getManager : function() {
      return this._manager;
    },


    _lastDate : (new Date(0)).valueOf(),


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {void}
     */
    _onmousewheel : function(e)
    {
      // Make it a bit lazier than it could be
      // Hopefully this is a better behaviour for fast scrolling users
      var vDate = (new Date).valueOf();

      if ((vDate - 50) < this._lastDate) {
        return;
      }

      this._lastDate = vDate;

      var vManager = this.getManager();
      var vItems = vManager.getEnabledItems();
      var vPos = vItems.indexOf(vManager.getSelected());

      if (this.getWheelDelta(e) > 0)
      {
        var vNext = vItems[vPos + 1];

        if (!vNext) {
          vNext = vItems[0];
        }
      }
      else if (vPos > 0)
      {
        var vNext = vItems[vPos - 1];

        if (!vNext) {
          vNext = vItems[0];
        }
      }
      else
      {
        vNext = vItems[vItems.length - 1];
      }

      vManager.setSelected(vNext);
    },


    /**
     * TODOC
     *
     * @param e {Event} TODOC
     * @return {var} TODOC
     */
    getWheelDelta : function(e) {
      return e.getWheelDelta();
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    this._disposeObjects("_manager");
  }
});
