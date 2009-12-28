package org.lecturious


class UserControllerTests extends StudentLifeControllerTest{
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  void testAddCourse(){
    def course = createCourse()
    def user = createUser()
    assert user
    user.addToUniversities(course.university)
    mockSession.user = user.id
    mockParams.id = course.id
    controller.addCourse()
    assert status() == 200
    def assertUser = User.get(user.id)
    def inscriptions = assertUser.inscriptions.toList()
    assert inscriptions.size() == 1
    def inscription = inscriptions[0]
    assert inscription.course == course
    assert inscription.user.name == name
  }
  
  void testAddCourseFailsNoUniversity(){
    def user = createUser()
    def course = createCourse()
    mockParams.id = course.id
    mockSession.user = user.id
    controller.addCourse()
    assertBadRequest()
  }
  
  void testAddCourseFailsAlreadyInscribed(){
    def course = createCourse()
    def user = createUser()
    user.addToUniversities(course.university)
    user.addToInscriptions(course:course)
    mockParams.id = course.id
    mockSession.user = user.id
    controller.addCourse()
    assertBadRequest()
  }
  
  void testAddCourseFailsNoId(){
    controller.addCourse()
    assertBadRequest()
  }
  
  void testAddCourseFailsNoSessionUser(){
    mockParams.id = createCourse().id
    controller.addCourse()
    assertBadRequest()
  }
  
  void testAddCourseFailsCourseDoesntExist(){
    mockLogging (UserController, true)
    def user = createUser()
    mockSession.user = user.id
    mockParams.id = 35
    controller.addCourse()
    assertBadRequest()
  }
  
  void testAddCourseFailsUserDoesntExist(){
    mockSession.user = 25
    mockParams.id = createCourse().id
    controller.addCourse()
    assertBadRequest()
  }
  
  void testAddUniversity(){
    def user = createUser()
    def university = createUniversity()
    mockParams.id = university.id
    mockSession.user = user.id
    controller.addUniversity()
    assertGoodRequest()
    def universities = User.get(user.id).universities.toList()
    assert universities.size() == 1
    assert universities[0].name == name
  }
  
  void testAddUniversityFailsNoId(){
    controller.addUniversity()
    assertBadRequest()
  }
  
  void testAddUniversityFailsNoSessionUser(){
    mockParams.id = 1
    controller.addUniversity()
    assertBadRequest()
  }
  
  void testAddUniversityFailsUniversityDoesntExist(){
    def user = createUser()
    mockParams.id = 1
    mockSession.user = user.id
    controller.addUniversity()
    assertBadRequest()
  }
  
  void testAddUniversityAlreadyHasIt(){
    def user = createUser()
    def university = createUniversity()
    user.addToUniversities(university)
    user.save()
    mockParams.id = university.id
    mockSession.user = user.id
    controller.addUniversity()
    assertBadRequest()
  }
  
  void testListCourses(){
    def course = createCourse()
    def user = createUser()
    user.addToInscriptions(course:course)
    mockSession.user = user.id
    controller.listCourses()
    def json = parse()
    assert json.size() == 1
    assertObject objectMap, json[0]
  }
  
  void testListCoursesFailsNoId(){
    controller.listCourses()
    assertBadRequest()
  }
  
  void testListCoursesFailsUserDoesntExist(){
    mockSession.user = 1
    controller.listCourses()
    assertBadRequest
  }
  
  void testListUniversities(){
    def user = createUser()
    user.addToUniversities(createUniversity())
    mockSession.user = user.id
    controller.listUniversities()
    def json = parse()
    assert json.size() == 1
    assert json[0].name == name
  }
  
  void testListUniversitiesFailsNoId(){
    controller.listUniversities()
    assertBadRequest()
  }
  
  void testListUniversitiesFailsUserDoesntExist(){
    mockSession.user = 1
    controller.listUniversities()
    assertBadRequest
  }
  
  void testShow(){
    mockDomain(User, [new User(facebookId:"1", name:"Name")])
    def user = createUser()
    mockSession.user = 1
    controller.show()
    def json = parse()
    assert json.name == "Name"
    assert json.facebookId == "1"
  }
  
  void testShowFailsNoSessionUser(){
    controller.show()
    assertBadRequest()
  }
  
  void testShowFailsUserDoesntExist(){
    mockSession.user = 3
    controller.show()
    assertBadRequest()
  }
}
