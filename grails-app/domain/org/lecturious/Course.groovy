package org.lecturious

import java.util.Date;

class Course implements Serializable{
  
  Date dateCreated
  
  Date lastUpdated
  
  Student creator
  
  String name
  
  String professor
  
  String identificator
  
  String type
  
  static hasMany = [todos:Todo, events:Event, links:Link, messages:Message]
  
  static belongsTo = [university:University]
  
  static mapping = {
    sort name:"asc"
  }
}
