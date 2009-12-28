package org.lecturious


class UniversityControllerTests extends StudentLifeControllerTest{
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    def city = createCity()
    mockParams.name = name
    mockParams.id = city.id
    controller.add()
    def universities = University.list()
    assert universities.size() == 1
    def university = universities[0]
    assert university.id ==~ /\d+/
    assert university.name == name
  }
  
  void testAddCityNotExists(){
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
    def city = createCity()
    city.addToUniversities(name:"Z").addToUniversities(name:"A")
    mockParams.id = city.id
    controller.list()
    def json = parse()
    assert json.size() == 2
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
