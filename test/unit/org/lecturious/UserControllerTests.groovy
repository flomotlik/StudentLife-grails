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
}
