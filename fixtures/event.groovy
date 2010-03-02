fixture{
  event1(org.lecturious.Event){
    creator = creator
    description = "event1"
    date = new Date()
    duration = 1
  }
  event2(org.lecturious.Event){
    creator = creator
    description = "event2"
    date = new Date() + 1
    duration = 1
  }
  event3(org.lecturious.Event){
    creator = creator
    description = "event3"
    date = new Date() + 31
    duration = 1
  }
  event4(org.lecturious.Event){
    creator = creator
    description = "event3"
    date = new Date() - 32
    duration = 1
  }
}