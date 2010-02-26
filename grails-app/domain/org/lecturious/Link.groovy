package org.lecturious

import java.util.Date;

class Link{
  
  Date dateCreated
  
  Date lastUpdated
  
  Student creator
  
  String description
  
  String link
  
  static belongsTo = [course:Course]
}