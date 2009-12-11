package org.lecturious

import grails.converters.JSON;
import grails.test.ControllerUnitTestCase;

class StateControllerTests extends StudentLifeControllerTest{
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    def country = countryMock()
    country.demand.addToStates { state ->
      state.id = 1
      assert state instanceof State && state.name == name
    }
    country.demand.save { map ->
      assert map.flush == true
      true
    }
    mockParams.name = name
    mockParams.id = 1
    controller.add()
    assert "1" == controller.response.contentAsString
    country.verify()
  }
  
  void testAddCountryNotExists(){
    mockDomain(Country)
    mockParams.id = 1
    controller.add()
    assertBadRequest()
  }
  
  void testAddFails(){
    mockLogging(StateController, true)
    def country = countryMock()
    country.demand.addToStates {state -> }
    country.demand.save(){map -> false }
    mockParams.id = 1
    controller.add()
    country.verify()
    assertBadRequest()
  }
  
  void testAddFailsNoId(){
    controller.add()
    assertBadRequest()
  }
  
  void testAllowedMethods(){
    assert controller.allowedMethods == [add:'POST', list:"GET"]
  }
  
  void testList(){
    mockDomain(Country, [new Country(name:name, states:[new State(id:1, name:name)])])
    mockParams.id = 1
    controller.list()
    println controller.response.contentAsString
    def json = JSON.parse(controller.response.contentAsString)
    assert json.size() == 1
    assert json[0].id == 1 
    assert json[0].name == name
  }
  
  void testListFailsNoId(){
    controller.list()
    assertBadRequest()
  }
  
  void testListFailsWrongId(){
    mockDomain(Country)
    mockParams.id = "5"
    controller.list()
    assertBadRequest()
  }
  
  private countryMock(){
    def country = mockFor(Country)
    country.demand.static.exists {i -> assert i == 1; true}
    country.demand.get  {i -> assert i == 1; new Country()}
    return country
  }
}
