package org.lecturious

class MessageController {
  
  def add = {
    def message = new Message(message:params.message)
    message.creator = Student.get(session.user)
    def course= Course.get(params.id)
    course.addToMessages(message)
    assert course.save()
    render (template:"/course/showCourse", model:[course:course])
  }
}
