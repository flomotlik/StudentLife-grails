package org.lecturious

class Event implements Serializable {
  
  String description
  
  //Date stored in UTC
  Date date
  
  //Duration in Minutes
  int duration
  
  static belongsTo = [course:Course]
  
  static mapping = {
    sort date:"asc" 
  }
}