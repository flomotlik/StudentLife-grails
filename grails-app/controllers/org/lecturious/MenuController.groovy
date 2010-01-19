package org.lecturious

class MenuController {

  def calendarService 
  
  def agenda = {
    render (template:"/calendar/index", model:calendarService.calendar(session.user))
  }
  
  def course = {
    def user = Student.get(session.user)
    def model = [courses:user.inscriptions*.course.sort{it.name
    }]
    render (template:"/course/index", model:model) 
  }
  
  def settings = {
    def user = Student.get(session.user)
    render (template:"/settings/index", model:[user:user])
  }
}