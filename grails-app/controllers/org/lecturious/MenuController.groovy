package org.lecturious

class MenuController {
  
  def agenda = {
    render (template:"/calendar/index")
  }
  
  def course = {
    def user = User.get(session.user)
    def model = [courses:user.inscriptions*.course.sort{it.name
    }]
    render (template:"/course/index", model:model) 
  }
  
  def settings = {
    render (template:"/settings/index")
  }
}