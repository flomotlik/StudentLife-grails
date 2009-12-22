package org.lecturious

public class Inscription {
  Course course
  
  static belongsTo = [user:User]
  
  boolean equals(toCompare){
    log.debug("Equals: $toCompare.course $course")
    this.course == toCompare.course
  }
}