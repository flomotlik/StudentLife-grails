package org.lecturious

import grails.converters.JSON;

class CourseController {
  
  static def allowedMethods = [add:'POST', list:'GET']
  
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
      render university.courses.collect{[id: it.id, name: it.name, professor: it.professor, identificator: it.identificator,
        type: it.type, points: it.points]
      } as JSON
    }else{
      render(status:400)     
    }
  }
  
  def update = {
    def course = loadCourse()
    course.properties = params
    course.save
    render course.id
  }
  
  def showColleagues = {
    //TODO
    def inscriptions = persistenceService.loadAllWithKey(Inscription.class, "course", key)
    log.debug("Inscriptions: $inscriptions")
    def users = []
    inscriptions.each {
      users << it.id.parent
    }
    render(builder: "json", contentType: "application/json") {
      colleagues {
        users.each {
          if (it.id != session.user) {
            def user = persistenceService.getObjectById(User.class, it)
            colleague(name: user.name, facebookId: user.facebookId)
          }
        }
      }
    }
  }
  
  private def universityKey() {
    University.get(params.id)
  }
  
  private def loadCourse(){
    Course.get(params.id)
  }
}
