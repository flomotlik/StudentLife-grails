package org.lecturious

import com.google.code.facebookapi.FacebookJsonRestClient
import com.google.code.facebookapi.FacebookWebappHelper
import com.google.code.facebookapi.ProfileField
import org.springframework.beans.factory.InitializingBean

class FacebookService implements Serializable, InitializingBean {
  
  boolean transactional = false
  
  static scope = 'session'

  def grailsApplication
  def api_key;
  def secret;
  def sessionKey;

  void afterPropertiesSet() {
    this.api_key = grailsApplication.config.facebook.api_key
    this.secret = grailsApplication.config.facebook.secret
  }

  def getFacebook() {
    def facebook = new FacebookJsonRestClient(api_key, secret);
    return facebook;
  }


  def getFacebookConnection(request, response) {
    String nextPage = "http://apps.facebook.com/student-life"
    getFacebookConnection(request, response, nextPage)
  }

  def getFacebookConnection(request, response, nextPage) {
    def facebook = getFacebook();
    FacebookWebappHelper<Object> facebookHelper = new FacebookWebappHelper<Object>(request, response, api_key, secret, facebook);
    if (facebookHelper.requireLogin(nextPage)) {
      return;
    }
    return facebook
  }
  

  def getStudentInfos(studentIds) {
    log.debug(studentIds)
    def userInfo = [:]
    if(studentIds){
      def facebook = getFacebook()
      igtdef fbInfo = facebook.users_getInfo(studentIds, [ProfileField.PIC_SQUARE, ProfileField.NAME, ProfileField.FIRST_NAME, ProfileField.LAST_NAME, ProfileField.UID])
      log.debug("FBInfo: $fbInfo")
      def length = fbInfo.length();
      for(int i = 0; i < length ; i++) {
        def it = fbInfo.get(i);
        userInfo[it.uid] = [id:it.uid, name:it.name,image:it.pic_square]
      }
    }
    log.debug("Return: " + userInfo)
    return userInfo
  }

  def getFriends(studentId) {
    def facebook = getFacebook()
    def json = facebook.friends_get(studentId);

    def length = json.length();
    def result = []
    for(int i = 0; i < length;i++) {
      result += json.get(i)
    }

    return result;
  }

  def postWall(studentId, msg) {

  }

  def inviteFriends(studentId, friends, course) {

  }

}
