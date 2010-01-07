package org.lecturious

import java.util.Calendar;
import java.util.GregorianCalendar;

class MenuController {
  
  def days = [6,0,1,2,3,4,5]
  
  def calendarService 
  
  def agenda = {
    render (template:"/calendar/index", model:calendarService.calendar(session.user))
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