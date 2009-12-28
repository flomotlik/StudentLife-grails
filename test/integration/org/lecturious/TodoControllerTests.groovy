package org.lecturious


class TodoControllerTests extends StudentLifeControllerTest{
  
  protected void setUp() {
    super.setUp()
    objectMap = [description:name, date:1]
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    def course = createCourse()
    mockParams.id = course.id
    mockParams.putAll objectMap
    controller.add()
    assert Todo.list().size == 1
    assertObject (objectMap, Todo.list()[0])
  }
  
  void testAddCourseNotExists(){
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
    def course = createCourse()
    [1,0].each{
      objectMap.date = it
      course.addToTodos(new Todo(objectMap))
      course.save(flush:true)
    }
    mockParams.id = course.id
    controller.list()
    def json = parse()
    assert json.size() == 2
    assert json[0].id > json[1].id
    2.times{ 
      assert json[it].description == name
      assert json[it].date == it
    }
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
