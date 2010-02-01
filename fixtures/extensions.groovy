fixture {
  inscription(org.lecturious.Inscription){
    course = course
    user = user
  }
  inscription2(org.lecturious.Inscription){
    course = course2
    user = user
  }
  inscription3(org.lecturious.Inscription){
    course = course
    user = user2
  }
  message(org.lecturious.Message){
    message = "Message"
    student = user
    }
  todo1(org.lecturious.Todo){
    description = "todo1"
    date = new Date()
  }
  todo2(org.lecturious.Todo){
    description = "todo2"
    date = new Date()-1
  }
  todo3(org.lecturious.Todo){
    description = "todo3"
    date = new Date()+31
  }
  todo4(org.lecturious.Todo){
    description = "todo3"
    date = new Date()-31
  }
  event1(org.lecturious.Event){
    description = "event1"
    date = new Date()
    duration = 1
  }
  event2(org.lecturious.Event){
    description = "event2"
    date = new Date() + 1
    duration = 1
  }
  event3(org.lecturious.Event){
    description = "event3"
    date = new Date() + 31
    duration = 1
  }
  event4(org.lecturious.Event){
    description = "event3"
    date = new Date() - 32
    duration = 1
  }
}