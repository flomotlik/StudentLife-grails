fixture {
  user2(org.lecturious.Student){
    facebookId = "user2"
    name = "Second"
    lastLogin = new Date()
  }
  course(org.lecturious.Course){
    creator = user2
    name="Mathematik 1" 
    professor="Professor"
    identificator="Identificator"
    type="Type"
  }
  course2(org.lecturious.Course){
    creator = user2
    name="Course2" 
    professor="Professor"
    identificator="Identificator"
    type="Type"
  }
  course3(org.lecturious.Course){
    creator = user2
    name="Course3" 
    professor="Professor"
    identificator="Identificator"
    type="Type"
  }
  uni(org.lecturious.University){
    name="University" 
    courses = [course, course2, course3]
  }
  uni2(org.lecturious.University){
    name="TU"
    courses = []
  }
  uni3(org.lecturious.University){
    name="TV"
    courses = []
  }
  city(org.lecturious.City){ name = "City" }
  state(org.lecturious.State, name:"Vienna")
  country(org.lecturious.Country){ name = "Country" }
  user(org.lecturious.Student){
    facebookId = "development_user"
    name = "Name"
    universities = [uni]
    lastLogin = new Date()
  }
}