package org.lecturious

import grails.converters.JSON;

class CourseControllerTests extends StudentLifeControllerTest{
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    def university = universityMock()
    university.demand.addToCourses { course ->
      course.id = 1
      assert course instanceof Course && course.name == name
    }
    university.demand.save { map ->
      assert map.flush == true
      true
    }
    mockParams.name = name
    mockParams.id = 1
    controller.add()
    assert "1" == controller.response.contentAsString
    university.verify()
  }
  
  void testAddUniversityNotExists(){
    mockDomain(University)
    mockParams.id = 1
    controller.add()
    assertBadRequest()
  }
  
  void testAddFails(){
    mockLogging(CourseController, true)
    def university = universityMock()
    university.demand.addToCourses {course -> }
    university.demand.save(){map -> false }
    mockParams.id = 1
    controller.add()
    university.verify()
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
    mockDomain(University, [new University(name:name, courses:[new Course(id:1, name:name)])])
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
    mockDomain(University)
    mockParams.id = "5"
    controller.list()
    assertBadRequest()
  }
  
  private universityMock(){
    def university = mockFor(University)
    university.demand.static.exists {i -> assert i == 1; true}
    university.demand.get  {i -> assert i == 1; new University()}
    return university
  }
}
