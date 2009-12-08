package org.lecturious

class User{
  String facebookId
  
  String name
  
  static hasMany = [inscriptions:Inscription, universities:University]
}
