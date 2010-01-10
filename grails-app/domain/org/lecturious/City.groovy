package org.lecturious

import java.io.Serializable;

class City implements Serializable{
  
  String name
  
  static hasMany = [universities:University]
  
  static belongsTo = [state:State]
  
  static mapping = {
    sort name:"asc" 
  }
}
