package org.lecturious

import grails.test.ControllerUnitTestCase;

class CountryControllerTests extends ControllerUnitTestCase{
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    mockDomain(Country)
    def name = "name"
    mockParams.name = name
    controller.add()
    assert "1" == controller.response.contentAsString
    assert 1 == Country.list().size()
    assert name == Country.get(1).name
  }
  
  void testAddFails(){
    mockLogging(CountryController)
    def saveFalse = mockFor(Country.class)
    saveFalse.demand.save(){-> false}
    controller.add()
    assert controller.response.contentAsString == ""
    assert controller.renderArgs.status == 400
  }
}
