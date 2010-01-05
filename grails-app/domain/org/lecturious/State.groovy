package org.lecturious

import java.io.Serializable;

class State implements Serializable{
  String name
  
  static hasMany = [cities:City]
  
  static belongsTo = [country:Country]
  
  static mapping = {
    sort name:"asc" 
  }
}
