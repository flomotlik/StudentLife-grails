package org.lecturious;

class CountryControllerFunctionalTests extends functionaltestplugin.FunctionalTestCase {
  void testSomeWebsiteFeature() {
    redirectEnabled=false
    get("http://localhost:8080/")
    post("app/country/add"){
      headers['Content-Type'] = "text/plain"
      body{ "name=Name" }
    }
    assertStatus 200
  }
}
