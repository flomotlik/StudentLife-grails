package org.lecturious

import grails.converters.JSON;

class UniversityControllerTests extends StudentLifeControllerTest{
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    def city = cityMock()
    city.demand.addToUniversities { university ->
      university.id = 1
      assert university instanceof University && university.name == name
    }
    city.demand.save { map ->
      assert map.flush == true
      true
    }
    mockParams.name = name
    mockParams.id = 1
    controller.add()
    assert "1" == controller.response.contentAsString
    city.verify()
  }
  
  void testAddCityNotExists(){
    mockDomain(City)
    mockParams.id = 1
    controller.add()
    assertBadRequest()
  }
  
  void testAddFails(){
    mockLogging(UniversityController, true)
    def city = cityMock()
    city.demand.addToUniversities {university -> }
    city.demand.save(){map -> false }
    mockParams.id = 1
    controller.add()
    city.verify()
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
    mockDomain(City, [new City(name:name, universities:[new University(id:1, name:name)])])
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
    mockDomain(City)
    mockParams.id = "5"
    controller.list()
    assertBadRequest()
  }
  
  private cityMock(){
    def city = mockFor(City)
    city.demand.static.exists {i -> assert i == 1; true}
    city.demand.get  {i -> assert i == 1; new City()}
    return city
  }
}
