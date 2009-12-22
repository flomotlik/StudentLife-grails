package org.lecturious

import grails.converters.JSON;

class CourseControllerTests extends StudentLifeControllerTest{
  
  def name = "Name"
  def professor = "Professor"
  def identificator = "Identificator"
  def type = "Type"
  def someNew = 1
  
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
    assertGoodRequest()
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
    university.demand.addToCourses {course ->
    }
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
    assert controller.allowedMethods == [add:'POST', list:"GET", update:'POST', colleagues:'GET']
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
  
  void testUpdate(){
    mockDomain(Course, [new Course(name:name, professor:professor, identificator:identificator, type:type, university:new University())])
    mockLogging(CourseController, true)
    mockParams.id = "1"
    mockParams.name = "$name $someNew"
    mockParams.professor = "$professor $someNew"
    mockParams.identificator = "$identificator $someNew"
    mockParams.type = "$type $someNew"
    controller.update()
    def course = Course.get(1)
    assert course.name == "Name 1"
    assert course.professor == "Professor 1"
    assert course.identificator == "Identificator 1"
    assert course.type == "Type 1"
    println "Content $controller.response.contentAsString"
    assertGoodRequest()
    assert "1" == controller.response.contentAsString
  }
  
  void testUpdateFails(){
    mockLogging(CourseController, true)
    def courseMock = mockFor(Course)
    courseMock.demand.static.exists {i ->
      assert i == 1; true
    }
    courseMock.demand.static.get(){value ->
      assert value == 1; new Course()
    }
    courseMock.demand.save(){-> false }
    mockParams.id = 1
    controller.update()
    assertBadRequest()
  }
  
  void testUpdateFailsWrongId(){
    mockDomain(Course)
    mockParams.id = "5"
    controller.update()
    assertBadRequest()
  }
  
  void testUpdateNoId(){
    controller.update()
    assertBadRequest()
  }
  
  void testShowColleagues(){
    mockLogging(CourseController, true)
    mockLogging(Inscription, true)
    mockLogging(User, true)
    def user1 = new User(id:1, name:"Name1", facebookId:"ID1")
    def user2 = new User(id:2, name:"Name2", facebookId:"ID2")
    mockDomain(User, [user1, user2])
    Course course = new Course()
    mockDomain(Course, [course])
    mockDomain(Inscription, [new Inscription(course:course, user:user1),new Inscription(course:course, user:user2)])
    mockParams.id = "1"
    mockSession.user = 1
    controller.colleagues()
    println "Content: $controller.response.contentAsString"
    //    assertGoodRequest()
    def json = JSON.parse(controller.response.contentAsString)
    assert json.size() == 1
    assert json[0].name == "Name2"
    assert json[0].facebookId == "ID2"
  }
  
  private universityMock(){
    def university = mockFor(University)
    university.demand.static.exists {i ->
      assert i == 1; true
    }
    university.demand.get  {i ->
      assert i == 1; new University()
    }
    return university
  }
}
