package org.lecturious

import java.io.Serializable;

class Country implements Serializable{
  
  String name
  
  static hasMany = [states:State]
  
  static mapping = {
    sort name:"asc" 
  }
}
