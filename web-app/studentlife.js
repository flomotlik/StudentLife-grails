function course_json() {
        //Look up the node we'll stick the text under.
        var targetNode = dojo.byId("course_menu");
        //The parameters to pass to xhrGet, the url, how to handle it, and the callbacks.
        var jsonArgs = {
	    url: "test/subscriptions.json",
            //url: "app/user/listCourses",
	    handleAs: "json",
            load: function(data) {
	        var li_html = "";
		for(var x in data) {
		    var item = data[x];
		    li_html  += ("<li class=\"course-item\">" + item["name"] + "</li>");
		}
                targetNode.innerHTML = li_html;
		_typeface_js.renderDocument();
            },
            error: function(error) {
                targetNode.innerHTML = "An unexpected error occurred: " + error;
            }
        };
	dojo.xhrGet(jsonArgs);
  

        /*dojo.io.script.get(jsonpArgs);*/
    }
    function attending_json() {
        //Look up the node we'll stick the text under.
        var targetNode = dojo.byId("attending_list");
        //The parameters to pass to xhrGet, the url, how to handle it, and the callbacks.
        var jsonArgs = {
	    url: "test/alsoAttending.json",
            //url: "app/user/listCourses",
	    handleAs: "json",
            load: function(data) {
	        var li_html = "";
		for(var x in data) {
		    var item = data[x];
		    li_html  += (
			"<li class=\"attending-item\">" +
			  "<div class=\"attending-image\"><img src=\"" + item["image"] + "\"/></div>" + 
			  "<div class=\"attending-box\">" + 
			      "<div class=\"attending-name\">" + item["name"] + "</div>" + 
			      "<div class=\"attending-info\">" + item["info"] + "</div>" +
			      "<div class=\"addlink\"><a href=\"" + item["addlink"] + "\">Add as friend</a></div>"+ 
			  "</div>" + 
			"</li>"
		    );
		}
                targetNode.innerHTML = li_html;
		_typeface_js.renderDocument();
            },
            error: function(error) {
                targetNode.innerHTML = "An unexpected error occurred: " + error;
            }
        };
	dojo.xhrGet(jsonArgs);
  

        /*dojo.io.script.get(jsonpArgs);*/
    }

    dojo.addOnLoad(course_json);
    dojo.addOnLoad(attending_json);
