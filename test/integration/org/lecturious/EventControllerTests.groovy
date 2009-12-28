package org.lecturious


class EventControllerTests extends StudentLifeControllerTest{
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    def eventParams = [description:name, date:1, duration:1]
    def course = createCourse()
    mockParams.id = course.id
    mockParams.putAll(eventParams)
    controller.add()
    assertGoodRequest()
    def events = Event.list()
    assert events.size() == 1
    def event = events[0]
    assertObject(eventParams, event)
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
    def eventParams = [description:name, duration:1]
    def course = createCourse()
    [1,0].each{
      eventParams.date = it
      println "It: $it"
      course.addToEvents(new Event(eventParams))  
      assert course.save(flush:true)
    }
    println Event.findAllByCourse(course)*.id
    mockParams.id = course.id
    controller.list()
    def json = parse()
    assert json.size() == 2
    println "ID ${json*.id}"
    assert json[0].id > json[1].id
    2.times{
      assert json[it].description == eventParams.description
      assert json[it].date == it
      assert json[it].duration == eventParams.duration
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
