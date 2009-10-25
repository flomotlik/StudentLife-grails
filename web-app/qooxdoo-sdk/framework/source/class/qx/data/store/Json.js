/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2009 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */

/**
 * EXPERIMENTAL!
 *
 * The json data store is responsible for fetching data from a url. The type
 * of the data has to be json.
 *
 * The loaded data will be parsed and saved in qooxdoo objects. Every value
 * of the loaded data will be stored in a qooxdoo property. The model classes
 * for the data will be created automatically.
 *
 * For the fetching itself it uses the {@link qx.io.remote.Request} class and
 * for parsing the loaded javascript objects into qooxdoo objects, the
 * {@link qx.data.marshal.Json} class will be used.
 */
qx.Class.define("qx.data.store.Json",
{
  extend : qx.core.Object,


  /**
   * @param url {String|null} The url where to find the data.
   * @param delegate {Object} The delegate containing one of the methods
   *   specified in {@link qx.data.store.IStoreDelegate}.
   */
  construct : function(url, delegate)
  {
    this.base(arguments);

    // store the marshaler
    this._marshaler = new qx.data.marshal.Json(delegate);

    if (url != null) {
      this.setUrl(url);
    }
  },


  events :
  {
    /**
     * Data event fired after the model has been created. The data will be the
     * created model.
     */
    "loaded": "qx.event.type.Data"
  },


  properties :
  {
    /**
     * Property for holding the loaded model instance.
     */
    model : {
      nullable: true,
      event: "changeModel"
    },


    /**
     * The state of the request as an url. If you want to check if the request
     * did his job, use, the {@link #changeState} event and check for one of the
     * listed values.
     */
    state : {
      check : [
        "configured", "queued", "sending", "receiving",
        "completed", "aborted", "timeout", "failed"
      ],
      init : "configured",
      event : "changeState"
    },


    /**
     * The url where the request should go to.
     */
    url : {
      check: "String",
      apply: "_applyUrl",
      event: "changeUrl"
    }
  },


  members :
  {
    // private members
    __request : null,

    // apply function
    _applyUrl: function(value, old) {
      if (value != null) {
        this._createRequest(value);
      }
    },


    /**
     * Creates and sends a GET request with the given url. Additionally two
     * listeners will be added for the state and the completed event of the
     * request.
     *
     * @param url {String} The url for the request.
     */
    _createRequest: function(url) {
      // create the request
      this.__request = new qx.io.remote.Request(
        url, "GET", "application/json"
      );
      this.__request.addListener(
        "completed", this.__requestCompleteHandler, this
      );
      // mapp the state to its own state
      this.__request.addListener("changeState", function(ev) {
        this.setState(ev.getData());
      }, this);

      this.__request.send();
    },


    /**
     * Handler for the completion of the requests. It invokes the creation of
     * the needed classes and instances for the fetched data using
     * {@link qx.data.marshal.Json}.
     *
     * @param ev {qx.io.remote.Response} The event fired by the request.
     */
    __requestCompleteHandler : function(ev)
    {
        var data = ev.getContent();
        // create the class
        this._marshaler.toClass(data, true);
        // set the initial data
        this.setModel(this._marshaler.toModel(data));

        // fire complete event
        this.fireDataEvent("loaded", this.getModel());
    },


    /**
     * Reloads the data with the url set in the {@link #url} property.
     */
    reload: function() {
      var url = this.getUrl();
      if (url != null) {
        this._createRequest(url);
      }
    }
  },

  /*
   *****************************************************************************
      DESTRUCT
   *****************************************************************************
   */

  destruct : function()
  {
    this._disposeObjects("_marshaler", "__request");
  }
});
