package org.lecturious

import grails.converters.JSON;

class TodoControllerTests extends StudentLifeControllerTest{
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    def course = courseMock()
    course.demand.addToTodos { todo ->
      todo.id = 1
      assert todo instanceof Todo && todo.description == name
    }
    course.demand.save { map ->
      assert map.flush == true
      true
    }
    mockParams.id = 1
    mockParams.description = name
    mockParams.date = 1
    controller.add()
    assert "1" == controller.response.contentAsString
    course.verify()
  }
  
  void testAddCourseNotExists(){
    mockDomain(Course)
    mockParams.id = 1
    controller.add()
    assertBadRequest()
  }
  
  void testAddFails(){
    mockLogging(TodoController, true)
    def course = courseMock()
    course.demand.addToTodos {todo -> }
    course.demand.save(){map -> false }
    mockParams.id = 1
    mockParams.description = name
    mockParams.date = 1
    mockParams.duration = 1
    controller.add()
    course.verify()
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
    mockDomain(Course, [new Course(name:name, todos:[new Todo(id:1, description:name, date:12345)])])
    mockParams.id = 1
    controller.list()
    println controller.response.contentAsString
    def json = JSON.parse(controller.response.contentAsString)
    assert json.size() == 1
    assert json[0].id == 1 
    assert json[0].description == name
    assert json[0].date == 12345
  }
  
  void testListFailsNoId(){
    controller.list()
    assertBadRequest()
  }
  
  void testListFailsWrongId(){
    mockDomain(Course)
    mockParams.id = "5"
    controller.list()
    assertBadRequest()
  }
  
  private courseMock(){
    def course = mockFor(Course)
    course.demand.static.exists {i -> assert i == 1; true}
    course.demand.get  {i -> assert i == 1; new Course()}
    return course
  }
}
