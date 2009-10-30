/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2007-2008 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     LGPL: http://www.gnu.org/licenses/lgpl.html
     EPL: http://www.eclipse.org/org/documents/epl-v10.php
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Fabian Jakobs (fjakobs)

************************************************************************ */

/**
 * A TestSuite is a collection of test functions, classes and other test suites,
 * which should be run together.
 */
qx.Class.define("qx.dev.unit.TestSuite",
{
  extend : qx.core.Object,




  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */

  /**
   * @param testClassOrNamespace {var} Either a string with the name of the test
   *    class or test namespace or a reference to the test class or namespace.
   *    All test in the given class/namespace will be added to the suite.
   */
  construct : function(testClassOrNamespace)
  {
    this.base(arguments);

    this.__tests = [];

    if (testClassOrNamespace) {
      this.add(testClassOrNamespace);
    }
  },




  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {

    __tests : null,

    /**
     * Add a test class or namespace to the suite
     *
     * @lint ignoreDeprecated(alert, eval)
     *
     * @param testClassOrNamespace {var} Either a string with the name of the test
     *    class or test namespace or a reference to the test class or namespace.
     *    All test in the given class/namespace will be added to the suite.
     */
    add : function(testClassOrNamespace)
    {
      // This try-block is needed to avoid errors (e.g. "too much recursion")
      try
      {
        if (qx.lang.Type.isString(testClassOrNamespace))
        {
          var evalTestClassOrNamespace = eval(testClassOrNamespace);

          if (!evalTestClassOrNamespace) {
            this.addFail(testClassOrNamespace, "The class/namespace '" + testClassOrNamespace + "' is undefined!");
          }

          testClassOrNamespace = evalTestClassOrNamespace;
        }

        if (qx.lang.Type.isFunction(testClassOrNamespace)) {
          this.addTestClass(testClassOrNamespace);
        } else if (qx.lang.Type.isObject(testClassOrNamespace)) {
          this.addTestNamespace(testClassOrNamespace);
        }
        else
        {
          this.addFail("existsCheck", "Unknown test class '" + testClassOrNamespace + "'!");
          return;
        }
      }
      catch (ex)
      {
        alert("An error occured while adding test classes/namespaces\nPlease try a different test file.");
      }
    },


    /**
     * Add all tests from the given namespace to the suite
     *
     * @param namespace {Object} The topmost namespace of the tests classes to add.
     */
    addTestNamespace : function(namespace)
    {
      if (qx.lang.Type.isFunction(namespace) && namespace.classname)
      {
        if (qx.Class.isSubClassOf(namespace, qx.dev.unit.TestCase))
        {
          if (namespace.$$classtype !== "abstract") {
            this.addTestClass(namespace);
          }
          return;
        }
      }
      else if (qx.lang.Type.isObject(namespace) && !(namespace instanceof Array))
      {
        for (var key in namespace) {
          this.addTestNamespace(namespace[key]);
        }
      }
    },


    /**
     * Add a single function to test
     *
     * @param name {String} Name of the function
     * @param fcn {Function} The test function
     */
    addTestFunction : function(name, fcn) {
      this.__tests.push(new qx.dev.unit.TestFunction(null, name, fcn));
    },


    /**
     * Add a method from a class as test to the suite
     *
     * @param testCase {qx.dev.unit.TestCase} The class containing the test method
     * @param functionName {String} The name of the test method
     */
    addTestMethod : function(testCase, functionName) {
      this.__tests.push(new qx.dev.unit.TestFunction(testCase, functionName));
    },


    /**
     * Add a test class to the suite
     *
     * @param clazz {Class} The test class to add
     */
    addTestClass : function(clazz) {
      this.__tests.push(new qx.dev.unit.TestClass(clazz));
    },


    /**
     * Add a test function to the suite, which fails.
     *
     * @param functionName {String} Name of the function
     * @param message {String} The fail message
     */
    addFail : function(functionName, message)
    {
      this.addTestFunction(functionName, function() {
        this.fail(message);
      });
    },


    /**
     * Run all tests using the given test result
     *
     * @param testResult {TestResult} Test result class, which runs the tests.
     */
    run : function(testResult)
    {
      for (var i=0; i<this.__tests.length; i++) {
        (this.__tests[i]).run(testResult);
      }
    },


    /**
     * Get a list of all test classes in the suite
     *
     * @return {Class[]} A list of all test classes in the suite
     */
    getTestClasses : function()
    {
      var classes = [];

      for (var i=0; i<this.__tests.length; i++)
      {
        var test = this.__tests[i];

        if (test instanceof qx.dev.unit.TestClass) {
          classes.push(test);
        }
      }

      return classes;
    },


    /**
     * Get a list of all test methods in the suite
     *
     * @return {Function[]} A list of all test methods in the suite
     */
    getTestMethods : function()
    {
      var methods = [];

      for (var i=0; i<this.__tests.length; i++)
      {
        var test = this.__tests[i];

        if (test instanceof qx.dev.unit.TestFunction) {
          methods.push(test);
        }
      }

      return methods;
    }
  },

  destruct : function() {
    this._disposeArray("__tests");
  }
});
