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

      this.server = new lecturious.ServerRemote();
      var doc = this.getRoot();
      this.info("AppearanceID" + doc.getAppearance());
      this._doc = doc;
      this._userPage = this.mainSplit();
      doc.add(this._userPage);
      doc.set({
	backgroundColor:"white",
	decorator: "rootBackground"
      });
    },

    server: null,


    mainSplit : function() {
      var mainSplit = new qx.ui.splitpane.Pane("horizontal");
      
      mainSplit.add(this.tabView(),1)
      //mainSplit.add(this.rightSide(),0);

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

    calendarPage : function() {
      var page = new qx.ui.tabview.Page("Calendar");
      page.setLayout(new qx.ui.layout.Grow());
      var calendarSplit = new qx.ui.splitpane.Pane("horizontal");
      //var layout = new qx.ui.layout.Basic();
      //calendarSplit.setLayout(layout);
      calendarSplit.add(this.sidebarCalendarSplit(),0);
      calendarSplit.add(this.mainCalendarSplit(),1);
      page.add(calendarSplit);
      return page;
    },

    sidebarCalendarSplit : function() {
      var layout = new qx.ui.layout.VBox();
      layout.setSpacing(4); // apply spacing

      var container = new qx.ui.container.Composite(layout);
      container.add(this.attendingList());
      container.add(this.abgabeList());
      container.add(this.personalList());

      container.set({
	width:200
      });
      return container;
    },
  
    attendingList : function () {
      var widget = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({
	height:200,
	backgroundColor: "blue"
      });
      var label = new qx.ui.basic.Label("Attending:");
      widget.add(label);
      return widget;
    },
    abgabeList : function () {
      var widget = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({
	height:200,
	backgroundColor: "red"
      });
      var label = new qx.ui.basic.Label("Deadlines:");
      widget.add(label);
      return widget;
    },
    personalList : function () {
      var widget = new qx.ui.container.Composite(new qx.ui.layout.Canvas()).set({
	height:100,
	backgroundColor: "green"
      });
      var label = new qx.ui.basic.Label("Reminders");
      widget.add(label);
      return widget;
    },

    mainCalendarSplit : function() {
      var layout = new qx.ui.layout.Grid();
      layout.setSpacing(4); // apply spacing
      //layout.setRowFlex(0, 1); // make row 0 flexible
      //layout.setColumnWidth(1, 200); // set with of column 1 to 200 pixel
      var container = new qx.ui.container.Composite(layout).set({
	backgroundColor: "grey",
        allowGrowX: true,
        allowGrowY: true
      
      });
      for (var x = 0; x < 6; x++) {
	layout.setRowFlex(x, 1);
	for(var y = 0; y < 7; y++) {
	  layout.setColumnFlex(y, 1);	
	  var labContainer = new qx.ui.container.Composite(new qx.ui.layout.Grow());
	  var label = new qx.ui.basic.Label((x*7+y+1).toString()).set({
	    font : new qx.bom.Font(28, ["Verdana", "sans-serif"]),
	    alignX: "right",
	    alignY: "bottom",
	    textAlign: "center"
	  });
	  labContainer.set({
	    backgroundColor: "white"
	  });
	  labContainer.add(label);
	  container.add(labContainer, {row: x, column: y});  
	}
      }
      return container;
    },

    tabView : function() {
      var tabView = new qx.ui.tabview.TabView();
      tabView.setWidth(700);
      tabView.add(this.universityPage());
      tabView.add(this.testPage());
      tabView.add(this.updatesPage());
      tabView.add(this.calendarPage());
      tabView.add(this.coursePage());
      tabView.add(this.friendsPage());
      

      return tabView;
    },

    openUser : function(id) {
      alert("Not implemented: open user page");
    },

    openCourse : function(id) {
      alert("Not implemented: open course page");
    },

    updatesPage : function() {
      var page = new qx.ui.tabview.Page("Wall");
      var layout = new qx.ui.layout.HBox(20);
      page.setLayout(layout);
      page.add(this.courseList(),{flex:1});
      page.add(this.wall(), {flex:3});
      page.add(this.attendenceList(), {flex:1});
      return page;
    },

    testPage : function() {
      var page = new qx.ui.tabview.Page("Test");
      var layout = new qx.ui.layout.HBox(20);
      page.setLayout(layout);
      var image = new qx.ui.basic.Image("/home/mike/git/flo/StudentLife/web-app/source/background.png");
      image.set({
	backgroundColor: "green"
      });
      page.add(image);
      return page;
    },


    courseList : function() {
      var widget = new qx.ui.container.Composite(new qx.ui.layout.Grow());
      var list = new qx.ui.form.List();
      var itemsList = this.server.subscriptions();
      widget.set({
	width:200,
	backgroundColor:"green"
      });
      for (var x in itemsList) {
	  var item = itemsList[x];
	  list.add(new qx.ui.form.ListItem(item.name).set({model:item}));
      }
      list.addListener("changeSelection", function(e) {
	  var subscription = e.getData()[0].getModel();
	  this.debug(subscription);
	  alert("change wall to course with id " + subscription.id + " not implemented (this message appears twice))");
      });
      widget.add(list);
      return widget;
    },

  

    attendenceList : function() {
      var widget = new qx.ui.container.Composite(new qx.ui.layout.Grow());
      widget.set({
	width:200,
	backgroundColor:"red"
      });

      var list = new qx.ui.form.List();
      var itemsList = this.server.courseUsers(0);
      for (var x in itemsList) {
	  var item = itemsList[x];
	  list.add(new qx.ui.form.ListItem(item.name).set({model:item}));
      };
      /*
      list.addListener("changeSelection", function(e) {
	  var subscription = e.getData()[0].getModel();
	  this.debug(subscription);
	  alert("change wall to course with id " + subscription.id + " not implemented");
      });
      */
      widget.add(list);

      return widget;
    },
  
    wall : function() {
      var page = new qx.ui.container.Composite();
      page.set({
	layout:new qx.ui.layout.VBox(10),
	backgroundColor:"yellow"
      })
      
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
      button.addListener("execute", function(e) {	
	  this.uni_wizard(function() {
	  this._doc.removeAll();
	  this._doc.add(this._userPage);
	  alert("Updating university table not implemented!");
	}, this);
      }, this); 

      var composite = new qx.ui.container.Composite(new qx.ui.layout.Canvas());

      //composite.setLayout(new qx.ui.layout.HBox(5));
	
      //composite.add(label);
      //composite.add(textfield);
      composite.add(button, {top:"0%", right:"0%"});
    
      return composite;
    },

    uni_wizard : function(done) {
      //var container = app.container;
      //var server = app.server;
      var app = this;
      var afterUni = function(uni) {
	app._university = uni;
	app.server.inscribe(app._country, app._state, app._city, app._university);
	done();
      };

      var afterCity = function(city) {
	app._city = city;
	app._doc.removeAll();
	var c = container("Hello, what's your university or school?", 
	  "Your university or school is not in list? Please enter below!", 
	  app.server.universities, [app._country, app._state, app._city], app.server.addUniversity, app.afterUni);
	app._doc.add(c, {edge: 0});
      };

      var afterState = function(state) {
	app._state = state;
	app._doc.removeAll();
	var c = container("Hello, in which city is your university or school?", 
	  "Your city is not in list? Please enter below!", 
	  server.cities, [app._country, app._state], server.addcity, afterCity);
	app._doc.add(c, {edge: 0});
      };

      var afterCountry = function(country) {
	app._country = country;
	app._doc.removeAll();
	var c = this.container("Hello, in which state is your university or school?", 
	  "Your state is not in list? Please enter below!", 
	  app.server.states, [app._country],  app.server.addState, afterState);
	app._doc.add(c, {edge: 0});
      };

      var c = this.container("Hello, in which country is your university or school?", 
	"Your country is not in list? Please enter below!", 
	app.server.countries, [], app.server.addCountry, afterCountry);
      app._doc.removeAll();
      app._doc.add(c, {edge: 0});
    },

   container : function(msg1, msg2, request, requestParams, addMethod, nextMethod) {

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

      var callback = {
	caller : this, 
	success : function(result) {
	  this.info("success:" + result);
	  var items = result["countries"];
	  this.info("items:" + items);
	  for (var x in items) {
	    var item = items[x];
	    this.info("adding:" + item["name"]);
	    list.add(new qx.ui.form.ListItem(item["name"]).set({model:item}));
	  }
	},
	failure : function(msg) {
	  alert(msg);
	}
      };

      request.call(this.server, callback, requestParams);

      var label2 = new qx.ui.basic.Label().set({
	value: msg2
      });
      var nextButton = new qx.ui.form.Button("Next Step>");


      nextButton.addListener("execute", function(e) {
	  nextMethod.call(this, list.getSelection()[0].getModel()["id"]);
      }, this);

      var newEntry = new qx.ui.form.TextField("");
      /*
      newCountry.set({
	width:200px
      });
      */
      var addCallback = {
	caller : this, 
	success : function(result) {
	  alert("Successfully added. Needs refresh of list");
	},
	failure : function(msg) {
	  alert(msg);
	}
      };

      var addButton = new qx.ui.form.Button("Add country");
      addButton.addListener("execute", function(e) {
	  addMethod.call(this.server, addCallback, requestParams, newEntry.getValue());
      }, this);

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
      bottomContainer.add(newEntry.set({height:25, width:150}));
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
