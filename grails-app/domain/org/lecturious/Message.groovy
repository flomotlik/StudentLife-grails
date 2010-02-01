package org.lecturious

class Message {
	
	String message

    Date dateCreated;

    Student student;
	
	static belongsTo = [course:Course]
  
}
