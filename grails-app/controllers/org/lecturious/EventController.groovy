package org.lecturious

class EventController {

  def add = {EventAddCommand cmd ->
    if (cmd.validate()) {
      log.debug("EventController.add() called")
      def event = cmd.createEvent()
      def course = Course.get(cmd.courseId)
      course.addToEvents(event)
      course.save()
      log.debug("Saved event: " + course.events);
      redirect(controller: "calendar", action: "index")
    } else {
      render(template: "/errors", model: [errors: cmd])
    }
  }
}
class EventAddCommand {
  Date date

  String description

  int courseId

  int duration

  Event createEvent() {
    new Event(description: description, date: date, duration: duration)
  }

  static constraints = {
    description(blank: false, nullable: false)
    date(nullable: false)
    courseId(min: 1, validator:SharedConstraints.courseExistsConstraint)
    duration(min: 1)
  }
}
