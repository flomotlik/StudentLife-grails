package org.lecturious

/**
 *
 * @author florian
 */
class FacebookMock implements Serializable{
  
  def userId = "123456"  
  
  def init(params, request, response) {
    //Has to return False because FacebookService does so too
    false
  }
  def getLoggedInUser() {
    return userId
  }
  
  def getStudentInfos(studentIds) {
    [(userId):[name:"Name", facebookId:userId]]
  }
}

