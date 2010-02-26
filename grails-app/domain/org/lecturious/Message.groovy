package org.lecturious

import java.util.Date;

class Message {
  
  Date dateCreated
  
  Date lastUpdated
  
  Student creator
  
  String message
  
  static belongsTo = [course:Course]
  
  static mapping = {
    sort 'dateCreated' 
  }
}
