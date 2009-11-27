package org.lecturious;

import grails.converters.JSON;

class CountryControllerFunctionalTests extends functionaltestplugin.FunctionalTestCase {
  void testCountryController() {
    redirectEnabled=false
    get("http://localhost:8080")
    assertRedirectUrl "http://localhost:8080/source"
    //Testing add
    def name = "Österreich"
    post("app/country/add"){
      headers['Content-Type'] = "application/x-www-form-urlencoded"
      body{ "name=$name" }
    }
    assertStatus 200
    def id = response.contentAsString
    assert id ==~ /\d+/
    //Testing list
    get("list")
    def json = JSON.parse(response.contentAsString)
    assert json.countries.size() == 1
    assert json.countries[0].id.toString() == id
    assert json.countries[0].name == name
  }
}
