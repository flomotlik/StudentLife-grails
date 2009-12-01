/* ************************************************************************

   Copyright: 

   License: AGPLv3

   Authors: Michael Greifeneder

************************************************************************ */

/* ************************************************************************

#asset(lecturious/*)

************************************************************************ */


/**
 * This is the solely class to access thes server. 
 */


qx.Class.define("lecturious.ServerRemote",
{
  extend: qx.core.Object,

  construct : function() {
    this.base(arguments);
  },



  members :
  {

  
    ajaxCall : function(callback, url, requestType,  postProcessing) {
        this.info("Url:" + url);
	var req = new qx.io.remote.Request(url, requestType, "application/json");
        //req.setCrossDomain(true);
	req.addListener("completed", function(e) {
                this.info("completed:" + e);
	  	callback["success"].call(callback["caller"], postProcessing(e.getContent()));
	});
        var failed = function(e) {
	    callback["failure"].call(callback["caller"], e);
	}; 
        req.addListener("failed", failed);
        req.addListener("timeout", failed);
        req.addListener("aborted", failed);
	return req;
    },
  
    serverUrl : "http://localhost:8080",

    defaultPostProcessing : function(result) {
      return result;
    },
    
  
    countries : function(callback) {
      var req = this.ajaxCall(callback, this.serverUrl + "/app/country/list", "GET", function(result) {
	return result["countries"];
      });
      req.send();
      //return [{id:1, name:"Österreich"}, {id:2, name:"Deutschland"},{id:3, name:"Schweiz"}];
    },

    addCountry : function(callback, name) {
      var request = this.ajaxCall(callback, this.serverUrl +  "/app/country/add", "POST", this.defaultPostProcessing);
      request.setParameter("name", name);
      request.send();
    },
    
    states : function(callback, params) {
      var req = this.ajaxCall(callback, this.serverUrl + "/app/state/list/" + params[0], "GET", function(result) {
	  return result["states"];
      });
      req.send();
    },

    addState : function(callback, params, name) {
      var request = this.ajaxCall(callback, this.serverUrl +  "/app/state/add/" + params[0], "POST", this.defaultPostProcessing);
      request.setParameter("name", name);
      request.send();
    },
    
    cities : function(callback, params) {
      var req = this.ajaxCall(callback, this.serverUrl + "/app/city/list/" + params[0] + "/" + params[1], "GET", function(result) {	
	return result["cities"];
      });
      req.send();
    },	

    addCity : function(callback, params, name) {
      var request = this.ajaxCall(callback, this.serverUrl +  "/app/city/add/" + params[0] + "/" + params[1], "POST", this.defaultPostProcessing);
      request.setParameter("name", name);
      request.send();
    },

    universities : function(callback, params) {
      var req = this.ajaxCall(callback, this.serverUrl + "/app/university/list/" + params[0] + "/" + params[1] + "/" + params[2],  "GET", function(result) {
	return result["universities"];
      });
      req.send();
    },
     
    addUniversity : function(callback, params, name) {
      var request = this.ajaxCall(callback, this.serverUrl +  "/app/university/add/" + params[0] + "/" + params[1]+ "/" + params[2], "POST", this.defaultPostProcessing);
      request.setParameter("name", name);
      request.send();
    },

    inscriptions : function() {
      return [{id:1, name: "TU Wien", city:"Wien", state:"Wien", country:"Österreich"},{id:2, name:"Universität Wien", city:"Wien", state:"Wien", country:"Austria"}];
    },

    subscriptions : function() {
      return [{id:"1", name:"Mathematik 1", time:"WS09", prof:"Panholzer", uni:"TU Wien"}, 
	      {id:"2", name:"Grundzüge der Informatik", time:"WS09", prof:"Schildt", uni:"TU Wien" }, 
	      {id:"3", name: "User Interface Design", time:"WS09", prof:"Purgathofer, Peter", uni:"TU Wien"} ];
    },

    searchUni : function(pattern) {
      return [];
    },

    searchCourse : function(pattern) {
      return [{id:1, name:"Demo Course"}, {id:2,name:"DemoCourse2"},{id3:"DemoCourse3"},{id:4,name:"DemoCourse4"}];
    },

    friends : function() {
      return [];
    },

    members : function(course) {
      return [];
    },

    inscribe : function(university) {
      alert("inscribe() is not implemented!");
      return "Not implemented";
    },
    
    subscribe : function(course) {
      alert("subscribe() is not implemented!");
      return "Not implemented";
    },

    removeSubscription : function(subscription) {
      alert("removeSubscription() is not implemented!");
      return "Not implemented";
    },

    friends : function() {
      return [
	  {id:1, name:"Elisabeth Maier", courses:[
	    {id:1, name:"Mathematik 1"},
	    {id:2, name:"Mathematik 2"}
	  ]},
	  {id:2,name:"Thomas Renner", courses:[
	    {id:2, name:"Mathematik 2"}
	  ]},
	  {id:3, name:"Michael Muster"}, 
	  {id:4, name:"Eva Lauscher"}
	  ];
    },

    updates : function() {
      return [
	  {type:"Note", userName:"Eva Lauscher", user:4, text:"Vorlesung ist morgen nicht!", course:1, courseName:"Mathematik 1"},
	  {type:"Link", userName:"Michael Muster", user:7, url:"http://www.tuwien.ac.at", course:2, courseName:"Mathematik 2"},
	  {type:"Subscription", userName:"Michael Muster", user:8, url:"http://www.tuwien.ac.at", course:3, courseName:"Einführung in das Programmieren"},
	  {type:"Note", userName:"Hans Huber", user:3, text:"Wie geht das?", course:7, courseName:"Hochbau"},
	  {type:"Create", userName:"Karl Mexner", user:2, course:10, courseName:"Holzbau"}
	];
    },

    courseUsers  : function(course) {
      return [
	  {id:1, name:"Elisabeth Maier"},
	  {id:2, name:"Thomas Renner"},
	  {id:3, name:"Michael Muster"}, 
	  {id:4, name:"Eva Lauscher"}
	  ];
    }

  }
});
