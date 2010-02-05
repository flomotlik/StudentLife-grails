package org.lecturious

import java.util.SortedMap;
import javax.servlet.http.Cookie;
import com.google.code.facebookapi.FacebookJsonRestClient
import com.google.code.facebookapi.FacebookSignatureUtil;
import com.google.code.facebookapi.FacebookWebappHelper
import com.google.code.facebookapi.ProfileField
import com.google.code.facebookapi.FacebookException
import com.google.code.facebookapi.FacebookSignatureUtil

import org.apache.commons.logging.Log;
import org.springframework.beans.factory.InitializingBean

class FacebookService implements Serializable, InitializingBean {
  
  boolean transactional = false
  
  static scope = 'session'

  def grailsApplication
  def api_key;
  def secret;
  def nextPage;
  def facebook;
  


  void afterPropertiesSet() {
    this.api_key = grailsApplication.config.facebook.api_key
    this.secret = grailsApplication.config.facebook.secret
	this.nextPage = "http://apps.facebook.com/student-life"
  }


  /**
   * Must be called on each request
   * @param request
   * @param response
   * @return
   */
  def init(params, request, response) {
	Cookie[] cookies = request.getCookies();
	log.debug("Cookies:");
	cookies.each {
	  log.debug(it.name + " : " +it.value );
	};
	  log.debug("Params:" + params);
      log.debug("Request:" + request);
 	  log.debug("Reponse:" + response);
	
	  String sessionKey = params["fb_sig_session_key"];
	  log.debug("SessionKey: " + sessionKey);
	  log.debug("API KEY: " + api_key);
	  log.debug("SECRET: " + secret);
	  facebook = new FacebookJsonRestClient(api_key, secret);
	  
	  log.debug("checking Login");
	  FacebookWebappHelper<Object> facebookHelper = new FacebookWebappHelper<Object>(request, response, api_key, secret, facebook);
	  log.debug("nextPage: " + nextPage);
	  if (facebookHelper.requireLogin(nextPage)) {
			log.debug("Login required");
			return true;
	  }
	  try {
		facebook.users_getLoggedInUser()
	  }
	  catch (FacebookException e) {
		log.debug("Session problem: ", e);
		try {
			facebook = new FacebookJsonRestClient(api_key, secret, sessionKey);
			facebook.users_getLoggedInUser();
		}
		catch (FacebookException ex) {
			log.debug("Next session problem: ", e);
		}
	  }
	  return false;
  }
  
  def getLoggedInUser() {
	return facebook.users_getLoggedInUser();
  }

  def getStudentInfos(studentIds) {
    log.debug(studentIds)
    def userInfo = [:]
    if(studentIds){
      def fbInfo = facebook.users_getInfo(studentIds, [ProfileField.PIC_SQUARE, ProfileField.NAME, ProfileField.FIRST_NAME, ProfileField.LAST_NAME, ProfileField.UID])
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
  
  /**
   * Return url for redirect
   * @param studentId
   * @param friends
   * @param course
   * @return
   */
  def inviteFriends(studentId, friends) {
    String contentStr = "You have been invited to StudentLife";
    contentStr += "<fb:req-choice url='http://apps.facebook.com/momazam' label='Check out StudentLife' />"
    
    String typeStr = "StudentLife";
    
    String actionTextStr  = "Spread the word!  Help your friends discover StudentLife"
    
    Map<String, String> mfsParams = new TreeMap<String, String>();
    
    mfsParams.put("api_key", api_key);
    mfsParams.put("content", contentStr);
    mfsParams.put("type", typeStr);
    mfsParams.put("action", "http://apps.facebook.com/momazam/app/test/invite");
    mfsParams.put("actiontext", actionTextStr );
    
    String finalMFSUrl = buildQueryString( 
        "http://www.facebook.com/multi_friend_selector.php",
        mfsParams, secret);
    
    log.debug("finalMFSUrl = [" + finalMFSUrl + "]");
    return finalMFSUrl;
  }
	
  def getAdminInfo() {
	
  }
  
  private String buildQueryString(String baseUrl, SortedMap<String, String> mfsParams, String secretKey) 
  {
    
    // get back the list of params key=value string, need for sig calc
    
    String sig = FacebookSignatureUtil.generateSignature(mfsParams, secretKey);
    
    List<String> params = buildParamsList(mfsParams);
    
    String queryString = baseUrl + "?";
    for (String keyvalue : params) {
      queryString += keyvalue + "&";
    }
    queryString += "sig=" + sig;
    return queryString;
  }
  
  private List<String> buildParamsList(Map<String, String> mfsParams) 
  {
    List<String> params = new ArrayList<String>();
    
    for (Iterator iter = mfsParams.keySet().iterator(); iter.hasNext();) {
      String key = (String) iter.next();
      String value = mfsParams.get(key);
      params.add(key + "=" + value);
    }
    
    return params;
  }
  

}
