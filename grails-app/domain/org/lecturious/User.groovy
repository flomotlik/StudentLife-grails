package org.lecturious

import java.io.Serializable;

class User implements Serializable{
  String facebookId
  
  String name
  
  static hasMany = [inscriptions:Inscription, universities:University]
}
