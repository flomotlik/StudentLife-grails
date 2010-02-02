package org.lecturious

class WallController {

  def index = {
    def user = Student.get(session.user)
    def inscriptions = Inscription.findAllByUser(user)
    [user: user, courses: inscriptions*.course.sort {
      it.name
    }]
  }
}
