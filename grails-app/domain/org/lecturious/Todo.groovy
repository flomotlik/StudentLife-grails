package org.lecturious

class Todo{
  String description
  
  //Date stored in UTC
  Date date
  
  static belongsTo = [course:Course]
  
  static mapping = {
    sort date:"asc" 
  }
}