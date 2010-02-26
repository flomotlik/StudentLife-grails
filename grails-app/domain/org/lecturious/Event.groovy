package org.lecturious

import java.util.Date;

class Event implements Serializable {
  
  Date dateCreated
  
  Date lastUpdated
  
  Student creator
  
  String description
  
  //Date stored in UTC
  Date date
  
  //Duration in Minutes
  int duration
  
  static belongsTo = [course:Course]
  
  static mapping = {
    sort date:"asc" 
  }
}