package org.lecturious


class CourseControllerTests extends StudentLifeControllerTest{
  
  
  def someNew = 1
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    def university = createUniversity()
    mockParams.putAll(courseMap)
    mockParams.id = university.id
    controller.add()
    assertGoodRequest()
    def courses = Course.list()
    assert courses.size() == 1
    println courses[0].properties
    courseMap.keySet.each{
      assert courses[0].properties.it == courseMap.it 
    }
  }
  
  void testAddUniversityNotExists(){
    mockParams.id = 1
    controller.add()
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
    def university = createUniversity()
    ["Z", "A"].each { 
      courseMap.name = it
      university.addToCourses(courseMap)  
    }
    assert university.save()
    mockParams.id = university.id
    controller.list()
    def json = parse()
    assert json.size() == 2
    assert json*.name == ["A", "Z"]
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
    def id = createCourse().id
    mockLogging(CourseController, true)
    mockParams.id = id
    courseMap.each { mockParams.(it.key) = "$it.value $someNew" }
    controller.update()
    def course = Course.get(id)
    assert course.name == "Name 1"
    assert course.professor == "Professor 1"
    assert course.identificator == "Identificator 1"
    assert course.type == "Type 1"
    assertGoodRequest()
  }
  
  void testUpdateFailsWrongId(){
    mockParams.id = "5"
    controller.update()
    assertBadRequest()
  }
  
  void testUpdateNoId(){
    controller.update()
    assertBadRequest()
  }
  
  void testShowColleagues(){
    def user1 = new Student(id:1, name:"Name1", facebookId:"ID1").save()
    def user2 = new Student(id:2, name:"Name2", facebookId:"ID2").save()
    def course = createCourse()
    new Inscription(course:course, user:user1).save()
    new Inscription(course:course, user:user2).save()
    mockParams.id = course.id
    mockSession.user = user1.id
    controller.colleagues()
    def json = parse()
    assert json.size() == 1
    assert json[0].name == "Name2"
    assert json[0].facebookId == "ID2"
  }
  
  void testSearch(){
    def user = createUser()
    def course = createCourse()
    def course2 = createCourse()
    user.addToUniversities(course.university)
    user.save()
    assert Course.list().size() == 2
    mockParams.id = "Name"
    mockSession.user = user.id
    controller.search()
    def json = parse()
    assert json.size() == 1
    assert json[0].id == course.id
    courseMap.each{
      assert json[0]."$it.key" == it.value
    }
  }
  
  void testSearchFailsNoSearchParameter(){
    mockSession.user = 1
    controller.search()
    assertBadRequest()
  }
  
  void testSearchFailsNoSessionUser(){
    mockParams.id = "1"
    controller.search()
    assertBadRequest()
  }
  
  void testSearchFailsUserDoesntExist(){
    mockParams.id == 1
    mockSession.user = 1
    controller.search()
    assertBadRequest()
  }
}
