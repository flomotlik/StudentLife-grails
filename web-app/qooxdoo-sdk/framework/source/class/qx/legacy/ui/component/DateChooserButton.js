/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2006 Visionet GmbH, Germany, http://www.visionet.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Dietrich Streifert (level420)

************************************************************************ */

/* ************************************************************************

#asset(qx/compat/icon/CrystalClear/16/apps/accessories-date.png)

************************************************************************ */

/**
 * A date chooser button widget which can be associated to a widget where the date value is synchronized
 * whith the selected date.
 */
qx.Class.define("qx.legacy.ui.component.DateChooserButton",
{
  extend : qx.legacy.ui.form.Button,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param vTargetWidget {qx.legacy.ui.core.Widget} the widget which is the target for the date value selection. The target widget must have a setValue and getValue method.
   * @param vChooserTitle {String} the title of the chooser window. The default value is held in property chooserTitle.
   * @param vButtonLabel {String} the label of the button. The default is null.
   * @param vIcon {String} the icon of the button. The default is 'icon/16/apps/accessories-date.png'.
   * @param vIconWidth {String} derived from qx.legacy.ui.form.Button.
   * @param vIconHeight {String} derived from qx.legacy.ui.form.Button.
   * @param vFlash {String} derived from qx.legacy.ui.form.Button.
   */
  construct : function(vTargetWidget, vChooserTitle, vButtonLabel, vIcon, vIconWidth, vIconHeight, vFlash)
  {
    if (!vIcon) {
      vIcon = 'icon/16/apps/accessories-date.png';
    }

    this.base(arguments, vButtonLabel, vIcon, vIconWidth, vIconHeight, vFlash);
    this.set({ height : 20 });

    this.setChooserTitle(this.tr("Choose a date"));

    // create dateFormat instance
    //
    this._dateFormat = new qx.util.format.DateFormat(qx.locale.Date.getDateFormat(this.getDateFormatSize()));
    qx.locale.Manager.getInstance().addListener("changeLocale", this._changeLocaleHandler, this);

    if (vTargetWidget) {
      this.setTargetWidget(vTargetWidget);
    }

    if (vChooserTitle) {
      this.setChooserTitle(vChooserTitle);
    }

    this.addListener("execute", this._executeHandler, this);
  },



  /*
  *****************************************************************************
     STATICS
  *****************************************************************************
  */

  statics :
  {
    /** Will contain the shared instance of the popup window */
    __chooserWindow : null,

    /** Will contain the shared instance of the date chooser */
    __chooser : null
  },



  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */

  properties :
  {
    /*
    ---------------------------------------------------------------------------
      PROPERTIES
    ---------------------------------------------------------------------------
    */

    /** The target widget the selected Date should be synchronized with. */
    targetWidget :
    {
      check : "qx.legacy.ui.core.Widget",
      init : null,
      nullable : true,
      apply : "_applyTargetWidget"
    },

    /** The title of the date chooser window. */
    chooserTitle : {
      init : ""
    },

    /** The date format size according to the size parameter in {@link qx.locale.Date#getDateFormat}. */
    dateFormatSize :
    {
      check : ["short", "medium", "long", "full"],
      init : "short",
      apply : "_applyDateFormatSize"
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
      MODIFIERS
    ---------------------------------------------------------------------------
    */

    /**
     * Modifier for property targetWidget.
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     * @return {Boolean} true if modification succeeded
     * @throws exception if value is not instance of qx.legacy.ui.core.Widget or does not have setter and getter for property value
     */
    _applyTargetWidget : function(value, old)
    {
      if (value instanceof qx.legacy.ui.core.Widget && qx.legacy.util.Validation.isValidFunction(value.setValue) && qx.legacy.util.Validation.isValidFunction(value.getValue)) {
        return true;
      } else {
        throw new Error("TargetWidget must be an instance of qx.legacy.ui.core.Widget and has setValue and getValue methods");
      }
    },


    /**
     * Modifier for property dateFormatSize.
     *
     * @param value {var} Current value
     * @param old {var} Previous value
     * @return {Boolean} true if modification succeeded
     */
    _applyDateFormatSize : function(value, old) {
      this._changeLocale(value);
    },




    /*
    ---------------------------------------------------------------------------
      SUB WIDGET CREATION
    ---------------------------------------------------------------------------
    */

    /**
     * Create the popup window with for the date chooser and add the date chooser to it.
     *
     * @return {void}
     */
    _createChooserWindow : function()
    {
      if (qx.ui.component.DateChooserButton.__chooserWindow != null) {
        return;
      }

      var win = qx.ui.component.DateChooserButton.__chooserWindow = new qx.ui.window.Window(this.getChooserTitle());

      win.addListener("keydown", this._chooserWindowKeydownHandler, win);
      win.addListener("appear", this._chooserWindowAppearHandler, win);

       win.set({
        top           : 50,
        left          : 50,
        modal         : true,
        minWidth      : null,
        minHeight     : null,
        resizable    : false,
        allowMinimize : false,
        allowMaximize : false,
        showMaximize  : false,
        showMinimize  : false
      });

      win.auto();
      win.add(qx.ui.component.DateChooserButton.__chooser);
      win.addToDocument();
    },


    /**
     * Create the date chooser
     *
     * @return {void}
     */
    _createChooser : function()
    {
      if (qx.ui.component.DateChooserButton.__chooser != null) {
        return;
      }
      var cp = qx.ui.component.DateChooserButton.__chooser = new qx.ui.component.DateChooser;

      cp.auto();
      cp.setBorder(null);

      cp.addListener("select", this._chooserSelectHandler, cp);
    },



    /*
    ---------------------------------------------------------------------------
      HELPERS
    ---------------------------------------------------------------------------
    */


    /**
     * Change the date format to the current locale with the given size
     *
     * @param dateFormatSize {String} The date format size according to the size parameter in {qx.locale.Date.getDateFormat}
     * @return {void}
     * @throws exception if the target widget is not instance of qx.legacy.ui.core.Widget or does not have setter and getter for property value
     */
    _changeLocale : function(dateFormatSize)
    {
      if (qx.legacy.util.Validation.isInvalidObject(this.getTargetWidget())) {
        throw new Error("TargetWidget must be set which must be an instance of qx.legacy.ui.core.Widget and has setValue and getValue method.");
      }

      var date = null;

      try {
        date = this._dateFormat.parse(this.getTargetWidget().getValue());
      } catch(ex) {}

      this._dateFormat = new qx.util.format.DateFormat(qx.locale.Date.getDateFormat(dateFormatSize));

      if (!date) {
        return;
      }

      qx.ui.component.DateChooserButton.__chooser.setDate(date);
      this.getTargetWidget().setValue(this._dateFormat.format(date));
    },




    /*
    ---------------------------------------------------------------------------
      EVENT HANDLER
    ---------------------------------------------------------------------------
    */

    /**
     * Event hanlder for the execute event of the date chooser button.
     *
     * @param e {Event} the received event
     * @return {void}
     * @throws exception if the target widget is not instance of qx.legacy.ui.core.Widget or does not have setter and getter for property value
     */
    _executeHandler : function(e)
    {
      if (qx.legacy.util.Validation.isInvalidObject(this.getTargetWidget())) {
        throw new Error("TargetWidget must be set which must be an instance of qx.legacy.ui.core.Widget and has setValue and getValue method.");
      }

      if (qx.ui.component.DateChooserButton.__chooser == null)
      {
        // create the subwidgets
        this._createChooser();
        this._createChooserWindow();
      }

      // needed to be reset because of multi usage of the window instance
      qx.ui.component.DateChooserButton.__chooserWindow.setCaption(this.getChooserTitle());

      var date = null;

      try {
        date = this._dateFormat.parse(this.getTargetWidget().getValue());
      } catch(ex) {}

      // value from taget widget could not be parsed.
      qx.ui.component.DateChooserButton.__chooser.setDate(date);

      qx.ui.component.DateChooserButton.__chooser.openedButton = this;
      qx.ui.component.DateChooserButton.__chooserWindow.openedButton = this;

      qx.ui.component.DateChooserButton.__chooserWindow.open();
    },


    /**
     * Handle locale changes. Update the date format of the target widget.
     *
     * @param e {Event} the received event
     * @return {void}
     * @throws TODOC
     */
    _changeLocaleHandler : function(e)
    {
      this._changeLocale(this.getDateFormatSize());
    },


    /**
     * Event handler for keydown events of the chooser window. Closes the window on hitting the 'Escape' key.
     *
     * @param e {Event} the received key event
     * @return {void}
     */
    _chooserWindowKeydownHandler : function(e)
    {
      switch(e.getKeyIdentifier())
      {
        case "Escape":
          this.close();
          this.openedButton.getTargetWidget().focus();
          break;
      }
    },


    /**
     * Event handler for chooser window appear event. Positions the window above the target widget.
     *
     * @param e {Event} the received appear event
     * @return {void}
     */
    _chooserWindowAppearHandler : function(e)
    {
      this.positionRelativeTo(this.openedButton.getTargetWidget());
      qx.ui.component.DateChooserButton.__chooser.focus();
    },


    /**
     * Event handler for the date chooser select event. Formats the selected date as string and sets the target widgets value.
     *
     * @param e {Event} the select event
     * @return {void}
     */
    _chooserSelectHandler : function(e)
    {
      var target = this.openedButton.getTargetWidget();
      target.setValue(this.openedButton._dateFormat.format(this.getDate()));
      qx.ui.component.DateChooserButton.__chooserWindow.close();
      target.focus();
    }
  },




  /*
  *****************************************************************************
     DESTRUCTOR
  *****************************************************************************
  */

  destruct : function() {
    qx.locale.Manager.getInstance().removeListener("changeLocale", this._changeLocaleHandler, this);
  }
});
