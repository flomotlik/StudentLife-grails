package org.lecturious

import com.google.code.facebookapi.FacebookJsonRestClient
import com.google.code.facebookapi.FacebookWebappHelper

class FacebookService implements Serializable{

    boolean transactional = false

    static scope = 'session'

    def getFacebookConnection(request, response){
        def api_key = ""
        def secret = ""
        def facebook = new FacebookJsonRestClient(api_key, secret);
        FacebookWebappHelper<Object> facebookHelper = new FacebookWebappHelper<Object> (request, response, api_key, secret, facebook);
        String nextPage = "http://apps.facebook.com/lectorius"
        if (facebookHelper.requireLogin(nextPage))  {
            return;
        }
        return facebook
    }
}
