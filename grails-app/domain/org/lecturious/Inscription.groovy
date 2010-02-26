package org.lecturious

import java.util.Date;

public class Inscription {
  
  Date dateCreated
  
  Course course
  
  static belongsTo = [user:Student]
  
  boolean equals(toCompare){
    log.debug("Equals: $toCompare.course $course")
    this.course == toCompare.course
  }
}