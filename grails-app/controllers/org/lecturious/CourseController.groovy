
package org.lecturious

import grails.converters.JSON

class CourseController {
  
  def courseParams = ["id", "name", "professor", "identificator", "type"]
  
  def addFlow = {
    initialize{
      action{
        log.debug("Action")
        def universities = Student.get(session.user).universities.toList().sort{it.name}
        if(universities.size() > 0){
            return [universities:universities]
                    
        }else{
            universityRedirect()
        }
      }
      on("success").to "courseDetails"
      on("universityRedirect").to "universityRedirect"
    }
    universityRedirect{
        redirect(controller:"university", action:"index") 
      }

    redirect{
      redirect(controller:"settings", action:"index") 
    }
    courseDetails{
      on("next"){
        log.debug("Dates pressed")
        def course = flow.course ?: new Course()
        
        course.properties = params
        course.creator = Student.get(session.user)
        
        def university = University.get(params.university)
        assert university
        flow.course = course
        flow.university = university
      }.to("dates")
      on("cancel").to("redirect")
      on("back").to("initialize")
    }
    dates{
      on("add"){ WithRecurrenceCommand cmd ->
        def course = flow.course
        def event = new Event(params)
        event.course = course
        event.creator = Student.get(session.user)
        if(event.validate()){
          course.addToEvents(event)
          cmd.recurringWeeks.times {
            def recurringEvent = new Event(event.properties)
            recurringEvent.date += 7*(it + 1)
            assert recurringEvent.validate()
            course.addToEvents (recurringEvent)
          }
        }else{
          [event:event]
        }
      }.to("dates")
      on("next").to("deadlines")
      on("remove"){
        def id = params.int("id")
        def course = flow.course
        def eventToRemove = course.events.asList()[id]
        course.removeFromEvents(eventToRemove)
      }.to("dates")
      on("cancel").to("redirect")
      on("back").to("courseDetails")    
    }
    deadlines{
      on("add"){
        def course = flow.course
        def todo = new Todo(params)
        todo.course = course
        todo.creator = Student.get(session.user)
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
      on("next").to("save")
      on("cancel").to("redirect")
      on("back").to("dates")
    }
    save{
      action{
        assert flow.university && flow.course
        def university = flow.university
        university.addToCourses(flow.course)
        assert university.save(flush:true)
        log.debug("In Dates $university")
      }
      on("success").to("join")
    }
    join{
      action{
        def student = Student.get(session.user)
        log.debug(flow.course)
        student.addToInscriptions(course:flow.course)
        assert student.save()
      }
      on("success").to("redirect")
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
  
  def showMessages = show
  
  def showLinks = show
}

class WithRecurrenceCommand{
    int recurringWeeks
}
