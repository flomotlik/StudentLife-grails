package org.lecturious


class MessageControllerTests extends StudentLifeControllerTest{
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    def course = createCourse()
    mockParams.id = course.id
    mockParams.message = name
    controller.add()
    assertGoodRequest()
    def messages = Message.list()
    assert messages.size() == 1
    assertObject([message:name], messages[0])
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
    def messageParams = [message:name]
    def course = createCourse()
    course.addToMessages(messageParams)
    course.addToMessages(messageParams)
    course.save(flush:true)
    mockParams.id = course.id
    controller.list()
    def json = parse()
    assert json.size() == 2
    assert json[0].id < json[1].id
    json.each{ assertObject (messageParams, it) }
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
