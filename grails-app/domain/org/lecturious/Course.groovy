package org.lecturious

class Course implements Serializable {
  
  String name
  
  String professor
  
  String identificator
  
  String type
  
  int points
  
  static hasMany = [todos:Todo, events:Event, links:Link]
  
  static belongsTo = [university:University]
}
