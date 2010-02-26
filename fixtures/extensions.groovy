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
    creator = user2
    message = "Message" 
  }
  todo1(org.lecturious.Todo){
    creator = user2
    description = "todo1"
    date = new Date()
  }
  todo2(org.lecturious.Todo){
    creator = user2
    description = "todo2"
    date = new Date()-1
  }
  todo3(org.lecturious.Todo){
    creator = user2
    description = "todo3"
    date = new Date()+31
  }
  todo4(org.lecturious.Todo){
    creator = user2
    description = "todo3"
    date = new Date()-31
  }
  todo5(org.lecturious.Todo){
    creator = user2
    description = "todo5"
    date = new Date()+1
  }
  todo6(org.lecturious.Todo){
    creator = user2
    description = "todo6"
    date = new Date()+2
  }
  todo7(org.lecturious.Todo){
    creator = user2
    description = "todo7"
    date = new Date()+3
  }
  todo8(org.lecturious.Todo){
    creator = user2
    description = "todo7"
    date = new Date()+4
  }
  event1(org.lecturious.Event){
    creator = user2
    description = "event1"
    date = new Date()
    duration = 1
  }
  event2(org.lecturious.Event){
    creator = user2
    description = "event2"
    date = new Date() + 1
    duration = 1
  }
  event3(org.lecturious.Event){
    creator = user2
    description = "event3"
    date = new Date() + 31
    duration = 1
  }
  event4(org.lecturious.Event){
    creator = user2
    description = "event3"
    date = new Date() - 32
    duration = 1
  }
}