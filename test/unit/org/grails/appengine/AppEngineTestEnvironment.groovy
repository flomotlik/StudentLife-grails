package org.grails.appengine

import com.google.apphosting.api.ApiProxy.Environment

class AppEngineTestEnvironment implements Environment {
    String defaultNamespace = "grails.org"
    
    final String appId = 'Grails.org appengine tested app'
    final String versionId = '1.0'
    final String requestNamespace = 'appengine.grails.org'
    final String authDomain = 'appengine.grails.org'
    final boolean loggedIn = false
    final String email = "appengine@grails.org"
    final boolean admin = false
    final Map attributes = [:]
    
    void setDefaultNamespace(newDefaultNamespace) { 
        // nothing to do
    }
}

