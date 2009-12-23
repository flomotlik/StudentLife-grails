package org.lecturious

import grails.converters.JSON;
import grails.test.ControllerUnitTestCase;

class CountryControllerTests extends StudentLifeControllerTest{
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    mockDomain(Country)
    mockParams.name = name
    controller.add()
    assert "1" == controller.response.contentAsString
    assert 1 == Country.list().size()
    assert name == Country.get(1).name
  }
  
  void testAddFails(){
    def saveFalse = mockFor(Country.class)
    mockParams.name = "Name"
    saveFalse.demand.save(){-> false}
    controller.add()
    assertBadRequest()
    saveFalse.verify()
  }
  
  void testAddFailsNoId(){
    controller.add()
    assertBadRequest()
  }
  
  void testAllowedMethods(){
    assert controller.allowedMethods == [add:'POST', list:"GET"]
  }
  
  void testList(){
    mockDomain(Country, [new Country(name:name)])
    controller.list()
    def json = JSON.parse(controller.response.contentAsString)
    assert json.size() == 1
    assert json[0].id == 1 
    assert json[0].name == name
  }
}
