package org.lecturious

class UniversityController {
  
  def add = {
    def city = City.get(params.id)
    def university = new University(name: params.name)
    city.addToUniversities(university)
    university.save()
    city.save()
    render university.id
  }
  
  def list = {
    def city = City.get(params.id)
    render(builder: "json", contentType: "application/json") {
      universities {
        city.universities.each {
          university(id: it.id, name: it.name)
        }
      }
    }
  }
}
