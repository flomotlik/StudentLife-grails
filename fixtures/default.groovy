fixture {
  course(org.lecturious.Course){
    name="Course1" 
    professor="Professor"
    identificator="Identificator"
    type="Type"
  }
  course2(org.lecturious.Course){
    name="Course2" 
    professor="Professor"
    identificator="Identificator"
    type="Type"
  }
  uni(org.lecturious.University){
    name="University" 
    courses = [course, course2]
  }
  city(org.lecturious.City){ name = "City" }
  state(org.lecturious.State, name:"Vienna")
  country(org.lecturious.Country){ name = "Country" }
  user(org.lecturious.User){
    facebookId = "development_user"
    name = "Name"
    universities = [uni]
  }
  user2(org.lecturious.User){
    facebookId = "user2"
    name = "Second"
  }
}