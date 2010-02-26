package org.lecturious

import java.util.Date;

class Todo implements Serializable{
  
  Date dateCreated
  
  Date lastUpdated
  
  Student creator
  
  String description
  
  //Date stored in UTC
  Date date
  
  static belongsTo = [course:Course]
  
  static mapping = {
    sort date:"asc" 
  }
}