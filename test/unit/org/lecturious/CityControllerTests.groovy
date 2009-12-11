package org.lecturious

import grails.converters.JSON;

class CityControllerTests extends StudentLifeControllerTest{
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    def state = stateMock()
    state.demand.addToCities { city ->
      city.id = 1
      assert city instanceof City && city.name == name
    }
    state.demand.save { map ->
      assert map.flush == true
      true
    }
    mockParams.name = name
    mockParams.id = 1
    controller.add()
    assert "1" == controller.response.contentAsString
    state.verify()
  }
  
  void testAddStateNotExists(){
    mockDomain(State)
    mockParams.id = 1
    controller.add()
    assertBadRequest()
  }
  
  void testAddFails(){
    mockLogging(CityController, true)
    def state = stateMock()
    state.demand.addToCities {city -> }
    state.demand.save(){map -> false }
    mockParams.id = 1
    controller.add()
    state.verify()
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
    mockDomain(State, [new State(name:name, cities:[new City(id:1, name:name)])])
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
    mockDomain(State)
    mockParams.id = "5"
    controller.list()
    assertBadRequest()
  }
  
  private stateMock(){
    def state = mockFor(State)
    state.demand.static.exists {i -> assert i == 1; true}
    state.demand.get  {i -> assert i == 1; new State()}
    return state
  }
}
