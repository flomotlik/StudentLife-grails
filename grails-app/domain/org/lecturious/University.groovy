package org.lecturious

import java.io.Serializable;

class University implements Serializable{
  String name
  
  static hasMany = [courses:Course]
  
  static belongsTo = [city:City]
  
  static mapping = {
    sort name:"asc" 
  }
}
