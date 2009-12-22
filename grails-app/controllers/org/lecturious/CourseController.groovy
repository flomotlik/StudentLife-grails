package org.lecturious

import grails.converters.JSON;

class CourseController {
  
  static def allowedMethods = [add:'POST', list:'GET', update:'POST', colleagues:'GET']
  
  def add = {
    def status = 200
    def text = ""
    if(params.id && University.exists(params.id)){
      def course = new Course(name: params.name)
      def university = University.get(params.id)
      university.addToCourses(course)
      university.save(flush:true) ? (text = course.id.toString()) : (status = 400)
    }else{
      status = 400
    }
    log.debug("Text: $text Status: $status")
    render(text:text, status:status)
  }
  
  def list = {
    if(params.id && University.exists(params.id)){
      def university = University.get(params.id)
      render university.courses.collect{[id: it.id, name: it.name, professor: it.professor, identificator: it.identificator, type: it.type]
      } as JSON
    }else{
      render(status:400)     
    }
  }
  
  def update = {
    def status = 200
    def text = ""
    if(params.id && Course.exists(params.id)){
      log.debug("Params: params.id ${params.id.class}")
      def course = Course.get(params.id)
      course.name = params.name
      course.professor = params.professor
      course.identificator = params.identificator
      course.type = params.type
      course.save() ? (text = course.id.toString()) : (status = 400)
    }
    else{
      status = 400
    }
    render (status:status, text:text)
  }
  
  def colleagues = {
    def course = Course.get(params.id)
    def user = User.get(session.user)
    def inscriptions = Inscription.findAllByCourse(course)
    log.debug("Inscriptions: $inscriptions")
    def users = inscriptions*.user
    users -= user
    log.debug("Users: $users")
    def collected = users.collect {[name: it.name, facebookId: it.facebookId]}
    log.debug("Collected: $collected")
    render collected as JSON
  }
}
