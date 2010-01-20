package org.lecturious

import grails.converters.JSON


class CourseController {

  def courseParams = ["id", "name", "professor", "identificator", "type"]

  def add = {
    def course = new Course(params)
    def university = University.get(params.university)
    university.addToCourses(course)
    university.save()
    redirect(controller:"menu", action:"settings")
  }

  def renderAdd = {
	def list = listUniversities();
    render(template:"/course/add", model:[universities:list])
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
      def courses = Course.findAllByUniversityInListAndNameIlike(user.universities, qString);
      log.debug(courses)
      render (template:"/settings/searchResults", model:[courses:courses])
    }else{
      render (status:400)
    }
  }
  
  
  def listUniversities() {
	def list = Student.get(session.user).universities.toList();
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
    def model = [course:Course.get(params.id), colleagues:colleagues]
    log.debug("Model: $model")
    render (template:"show", model:model)
  }
}
