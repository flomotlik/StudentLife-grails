package org.lecturious;

import grails.converters.JSON;

class UserControllerFunctionalTests extends functionaltestplugin.FunctionalTestCase {
    void testUserShow() {
    redirectEnabled=false
    def facebookId = "12345"
    def name = "Name"
    get("http://localhost:8080/?userId=$facebookId&name=$name")
    get("app/user/show")
    assert response.contentType == "application/json"
    def json = JSON.parse(response.contentAsString)
    assert json.user.facebookId == facebookId
    assert json.user.name == name
    assertStatus 200
  }
}
