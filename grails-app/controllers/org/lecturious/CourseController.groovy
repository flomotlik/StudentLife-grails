package org.lecturious

import grails.converters.JSON

class CourseController {
  
  def courseParams = ["id", "name", "professor", "identificator", "type"]
  
  def addFlow = {
    initialize{
      action{
        log.debug("Action")
        [universities:Student.get(session.user).universities.toList()]        
      }
      on("success").to "courseDetails"
    }
    courseDetails{
      on("dates"){
        log.debug("Dates pressed")
        def course = new Course(params)
        def university = University.get(params.university)
        university.addToCourses(course)
        flow.course = course
        flow.university = university
        [course:course]
      }.to("dates")
    }
    dates{
      on("add"){
        def course = flow.course
        def event = new Event(params)
        event.course = course
        if(event.validate()){
          course.addToEvents(event)
        }else{
          [event:event]
        }
      }.to("dates")
      on("deadlines").to("deadlines")
      on("remove"){
        def id = params.int("id")
        def course = flow.course
        def eventToRemove = course.events.asList()[id]
        course.removeFromEvents(eventToRemove)
      }.to("dates")
    }
    deadlines{
      on("add"){
        def course = flow.course
        def todo = new Todo(params)
        todo.course = course
        if(todo.validate()){
          course.addToTodos(todo)
        }else{
          [todo:todo]
        }
      }.to("deadlines")
      on("remove"){
        def id = params.int("id")
        def course = flow.course
        def todoToRemove = course.todos.asList()[id]
        course.removeFromTodos(todoToRemove)
      }.to("deadlines")
      on("save").to("save")
    }
    save{
      def university = flow.university
      log.debug("In Dates $university")
      redirect(controller:"settings", action:"index")
    }
  }
  
  def search = {
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
  
  def show = {
    def course = Course.get(params.id)
    def user = Student.get(session.user)
    def colleagues = Inscription.findAllByCourse(course)*.user
    colleagues -= user
    log.debug("Users: $colleagues")
    [course:Course.get(params.id), colleagues:colleagues]
  }
}
