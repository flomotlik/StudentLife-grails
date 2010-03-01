package org.lecturious

class TodoController {
  
  def add = {TodoAddCommand cmd ->
    //Set to true, so Error doesn't get added when validation fails and Course.exists isn't called
    //Only set exists when validation passes
    if (cmd.validate()) {
      def todo = cmd.createTodo()
      def user = Student.get(session.user)
      assert user
      todo.creator = user
      def course = Course.get(cmd.courseId)
      
      course.addToTodos(todo)
      assert course.save()
      redirect(controller: "calendar", action: "index")
    } else {
      render(template: "/errors", model: [errors: cmd])
    }
  }
  
  def show = {
    [todo:Todo.get(params.id)]
  }
}
class TodoAddCommand {
  Date date

  String description

  int courseId

  Todo createTodo() {
    new Todo(description: description, date: date)
  }

  static constraints = {
    description(blank: false, nullable: false)
    date(nullable: false)
    courseId(min:1, validator:SharedConstraints.courseExistsConstraint)
  }
}