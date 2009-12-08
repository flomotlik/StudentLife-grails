package org.lecturious;

import grails.converters.JSON;

/**
 * Gets all defined methods in Controllers via Reflection and tries to call them. Checks that
 * access is not allowed and correct HTTP Status is returned
 * 
 * @author florian
 *
 */
class NotAllowedFunctionalTests extends functionaltestplugin.FunctionalTestCase {
  void testCountryController() {
    def mainURL = "http://localhost:8080/studentlife/app"
    def controllers = [CountryController, StateController, CityController, UniversityController, CourseController, UserController]
    //Fields that are not methods calls
    def noControllerMethod = ["keyService", "metaClass", "persistenceService", "allowedMethods", "property", "class"]
    controllers.each{ controller ->
      def controllerName = controller.name[15..-11].toLowerCase()
      //finds all getter methods and removes the get. Getters because methods are defined as Closures not real methods
      def methods = controller.methods.name.findAll{ it =~ /^get[A-Z]/ }.
      collect{ it[3].toLowerCase()+it[4..-1] }
      //Removing all getters that shouldn't be called
      methods -= noControllerMethod
      println "$controller: $methods"
      methods.each{ method ->
        testURL("$mainURL/$controllerName/$method")   
      }
    }
  }
  
  def testURL(url){
    get(url)
    assertStatus 403
  }
}
