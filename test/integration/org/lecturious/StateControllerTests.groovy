package org.lecturious


class StateControllerTests extends StudentLifeControllerTest{
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    def country = new Country(name:"Name")
    country.save()
    mockParams.name = name
    mockParams.id = country.id
    controller.add()
    assert "1" == controller.response.contentAsString
    def states = State.list()
    assert states.size() == 1
    def state = states[0]
    assert state
    assert state.name == name
    assert country.states.size() == 1
  }
  
  void testAddCountryNotExists(){
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
    def country = new Country(name:"Name")
    ["Z", "A"].each{
      country.addToStates(name:it)
      assert country.save(flush:true)
    }
    mockParams.id = country.id
    controller.list()
    def json = parse()
    assert json.size() == 2
    assert json[0].id > json[1].id
    assert json[0].name == "A"
    assert json[1].name == "Z"
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
