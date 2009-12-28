package org.lecturious


class LinkControllerTests extends StudentLifeControllerTest{
  
  def linkParams 
  
  protected void setUp() {
    super.setUp()
    linkParams = [description:name, link:name]
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    def course = createCourse()
    mockParams.id = course.id
    mockParams.putAll(linkParams)
    mockParams.id = course.id
    controller.add()
    def links = Link.list()
    assert links.size() == 1
    assert "1" == controller.response.contentAsString
    assertObject(linkParams, links[0])
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
    course.addToLinks(linkParams)
    course.addToLinks(linkParams)
    course.save(flush:true)
    mockParams.id = course.id
    controller.list()
    def json = parse()
    assert json.size() == 2
    assert json[0].id < json[1].id
    json.each{ assertObject (linkParams, it) }
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
