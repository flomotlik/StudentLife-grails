package org.lecturious

class State implements Serializable {
  String name
  
  static hasMany = [cities:City]
}
