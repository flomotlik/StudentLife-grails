fixture{
  course(org.lecturious.Course){
    creator:creator
    name="Course1" 
    professor="Professor"
    identificator="Identificator"
    type="Type"
    todos = [todo1, todo2, todo3, todo4, todo5, todo6, todo7, todo8]
    events = [event1, event2, event3, event4]
  }
  course2(org.lecturious.Course){
    creator:creator
    name="Course2" 
    professor="Professor"
    identificator="Identificator"
    type="Type"
  }
  course3(org.lecturious.Course){
    creator:creator
    name="Course3" 
    professor="Professor"
    identificator="Identificator"
    type="Type"
  }
}