package org.lecturious;

import grails.converters.JSON;

class WorkflowControllerFunctionalTests extends functionaltestplugin.FunctionalTestCase {
  void testCountryController() {
    redirectEnabled=false
    def mainURL = "http://localhost:8080"
    def mainAppURL = "$mainURL/app"
    def assertResponse = {
      def id = response.contentAsString
      println  "CheckId: $id"
      assert id ==~ /\d+/
      assertStatus 200
    }
    get(mainURL)
    assertRedirectUrl "$mainURL/source"
    //Testing Country
    //Testing add
    def name = "Name"
    post("$mainAppURL/country/add"){
      headers['Content-Type'] = "application/x-www-form-urlencoded"
      body{ "name=$name" }
    }
    assertResponse()
    def countryId = response.contentAsString
    def idNumber = Integer.parseInt(countryId)
    //Testing list
    get("$mainAppURL/country/list")
    assertStatus 200
    def json = JSON.parse(response.contentAsString)
    assert json.countries.size() == 1
    assert json.countries[-1].id.toString() == countryId
    assert json.countries[-1].name == name
    
    //Testing State
    post("$mainAppURL/state/add/$countryId"){
      headers['Content-Type'] = "application/x-www-form-urlencoded"
      body{ "name=$name" }
    }
    assertResponse()
    get("$mainAppURL/state/list/$countryId")
    assertStatus 200
    json = JSON.parse(response.contentAsString)
    assert json.states.size() == 1
    def stateId = json.states[-1].id
    assert json.states[-1].name == name
    
    //Testing City
    post("$mainAppURL/city/add/$countryId/$stateId"){
      headers['Content-Type'] = "application/x-www-form-urlencoded"
      body{ "name=$name" }
    }
    assertResponse()
    get("$mainAppURL/city/list/$countryId/$stateId")
    assertStatus 200
    json = JSON.parse(response.contentAsString)
    assert json.cities.size() == 1
    def cityId = json.cities[-1].id
    assert json.cities[-1].name == name
    
    //Testing University
    post("$mainAppURL/university/add/$countryId/$stateId/$cityId"){
      headers['Content-Type'] = "application/x-www-form-urlencoded"
      body{ "name=$name" }
    }
    assertResponse()
    get("$mainAppURL/university/list/$countryId/$stateId/$cityId")
    assertStatus 200
    json = JSON.parse(response.contentAsString)
    assert json.universities.size() == 1
    def universityId = json.universities[-1].id
    
    assert json.universities[-1].name == name
    
    //Testing Course
    def professor = "Baron"
    def identificator = "123"
    def type = "Type"
    def points = 3
    post("$mainAppURL/course/add/$countryId/$stateId/$cityId/$universityId"){
      headers['Content-Type'] = "application/x-www-form-urlencoded"
      body{ "name=$name&professor=$professor&identificator=$identificator&type=$type&points=$points" }
    }
    assertResponse()
    get("$mainAppURL/course/list/$countryId/$stateId/$cityId/$universityId")
    assertStatus 200
    json = JSON.parse(response.contentAsString)
    assert json.courses.size() == 1
    def courseId = json.courses[-1].id
    assert json.courses[-1].name == name
    assert json.courses[-1].professor == professor
    assert json.courses[-1].identificator == identificator
    assert json.courses[-1].type == type
    assert json.courses[-1].points == points
    
    //Test Event
    def description = "descriptin"
    def date = 123456
    def duration = 1
    post("$mainAppURL/course/addEvent/$countryId/$stateId/$cityId/$universityId/$courseId"){
      headers['Content-Type'] = "application/x-www-form-urlencoded"
      body{ "description=$description&date=$date&duration=$duration" }
    }
    assertResponse()
    get("$mainAppURL/course/listEvents/$countryId/$stateId/$cityId/$universityId/$courseId")
    assertStatus 200
    json = JSON.parse(response.contentAsString)
    assert json.events.size() == 1
    assert json.events[-1].description == description
    assert json.events[-1].date == date
    assert json.events[-1].duration == duration
    
    //Test Todo
    post("$mainAppURL/course/addTodo/$countryId/$stateId/$cityId/$universityId/$courseId"){
      headers['Content-Type'] = "application/x-www-form-urlencoded"
      body{ "description=$description&date=$date" }
    }
    assertResponse()
    get("$mainAppURL/course/listTodos/$countryId/$stateId/$cityId/$universityId/$courseId")
    assertStatus 200
    json = JSON.parse(response.contentAsString)
    assert json.todos.size() == 1
    assert json.todos[-1].description == description
    assert json.todos[-1].date == date
    
    //Test Link
    def link = "Link"
    post("$mainAppURL/course/addLink/$countryId/$stateId/$cityId/$universityId/$courseId"){
      headers['Content-Type'] = "application/x-www-form-urlencoded"
      body{ "description=$description&link=$link" }
    }
    assertResponse()
    get("$mainAppURL/course/listLinks/$countryId/$stateId/$cityId/$universityId/$courseId")
    assertStatus 200
    json = JSON.parse(response.contentAsString)
    assert json.links.size() == 1
    assert json.links[-1].description == description
    assert json.links[-1].link == link
    
    post("$mainAppURL/user/addCourse/$countryId/$stateId/$cityId/$universityId/$courseId")
    assertStatus 403
    
    post("$mainAppURL/user/addUniversity/$countryId/$stateId/$cityId/$universityId")
    assertStatus 200
    
    //Same University can't be added twice
    post("$mainAppURL/user/addUniversity/$countryId/$stateId/$cityId/$universityId")
    assertStatus 403
    
    get("$mainAppURL/user/listUniversities")
    assertStatus 200
    json = JSON.parse(response.contentAsString)
    assert json.universities.size() == 1
    assert json.universities[0].id == universityId
    
    post("$mainAppURL/user/addCourse/$countryId/$stateId/$cityId/$universityId/$courseId")
    assertStatus 200
    
    //Same course can't be added twice
    post("$mainAppURL/user/addCourse/$countryId/$stateId/$cityId/$universityId/$courseId")
    assertStatus 403
    
    get("$mainAppURL/user/listCourses")
    assertStatus 200
    json = JSON.parse(response.contentAsString)
    assert json.courses.size() == 1
    assert json.courses[0].courseId == courseId
  }
}
