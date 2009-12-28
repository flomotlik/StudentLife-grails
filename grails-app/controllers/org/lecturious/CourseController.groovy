package org.lecturious

import grails.converters.JSON 


class CourseController {
  
  static def allowedMethods = [add:'POST', list:'GET', update:'POST', colleagues:'GET']
  
  def workflowService
  
  def add = {
    render workflowService.saveWithParent(params.id, University, {
      def course = new Course(params)
      def university = University.get(params.id)
      university.addToCourses(course)
    })
  }
  
  def list = {
    if(params.id && University.exists(params.id)){
      def university = University.get(params.id)
      def courses = Course.findAllByUniversity(university)
      render courses.collect{[id: it.id, name: it.name, professor: it.professor, identificator: it.identificator, type: it.type]
      } as JSON
    }else{
      render(status:400)     
    }
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
}
