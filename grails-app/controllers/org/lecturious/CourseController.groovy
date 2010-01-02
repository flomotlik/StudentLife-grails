package org.lecturious

import grails.converters.JSON 


class CourseController {
  
  static def allowedMethods = [add:'POST', list:'GET', update:'POST', colleagues:'GET']
  
  def courseParams = ["id", "name", "professor", "identificator", "type"]
  
  def workflowService
  
  def add = {
    render workflowService.saveWithParent(params.id, University, {
      def course = new Course(params)
      def university = University.get(params.id)
      university.addToCourses(course)
    })
  }
  
  def list = {
    render workflowService.listWithParent(params.id, University, Course, courseParams)
  }
  
  def update = {
    def status = 200
    def text = ""
    render workflowService.updateWithParent(params.id, Course, {
      def course = Course.get(params.id)
      course.properties = params
      course
    })
  }
  
  def colleagues = {
    def course = Course.get(params.id)
    def user = User.get(session.user)
    def inscriptions = Inscription.findAllByCourse(course)
    log.debug("Inscriptions: $inscriptions")
    def users = inscriptions*.user
    users -= user
    log.debug("Users: $users")
    def collected = users.collect {[name: it.name, facebookId: it.facebookId]
    }
    log.debug("Collected: $collected")
    render collected as JSON
  }
  
  def search = {
    def status = 200
    def text = ""
    if(params.id && session.user && User.exists(session.user)){
      User user = User.get(session.user)
      def courses = Course.findAllByUniversityInListAndNameIlike(user.universities, params.id)
      text = workflowService.collect(courses, courseParams) as JSON
    }else{
      status = 400     
    }
    render (status:status, text:text)
  }
}
