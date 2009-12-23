package org.lecturious

import grails.converters.JSON;

class UserControllerTests extends StudentLifeControllerTest{
  
  protected void setUp() {
    super.setUp()
    mockLogging(UserController, true)
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  void testAddCourse(){
    mockLogging(UserController, true)
    mockDomain(University)
    def course = new Course(name:"Course")
    mockDomain(Course, [course])
    def university = new University(id:1, name:"Uni")
    university.addToCourses(course)
    university.save()
    course.university = university
    course.save()
    mockDomain(User, [new User(name:"Name", universities:[university])])
    mockDomain(Inscription)
    
    mockSession.user = 1
    mockParams.id = 1
    controller.addCourse()
    assertGoodRequest()
    def user = User.get(1)
    println "User: $user"
    def inscriptions = user.inscriptions.toList()
    assert inscriptions.size() == 1
    println "Inscriptions: $inscriptions ${inscriptions.class}"
    def inscription = inscriptions[0]
    assert inscription.course == course
    assert inscription.user.name == "Name"
  }
  
  void testAddCourseFailsNoUniversity(){
    mockDomain(User, [new User(name:"Name")])
    mockDomain(Course, [new Course(name:name, university:new University())])
    mockParams.id = 1
    mockSession.user = 1
    controller.addCourse()
    assertBadRequest()
  }
  
  void testAddCourseFailsAlreadyInscribed(){
    mockLogging(Inscription)
    def university = new University()
    def course = new Course(name:"Course")
    mockDomain(Course, [course])
    mockDomain(Inscription)
    course.university = university
    mockDomain(User, [new User(name:"Name", universities:[university], inscriptions:[new Inscription(course:course)])])
    mockParams.id = 1
    mockSession.user = 1
    controller.addCourse()
    assertBadRequest()
  }
  
  void testAddCourseFailsNoId(){
    controller.addCourse()
    assertBadRequest()
  }
  
  void testAddCourseFailsNoSessionUser(){
    mockDomain(Course, [new Course()])
    mockParams.id = 1
    controller.addCourse()
    assertBadRequest()
  }
  
  void testAddUniversity(){
    mockDomain(User, [new User(universities:[])])
    mockDomain(University, [new University(name:"Name")])
    mockParams.id = 1
    mockSession.user = 1
    controller.addUniversity()
    assertGoodRequest()
    def universities = User.get(1).universities.asList()
    assert universities.size() == 1
    assert universities[0].name == "Name"
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
    mockDomain(University)
    mockDomain(User, [new User(universities:[])])
    mockParams.id = 1
    mockSession.user = 1
    controller.addUniversity()
    assertBadRequest()
  }
  
  void testAddUniversityAlreadyHasIt(){
    mockDomain(University, [new University(name:"Name")])
    mockDomain(User, [new User(universities:[University.get(1)])])
    mockParams.id = 1
    mockSession.user = 1
    controller.addUniversity()
    assertBadRequest()
  }
  
  void testListCourses(){
    def course = new Course(id:1, name:"Name", professor:"Professor", identificator:"Ident", type:"Type")
    mockDomain(Inscription, [new Inscription(id:1, course:course)])
    mockDomain(User, [new User(inscriptions:[Inscription.get(1)])])
    mockSession.user = 1
    controller.listCourses()
    println "Content: $controller.response.contentAsString"
    def json = JSON.parse(controller.response.contentAsString)
    assert json.size() == 1
    assert json[0].name == "Name"
    assert json[0].professor == "Professor"
    assert json[0].identificator == "Ident"
    assert json[0].type == "Type"
  }
  
  void testListCoursesFailsNoId(){
    controller.listCourses()
    assertBadRequest()
  }
  
  void testListCoursesFailsUserDoesntExist(){
    mockDomain(User)
    mockSession.user = 1
    controller.listCourses()
    assertBadRequest
  }
  
  void testListUniversities(){
    mockDomain(User, [new User(universities:[new University(id:1, name:"Name1")])])
    mockSession.user = 1
    controller.listUniversities()
    println "Content: $controller.response.contentAsString"
    def json = JSON.parse(controller.response.contentAsString)
    assert json.size() == 1
    assert json[0].name == "Name1"
    assert json[0].id == 1
  }
  
  void testListUniversitiesFailsNoId(){
    controller.listUniversities()
    assertBadRequest()
  }
  
  void testListUniversitiesFailsUserDoesntExist(){
    mockDomain(User)
    mockSession.user = 1
    controller.listUniversities()
    assertBadRequest
  }
  
  void testShow(){
    mockDomain(User, [new User(facebookId:"1", name:"Name")])
    mockSession.user = 1
    controller.show()
    def json = JSON.parse(controller.response.contentAsString)
    assert json.name == "Name"
    assert json.facebookId == "1"
  }
  
  void testShowFailsNoSessionUser(){
    controller.show()
    assertBadRequest()
  }
  
  void testShowFailsUserDoesntExist(){
    mockDomain(User)
    mockSession.user = 3
    controller.show()
    assertBadRequest()
  }
}
