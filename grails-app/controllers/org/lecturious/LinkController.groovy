package org.lecturious

class LinkController {
  def add = {
    def link = new Link(params)
    link.creator = Student.get(session.user)
    def course= Course.get(params.id)
    course.addToLinks(link)
    assert course.save()
    redirect(controller:"course", action:"showLinks", id:course.id)
  }
}
