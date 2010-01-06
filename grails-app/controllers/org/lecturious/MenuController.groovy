package org.lecturious

class MenuController {
  
  def agenda = {
    def courses = User.get(session.user).inscriptions*.course
    def todos = Todo.findAllByCourseInList(courses)
    def events = Event.findAllByCourseInList(courses)
    def rows = new CalendarHelper().calendar(2010, 1)
    render (template:"/calendar/index", model:[rows:rows, todos:todos, events:events, year:2010, month:0])
  }
  
  def course = {
    def user = User.get(session.user)
    def model = [courses:user.inscriptions*.course.sort{it.name
    }]
    render (template:"/course/index", model:model) 
  }
  
  def settings = {
    def user = User.get(session.user)
    render (template:"/settings/index", model:[user:user])
  }
}