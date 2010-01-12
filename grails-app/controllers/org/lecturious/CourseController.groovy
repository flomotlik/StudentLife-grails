package org.lecturious

import grails.converters.JSON 


class CourseController {
  
  static def allowedMethods = [add:'POST', list:'GET', update:'POST', colleagues:'GET']
  
  def courseParams = ["id", "name", "professor", "identificator", "type"]
  
  def workflowService
  
  def add = {
    def course = new Course(params)
    def university = University.get(params.university)
    university.addToCourses(course)
    university.save()
    redirect(controller:"menu", action:"settings")
  }
  
  def renderAdd = {
    render(template:"/course/add", model:[universities:Student.get(session.user).universities.toList()])
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
    def user = Student.get(session.user)
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
    if(params.q && session.user && Student.exists(session.user)){
      Student user = Student.get(session.user)
      log.debug(user.universities)
      log.debug(user.universities*.courses*.name)
      log.debug(params.q)
      def courses = Course.findAllByUniversityInListAndNameIlike(user.universities, "%$params.q%")
      log.debug(courses)
      render (template:"/settings/searchResults", model:[courses:courses])
    }else{
      render (status:400)     
    }
    
  }
  
  def show = {
    def course = Course.get(params.id)
    def user = Student.get(session.user)
    def colleagues = Inscription.findAllByCourse(course)*.user
    colleagues -= user
    log.debug("Users: $colleagues")
    def model = [course:Course.get(params.id), colleagues:colleagues]
    log.debug("Model: $model")
    render (template:"show", model:model)
  }
}
