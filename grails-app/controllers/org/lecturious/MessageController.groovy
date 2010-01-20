package org.lecturious

class MessageController {
  
  def add = {
    def message = new Message(message:params.message)
    def course= Course.get(params.id)
    course.addToMessages(message)
    course.save()
    render (template:"/course/showCourse", model:[course:course])
  }
}
