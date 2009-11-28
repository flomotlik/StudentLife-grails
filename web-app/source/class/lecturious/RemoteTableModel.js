 qx.Class.define("lecturious.RemoteTableModel",
{
  extend : qx.ui.table.model.Remote,
 
  construct: function() {
  },

  members :
  {
     // overloaded - called whenever the table requests the row count
    _loadRowCount : function()
    {
      // Call the backend service (example) - using XmlHttp 
      var url  = "http://localhost:8080/lecturious-grails/service/countRows";
      var req = new qx.io.remote.Request(url, "GET", "application/json");
 
      // Add listener
      req.addListener("completed", this._onRowCountCompleted, this);
 
      // send request
      req.send();
    },
 
    // Listener for request of "_loadRowCount" method
    _onRowCountCompleted : function(response)
    {
       var result = response.getContent();
       if (result != null)
       {
          // Apply it to the model - the method "_onRowCountLoaded" has to be called
          this._onRowCountLoaded(result);
       }
    },
 
   
    // overloaded - called whenever the table requests new data
    _loadRowData : function(firstRow, lastRow)
    {
       // Call the backend service (example) - using XmlHttp 
       var baseUrl  = "http://localhost:8080/lecturious-grails/service/getRows";
       var parameters = "?from=" + firstRow + "&to=" + lastRow;
       var url = baseUrl + parameters;
       var req = new qx.io.remote.Request(url, "GET", "application/json");
 
       // Add listener
       req.addListener("completed", this._onLoadRowDataCompleted, this);      
  
       // send request
       req.send();
    },
 
     // Listener for request of "_loadRowData" method
    _onLoadRowDataCompleted : function(response)
    {
        var result = response.getContent();
       if (result != null)
       {
          // Apply it to the model - the method "_onRowDataLoaded" has to be called
          this._onRowDataLoaded(result);   
       }        
    }
  }
});
