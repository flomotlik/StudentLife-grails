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
  course3(org.lecturious.Course){
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
    facebookId = "715095657"
    name = "Fredrik Debong"
    universities = [uni]
  }
  user2(org.lecturious.Student){
    facebookId = "777618108"
    name = "Michael Greifeneder"
    universities = [uni]
  }
  user3(org.lecturious.Student){
    facebookId = "1062883815"
    name = "Florian Motlik"
    universities = [uni]
  }
  
  user4(org.lecturious.Student){
    facebookId = "100000202563861"
    name = "Manuel Weiss"
    universities = [uni]
  }
  
}