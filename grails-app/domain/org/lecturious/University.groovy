package org.lecturious

class University{
  String name
  
  static hasMany = [courses:Course]
  
  static belongsTo = [city:City]
}
