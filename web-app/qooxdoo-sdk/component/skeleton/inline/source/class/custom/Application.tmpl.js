/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(${Namespace}/*)

************************************************************************ */

/**
 * This is the main application class of your custom application "${Name}"
 */
qx.Class.define("${Namespace}.Application",
{
  extend : qx.application.Inline,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     */
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Variant.isSet("qx.debug", "on"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */
      
      
      /*
      -------------------------------------------------------------------------
        USE AN EXISTING NODE TO ADD THE WIDGETS WITHIN THE PAGE FLOW
      -------------------------------------------------------------------------
      */
      
      // Hint: the second and the third parameter control if the dimensions
      // of the element should be respected or not.
      var htmlElement = document.getElementById("isle");
      var inlineIsle = new qx.ui.root.Inline(htmlElement, true, true);
      
      // use VBox layout instead of basic
      inlineIsle.setLayout(new qx.ui.layout.VBox);
      
      // new container
      var container = new qx.ui.container.Composite(new qx.ui.layout.HBox);

      // Create a button
      var button1 = new qx.ui.form.Button("First Button", "${Namespace}/test.png");
      button1.setAllowStretchY(false);
      container.add(button1);
      
      // spacer
      var spacer = new qx.ui.core.Spacer();
      container.add(spacer, { flex: 1 });
      
      // create a date chooser component
      var dateChooser = new qx.ui.control.DateChooser;
      container.add(dateChooser);
      
      // add container to the inline root
      inlineIsle.add(container);

      // Add an event listener
      button1.addListener("execute", function(e) {
        alert("I'm a button inside an inline root widget!\n " + 
              "I nicely fit into the page flow.");
      });
      
      
      /*
      -------------------------------------------------------------------------
        ADD THE WIDGETS WITH ABSOLUTE POSITIONING
      -------------------------------------------------------------------------
      */
      
      // Create a button
      var button2 = new qx.ui.form.Button("First Button", "${Namespace}/test.png");

      // Add button to document at fixed coordinates
      this.getRoot().add(button2, {left: 150, top: 350});

      // Add an event listener
      button2.addListener("execute", function(e) {
        alert("I'm an absolute positioned button!\n " + 
              "I overlay existing content.");
      });
    }
  }
});
