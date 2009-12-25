package org.lecturious

class Todo{
  String description
  
  //Date stored in UTC
  long date
  
  static belongsTo = [course:Course]
}