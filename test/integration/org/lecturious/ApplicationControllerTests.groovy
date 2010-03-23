package org.lecturious

import grails.test.*

class ApplicationControllerTests extends ControllerUnitTestCase {
  
  def fixtureLoader
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testIndex(){
    def fixture = fixtureLoader.load("application/index")
    def service = new FacebookMock()
    controller.facebookService = service
    controller.index()
    assert redirectArgs.controller == "wall"
    assert redirectArgs.action == "index"
  }
  
  void testIndexRedirectingWithNoUniversity() {
    def service = new FacebookMock()
    controller.facebookService = service
    controller.index()
    assert redirectArgs.controller == "university"
    assert redirectArgs.action == "index"
  }
}
