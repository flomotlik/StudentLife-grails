package org.lecturious

import grails.converters.JSON;
import grails.test.ControllerUnitTestCase;

class StudentLifeControllerTest extends ControllerUnitTestCase{
  
  def name = "name"
  
  def workflowService
  
  def courseMap
  
  /**
   * Controllers can set map for creating objects (Link, Message, ...)  
   */
  def objectMap
  
  @Override
  protected void setUp() {
    super.setUp();
    //Some Controllers dont have workflowService
    if(controller.metaClass.hasProperty (controller, "workflowService")){
      controller.workflowService = workflowService
    }
    courseMap = [name:"Name" , name:"Name" , professor:"Professor", 
        identificator:"Identificator", type:"Type"]
  }
  
  def content = {
    def content = controller.response.contentAsString
    println "Content: $content"
    content
  }
  def status = {
    def status = controller.renderArgs.status
    println "Status: $status"
    status
  }
  
  def assertBadRequest = {
    assert content() == ""
    assert status() == 400
  }
  
  def assertGoodRequest = {
    assert status() == 200
    assert content() ==~ /\d+/
  }
  
  def parse(){
    JSON.parse(content())
  }
  
  def createCountry(){
    def c = new Country(name:name).save(flush:true)
    assert c
    return c
  }
  
  def createState(){
    def state = new State(name:name)
    assert createCountry().addToStates(state).save(flush:true)
    return state
  }
  
  def createCity(){
    def city = new City(name:name)
    assert createState().addToCities(city).save(flush:true)
    return city
  }
  
  def createUniversity(){
    def university = new University(name:name)
    assert createCity().addToUniversities(university).save(flush:true)
    return university
  }
  
  def createCourse(){
    def course = new Course(courseMap)
    assert createUniversity().addToCourses(course).save(flush:true)
    return course
  }
  
  def assertObject(params, object){
    assert object
    params.each{
      assert object.(it.key) == it.value 
    }
  }
  
  def createUser(){
    def user = new Student(facebookId: "1", name:name).save()
    assert user
    return user
  }
}