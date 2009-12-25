package org.lecturious

class Link{
  String description
  
  String link
  
  static belongsTo = [course:Course]
}