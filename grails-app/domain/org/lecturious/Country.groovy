package org.lecturious

class Country{
  
  String name
  
  static hasMany = [states:State]
  
  static mapping = {
    sort name:"asc" 
  }
}
