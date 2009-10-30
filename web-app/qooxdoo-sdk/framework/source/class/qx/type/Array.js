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
     * Sebastian Werner (wpbasti)
     * Andreas Ecker (ecker)

************************************************************************ */

/**
 * An extended array class which adds a lot of often used
 * convenience methods to the regular array like <code>remove</code> or
 * <code>contains</code>.
 */
qx.Class.define("qx.type.Array",
{
  extend : qx.type.BaseArray,

  members :
  {
    /**
     * Returns a clone of the array. Primitive values are copied.
     * Others are referenced.
     *
     * @return {Array} Cloned array instance
     * @signature function()
     */
    clone : qx.type.BaseArray.prototype.concat,


    /**
     * Insert an element at a given position
     *
     * @param obj {var} the element to insert
     * @param i {Integer} position where to insert the element into the arr
     * @return {Array} the array
     */
    insertAt : function(obj, i)
    {
      this.splice(i, 0, obj);
      return this;
    },


    /**
     * Insert an element before a given second element
     *
     * @param obj {var} object to be inserted
     * @param obj2 {var} insert obj1 before this object
     * @return {Array} the array
     */
    insertBefore : function(obj, obj2)
    {
      var i = this.indexOf(obj2);

      if (i == -1) {
        this.push(obj);
      } else {
        this.splice(i, 0, obj);
      }

      return this;
    },


    /**
     * Insert an element after a given second element
     *
     * @param obj {var} object to be inserted
     * @param obj2 {var} insert obj1 after this object
     * @return {Array} the array
     */
    insertAfter : function(obj, obj2)
    {
      var i = this.indexOf(obj2);

      if (i == -1 || i == (this.length - 1)) {
        this.push(obj);
      } else {
        this.splice(i + 1, 0, obj);
      }

      return this;
    },


    /**
     * Remove an element at the given index
     *
     * @param i {Integer} index of the element to be removed
     * @return {var} The removed element.
     */
    removeAt : function(i) {
      return this.splice(i, 1)[0];
    },


    /**
     * Remove all elements
     *
     * @return {Array} empty array
     */
    removeAll : function()
    {
      this.length = 0;
      return this;
    },


    /**
     * Append the elements of the given array
     *
     * @param arr {Array} the elements of this array will be appended to other one
     * @return {Array} The modified array.
     * @throws an exception if one of the arguments is not an array
     */
    append : function(arr)
    {
      // this check is important because Opera throws an uncatchable error if
      // apply is called without an arr as second argument.
      if (qx.core.Variant.isSet("qx.debug", "on")) {
        qx.core.Assert.assertArray(arr, "The parameter must be an array.");
      }

      Array.prototype.push.apply(this, arr);
      return this;
    },


    /**
     * Remove an element
     *
     * @param obj {var} element to be removed from the array
     * @return {var} the removed element
     */
    remove : function(obj)
    {
      var i = this.indexOf(obj);
      if (i != -1)
      {
        this.splice(i, 1);
        return obj;
      }
    },


    /**
     * Whether the array contains the given element
     *
     * @param obj {var} object to look for
     * @return {Boolean} whether the array contains the element
     */
    contains : function(obj) {
      return this.indexOf(obj) !== -1;
    }
  }
});
