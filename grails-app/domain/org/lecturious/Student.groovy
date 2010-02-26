package org.lecturious

import java.io.Serializable;

class Student implements Serializable{
  
  Date dateCreated
  
  Date lastLogin
  
  String facebookId
  
  String name
  
  static hasMany = [inscriptions:Inscription, universities:University]
}
