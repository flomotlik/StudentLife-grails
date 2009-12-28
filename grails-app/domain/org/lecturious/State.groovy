package org.lecturious

class State{
  String name
  
  static hasMany = [cities:City]
  
  static belongsTo = [country:Country]
  
  static mapping = {
    sort name:"asc" 
  }
}
