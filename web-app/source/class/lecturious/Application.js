/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/* ************************************************************************

#asset(lecturious/*)
#requires(lecturious/Server)

************************************************************************ */

/**
 * This is the main application class of your custom application "test-wizard"
 */
qx.Class.define("lecturious.Application",
{
  extend : qx.application.Standalone,



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

      this.server = new lecturious.Server();
      var doc = this.getRoot();
      this._doc_ = doc;
      this._userPage_ = this.mainSplit();
      doc.add(this._userPage_);
      doc.set({backgroundColor:"white"});
    },

    server: null,


    mainSplit : function() {
      var mainSplit = new qx.ui.splitpane.Pane("horizontal");
      
      mainSplit.add(this.tabView(),1)
      mainSplit.add(this.rightSide(),0);

      mainSplit.set({
	width:760
      })
      return mainSplit;
    },

    rightSide : function() {
      var mainContainer = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
      var image = new qx.ui.basic.Image("lecturious/logo.png");
      image.set({
	width:200,
	height:200
      });

      mainContainer.set({
	width:200
      });
      mainContainer.add(image);
      return mainContainer;
    },



    courseTable : function() 
    {
      var server = this.server;
      var tableModel = this._tableModel = new qx.ui.table.model.Simple();

      var data = this.server.subscriptions();
      tableModel.setColumnIds([ "id", "name", "time", "prof", "uni", "remove"]);
      tableModel.setColumns(["ID", "Name", "Zeit", "Professor", "University", "X"]);  
      tableModel.setColumnEditable(1, false);
      tableModel.setColumnEditable(2, false);
      tableModel.setColumnSortable(3, false);
      tableModel.setColumnEditable(4, false);
      tableModel.setColumnEditable(5, false);

      tableModel.setDataAsMapArray(data);
      for (var x in data) {
	tableModel.setValue(5, x, "X");
      }
      //tableModel.setData([["A1","A2","A3"]["B1","B2","B3"]])

      var table = new qx.ui.table.Table(tableModel); // call after finished all set operation on  model
      table.setColumnWidth(0, 20);
      table.setColumnWidth(5, 20);
      table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);

      table.set({
        width: 500,
        height: 400,
        decorator : null
      });

      table.addListener("cellClick", function(e) {	

	  this.debug("Column:" + e.getColumn(), ";Row:" + e.getRow());
	  if (e.getColumn() == 5) {
	    var row = tableModel.getRowDataAsMap(e.getRow());
	    this.debug(row);
	    alert("Removing subscription to course " + row["name"] + "?");
	    server.removeSubscription(row["id"]);
	  }
      });

      
      this.info(data);
      return table;
    },

    universityTable : function() 
    {
      
      var tableModel = this._tableModel = new qx.ui.table.model.Simple();

      var data = this.server.inscriptions();
      tableModel.setColumnIds([ "id", "name", "city", "state", "country"]);
      tableModel.setColumns(["ID", "Name", "City", "State", "Country"]);  
      tableModel.setColumnEditable(1, false);
      tableModel.setColumnEditable(2, false);
      tableModel.setColumnSortable(3, false);
      tableModel.setColumnEditable(4, false);
      tableModel.setColumnEditable(5, false);
      
      tableModel.setDataAsMapArray(data);
      //tableModel.setData([["A1","A2","A3"]["B1","B2","B3"]])

      var table = new qx.ui.table.Table(tableModel); // call after finished all set operation on  model
      table.setColumnWidth(0, 20);
      table.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);

      table.set({
        width: 500,
        height: 400,
        decorator : null
      });

      this.info(data);
      return table;
    },


    coursePage : function() {	
      var page = new qx.ui.tabview.Page("Courses");
      page.setLayout(new qx.ui.layout.VBox(10));
      page.add(this.searchCourse());
      page.add(this.courseTable());
      return page;
    },

    universityPage : function() {
      var page = new qx.ui.tabview.Page("Universities");
      page.setLayout(new qx.ui.layout.VBox(10));
      page.add(this.addUniversity());
      page.add(this.universityTable());
      return page;
    },

    tabView : function() {
      var tabView = new qx.ui.tabview.TabView();
      tabView.setWidth(500);
      tabView.add(this.updatesPage());
      tabView.add(this.coursePage());
      tabView.add(this.friendsPage());
      tabView.add(this.universityPage());

      return tabView;
    },

    openUser : function(id) {
      alert("Not implemented: open user page");
    },

    openCourse : function(id) {
      alert("Not implemented: open course page");
    },

    updatesPage : function() {
      var page = new qx.ui.tabview.Page("Latest Updates");
      page.setLayout(new qx.ui.layout.VBox(10));	
      var updates = this.server.updates();
      var openCourse = this.openCourse;
      var openUser = this.openUser;
      for(var x in updates) {
	var update = updates[x]; 
	var type = update["type"];
	var container = new qx.ui.container.Composite(new qx.ui.layout.HBox(0));
	
	var label1 = new qx.ui.basic.Label(update["userName"]).set({textColor:"blue"});
	label1.addListener("click", function(e) {
	    openUser(update["user"]);
	});
	container.add(label1);
	
	if (type == "Note") {
	  container.add(new qx.ui.basic.Label("posted a note in course "));
	  var label2 = new qx.ui.basic.Label(update["courseName"] + ":").set({textColor:"blue"});
	  label2.addListener("click", function(e){
	      openCourse(update["course"]);
	  });
	  container.add(label2);
	  container.add(new qx.ui.basic.Label(update["text"]));		
	}
	if (type == "Link") {
	  container.add(new qx.ui.basic.Label("posted a link: "));	
	  var url = update["url"];
	  var link = "<a href=\"" + url+ "\" target=\"_blank\">" + url + "</a>";
	  container.add(new qx.ui.basic.Label(link).set({rich:true}));	
	}
	if (type == "Create") {
	  container.add(new qx.ui.basic.Label("created course "));	
	  var label2 = new qx.ui.basic.Label(update["courseName"]).set({textColor:"blue"});
	  label2.addListener("click", function(e){
	      openCourse(update["course"]);
	  });
	  container.add(label2);
	}
	if (type == "Subscription") {
	  container.add(new qx.ui.basic.Label("subscribed to course "));	
	  var label2 = new qx.ui.basic.Label(update["courseName"]).set({textColor:"blue"});
	  label2.addListener("click", function(e){
	      openCourse(update["course"]);
	  });
	  container.add(label2);
	}
	page.add(container);
      }
      return page;
    },

    


    friendsPage : function() {
      var page = new qx.ui.tabview.Page("Friends");
      page.setLayout(new qx.ui.layout.Grow());
      page.add(this.friendsWidget());
      return page;
    },

    friendsWidget : function() {
	var tree = new qx.ui.tree.Tree().set({
	  width : 500
	});
	var friends = this.server.friends();
	var root = new qx.ui.tree.TreeFolder("Friends");
	var openUser = this.openUser;
	var openCourse = this.openCourse;
	tree.setRoot(root);
	root.setOpen(true);
	for (var x in friends) {
	  var friend = friends[x];
	  var folder = new qx.ui.tree.TreeFolder(friend["name"]);
	  folder.addListener("click", function() {
	      openUser(friend["id"]);
	  });
	  folder.setModel(friend);
	  folder.setOpen(true);
	  var courses = friend["courses"];
	  for (var y in courses) {
	     var course = courses[y];
	      var leaf = new qx.ui.tree.TreeFile(course["name"]);
	      leaf.addListener("click", function() {
		  openCourse(course["id"]);
	      });
	      folder.add(leaf);
	      leaf.setModel(course);
	  }
	  root.add(folder);
	}
	return tree;
    },


    searchCourse : function() {
      var label = new qx.ui.basic.Label("Add course");
      var textfield = new qx.ui.form.TextField();
      var button = new qx.ui.form.Button("Search");
      button.addListener("execute", function(e) {
	alert("Search course not implemented!");
      });

      var composite = new qx.ui.container.Composite()

      composite.setLayout(new qx.ui.layout.HBox(5));
	
      composite.add(label);
      composite.add(textfield);
      composite.add(button);
    
      return composite;
    },


    addUniversity: function() {
      //var label = new qx.ui.basic.Label("Add university");
      //var textfield = new qx.ui.form.TextField();
      var button = new qx.ui.form.Button("Add university");
      var app = this;
      button.addListener("execute", function(e) {	
	app.uni_wizard(app, function() {
	  app._doc_.removeAll();
	  app._doc_.add(app._userPage_);
	  alert("Updating university table not implemented!");
	});
      }); 

      var composite = new qx.ui.container.Composite(new qx.ui.layout.Canvas());

      //composite.setLayout(new qx.ui.layout.HBox(5));
	
      //composite.add(label);
      //composite.add(textfield);
      composite.add(button, {top:"0%", right:"0%"});
    
      return composite;
    },

    uni_wizard : function(app, done) {
      var container = app.container;
      var server = app.server;
      var doc = app._doc_;
      var afterUni = function(uni) {
	app._university = uni;
	server.inscribe(uni);
	done();
      };

      var afterCity = function(city) {
	app._city_ = city;
	doc.removeAll();
	var c = container("Hello, what's your university or school?", 
	  "Your university or school is not in list? Please enter below!", 
	  server.universities(city), server.addUniversity, afterUni);
	doc.add(c, {edge: 0});
      };

      var afterState = function(state) {
	app._state = state;
	doc.removeAll();
	var c = container("Hello, in which city is your university or school?", 
	  "Your city is not in list? Please enter below!", 
	  server.cities(state), server.addcity, afterCity);
	doc.add(c, {edge: 0});
      };

      var afterCountry = function(country) {
	app._country_ = country;
	doc.removeAll();
	var c = container("Hello, in which state is your university or school?", 
	  "Your state is not in list? Please enter below!", 
	  server.states(country), server.addState, afterState);
	doc.add(c, {edge: 0});
      };

      var c = container("Hello, in which country is your university or school?", 
	"Your country is not in list? Please enter below!", 
	server.countries(), server.addCountry, afterCountry);
      doc.removeAll();
      doc.add(c, {edge: 0});
    },

   container : function(msg1, msg2, itemsList, addMethod, nextMethod) {

      var layout = new qx.ui.layout.VBox();
      layout.setSpacing(4); // apply spacing

      var container = new qx.ui.container.Composite(layout);


      // Create a button
      var button1 = new qx.ui.form.Button("First Button", "test_wizard/test.png");

      var label1 = new qx.ui.basic.Label().set({
	value: msg1
      });
      var list = new qx.ui.form.List();
    /*
      list.set({
	width:200px
      });
*/
      
      //var itemsList = serverMethod();
      for (var x in itemsList) {
	  var item = itemsList[x];
	  list.add(new qx.ui.form.ListItem(item.name).set({model:item}));
      }

      var label2 = new qx.ui.basic.Label().set({
	value: msg2
      });
      var nextButton = new qx.ui.form.Button("Next Step>");

      nextButton.addListener("execute", function(e) {
	  nextMethod(list.getSelection()[0].getModel());
      });

      var newCountry = new qx.ui.form.TextField("");
      /*
      newCountry.set({
	width:200px
      });
      */
      var addButton = new qx.ui.form.Button("Add country");
      addButton.addListener("execute", function(e) {
	  addMethod(newCountry.getValue());
      });

      var mainHBox = new qx.ui.layout.HBox();
      mainHBox.set({
	spacing:5
      });
      
      var mainContainer = new qx.ui.container.Composite(mainHBox);
      //mainContainer.set({allowGrowY:false});
      mainContainer.add(new qx.ui.core.Widget().set({width:50}));
      mainContainer.add(list.set({width:150}));
      mainContainer.add(nextButton.set({height:25, width:100, allowGrowY:false}));

      var bottomHBox = new qx.ui.layout.HBox();
      bottomHBox.set({
	spacing:5
      });
      
      var bottomContainer = new qx.ui.container.Composite(bottomHBox);
      bottomContainer.add(new qx.ui.core.Widget().set({width:50}));
      bottomContainer.add(newCountry.set({height:25, width:150}));
      bottomContainer.add(addButton.set({height:25, width:100, allowGrowY:false}));
      // Document is the application root

      container.set({
	margin:10
      });
      container.add(label1);
      container.add(mainContainer);
      container.add(label2);
      container.add(bottomContainer);
      return container;
    }

  } //members
});
