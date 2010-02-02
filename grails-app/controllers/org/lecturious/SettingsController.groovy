package org.lecturious

class SettingsController {

  def index = {
    def user = Student.get(session.user)
    [user:user]
  }
}
