package org.lecturious

import java.io.Serializable;

class Student implements Serializable{
  String facebookId
  
  String name
  
  static hasMany = [inscriptions:Inscription, universities:University]
}
