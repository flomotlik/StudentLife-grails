package org.lecturious


class CityControllerTests extends StudentLifeControllerTest{
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    def state = createState()
    mockParams.name = name
    mockParams.id = state.id
    controller.add()
    assertGoodRequest()
    def cities = City.list()
    assert cities.size() == 1
    def city = cities[0]
    assert city
    assert city.name == name
    assert state.cities.size() == 1
  }
  
  void testAddStateNotExists(){
    mockParams.id = 1
    controller.add()
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
    def state = createState()
    def names = ["Z","A"] 
    names.each{
      state.addToCities(name:it)
      state.save(flush:true)
    }
    println "StateID: $state.id"
    mockParams.id = state.id
    controller.list()
    def json = parse()
    assert json.size() == 2
    assert json[0].id > json[1].id
    assert json*.name == names.reverse() 
  }
  
  void testListFailsNoId(){
    controller.list()
    assertBadRequest()
  }
  
  void testListFailsWrongId(){
    mockParams.id = "5"
    controller.list()
    assertBadRequest()
  }
}
