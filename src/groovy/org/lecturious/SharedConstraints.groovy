package org.lecturious

class SharedConstraints {
  def static courseExistsConstraint = {
    Course.exists(it) ? null : "course.exists.false"
  }
}