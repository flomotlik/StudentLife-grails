package org.lecturious

import grails.converters.JSON


class CourseController {
  
  def courseParams = ["id", "name", "professor", "identificator", "type"]
  
  def addFlow = {
    initialize{
      action{
        log.debug("Action")
        [universities:Student.get(session.user).universities]        
      }
      on("success").to "courseDetails"
    }
    courseDetails{
      on("dates"){
        flow.course = new Course(params)
        flow.university = University.get(params.university)
        flow.university.addToCourses(course)
      }.to("dates")
    }
    dates{
//      flow.university.save()
      redirect(controller:"settings", action:"index")
    }
  }
  
  def search = {
    listUniversities();
    if(session.user && Student.exists(session.user)){
      Student user = Student.get(session.user)
      log.debug(user.universities)
      log.debug(user.universities*.courses*.name)
      log.debug(params.q)
      def qString = params.q;
      if (qString.size() == 0) {
        qString = "%"
      }
      else {
        qString = "%" + qString + "%" 
      }
      def courses = Course.findAllByUniversityInListAndNameIlike(user.universities, qString, [max:15]);
      log.debug(courses)
      render (template:"/settings/searchResults", model:[courses:courses])
    }else{
      render (status:400)
    }
  }
  
  
  def listUniversities() {
    
    if (list.size() == 0) {
      log.debug("Not subscribed to any university!");
      redirect(controller:"menu", action:"settings", params:["message":"You must be at least subscribed to one university"])
    }
    return list;
  }
  
  def show = {
    def course = Course.get(params.id)
    def user = Student.get(session.user)
    def colleagues = Inscription.findAllByCourse(course)*.user
    colleagues -= user
    log.debug("Users: $colleagues")
    [course:Course.get(params.id), colleagues:colleagues]
  }
}
