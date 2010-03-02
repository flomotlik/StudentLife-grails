fixture{
  todo1(org.lecturious.Todo){
    creator = creator
    description = "todo1"
    date = new Date()
  }
  todo2(org.lecturious.Todo){
    creator = creator
    description = "todo2"
    date = new Date()-1
  }
  todo3(org.lecturious.Todo){
    creator = creator
    description = "todo3"
    date = new Date()+31
  }
  todo4(org.lecturious.Todo){
    creator = creator
    description = "todo3"
    date = new Date()-31
  }
  todo5(org.lecturious.Todo){
    creator = creator
    description = "todo5"
    date = new Date()+1
  }
  todo6(org.lecturious.Todo){
    creator = creator
    description = "todo6"
    date = new Date()+2
  }
  todo7(org.lecturious.Todo){
    creator = creator
    description = "todo7"
    date = new Date()+3
  }
  todo8(org.lecturious.Todo){
    creator = creator
    description = "todo7"
    date = new Date()+4
  }
}