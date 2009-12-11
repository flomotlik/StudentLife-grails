package org.lecturious

class City implements Serializable {
  
  String name
  
  static hasMany = [universities:University]
  
  static belongsTo = [state:State]
}
