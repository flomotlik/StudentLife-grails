package org.lecturious

class MessageController {
  
  def facebookService
  def add = {
    if (facebookService.init(params, request, response)) {
    	log.debug("login required");
        return;
    }
    def student = Student.get(session.user);
    def message = new Message(message:params.message, student:student);
    def course= Course.get(params.id)
    course.addToMessages(message)
    course.save()
    def userInfo = facebookService.getStudentInfos(course.messages.student*.facebookId);
    render (template:"/course/showCourse", model:[course:course, userInfo:userInfo])
  }
}
