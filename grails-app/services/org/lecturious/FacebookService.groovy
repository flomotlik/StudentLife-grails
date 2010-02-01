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

  void afterPropertiesSet()
  {
      this.api_key = grailsApplication.config.facebook.api_key
      this.secret = grailsApplication.config.facebook.secret
  }

  def getFacebook() {
    def facebook = new FacebookJsonRestClient(api_key, secret);
    return facebook;
  }

  def getFacebookConnection(request, response) {
    def facebook = getFacebook();
    FacebookWebappHelper<Object> facebookHelper = new FacebookWebappHelper<Object>(request, response, api_key, secret, facebook);
    String nextPage = "http://apps.facebook.com/student-life"
    if (facebookHelper.requireLogin(nextPage)) {
      return;
    }
    return facebook
  }

  def getStudentInfos(studentIds) {
    log.debug(studentIds)
    def userInfo = [:]
    if(studentIds.size() > 0 && false){
     def facebook = getFacebook()
     def fbInfo = facebook.users_getInfo(studentIds, [ProfileField.PIC_SQUARE, ProfileField.NAME, ProfileField.UID])
    log.debug("FBInfo: $fbInfo")
     fbInfo.each {userInfo[it.uid] = [name:it.name,image:it.pic_square]}
     }
     return userInfo
  }
}
