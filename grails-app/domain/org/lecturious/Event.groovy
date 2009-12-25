package org.lecturious

class Event {
  
  String description
  
  //Date stored in UTC
  long date
  
  //Duration in Minutes
  int duration
  
  static belongsTo = [course:Course]
}