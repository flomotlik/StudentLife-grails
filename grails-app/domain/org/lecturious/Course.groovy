package org.lecturious

class Course implements Serializable {
  
  String name
  
  String professor
  
  String identificator
  
  String type
  
  static hasMany = [todos:Todo, events:Event, links:Link, messages:Message]
  
  static belongsTo = [university:University]
}
