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


qx.Class.define("lecturious.Server",
{
  extend: qx.core.Object,

  construct : function() {
    this.base(arguments);
  },

  members :
  {
    countries : function() {
      return [{id:1, name:"Österreich"}, {id:2, name:"Deutschland"},{id:3, name:"Schweiz"}];
    },

    addCountry : function(name) {
      alert("addCountry() is not implemented!");
      return "Not implemented";
    },
    
    states : function(country) {
      return [{id:1, name:"Wien"}, {id:2, name:"Oberösterrreich"}, {id:3, name:"Kärnten"}];
    },

    addState : function(country, name) {
      alert("addState() is not implemented!");
      return "Not implemented";
    },
    
    cities : function(state) {
      return [{id:1, name:"Wien"}, {id:2, name:"Linz"}, {id:3, name:"Klagenfurt"}];
    },	

    addCity : function(state, name) {
      alert("addCity() is not implemented!");
      return "Not implemented";
    },

    universities : function(city) {
      return [{id:1, name:"TU Wien"},{id:2, name:"Universität Wien"},{id:3, name:"Boku Wien"}, {id:4, name:"WU Wien"}, {id:5, name:"VetMed"}, {id:6, name:"MedUni"}, {id:7, name:"FH Wien"}, {id:8, name:"Modul Uni"}, {id:9, name:"Angewandte"}];
    },
     
    addUniversity : function(city, name) {
      alert("addUniversity() is not implemented!");
      return "Not implemented";
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
    }

  }
});
