package org.lecturious

class City{
  
  String name
  
  static hasMany = [universities:University]
  
  static belongsTo = [state:State]
  
  static mapping = {
    sort name:"asc" 
  }
}
