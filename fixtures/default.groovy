fixture {
  uni(org.lecturious.University){
    name="TU Wien"
    courses = []
  }
  uni2(org.lecturious.University){
    name="Universität Wien"
    courses = []
  }
  uni3(org.lecturious.University){
    name="WU Wien"
    courses = []
  }
  uni4(org.lecturious.University){
    name="Boku Wien"
    courses = []
  }
  uni5(org.lecturious.University){
    name="Meduni Wien"
    courses = []
  }

  city(org.lecturious.City){ name = "Vienna" }
  state(org.lecturious.State, name:"Vienna")
  country(org.lecturious.Country){ name = "Österreich" }

  user(org.lecturious.Student){
    facebookId = "715095657"
    name = "Fredrik Debong"
    universities = [uni]
    lastLogin = new Date(0)
  }
  user2(org.lecturious.Student){
    facebookId = "777618108"
    name = "Michael Greifeneder"
    universities = [uni]
    lastLogin = new Date(0)
  }
  user3(org.lecturious.Student){
    facebookId = "1062883815"
    name = "Florian Motlik"
    universities = [uni]
    lastLogin = new Date(0)
  }

  user4(org.lecturious.Student){
    facebookId = "100000202563861"
    name = "Manuel Weiss"
    universities = [uni]
    lastLogin = new Date(0)
  }

  course(org.lecturious.Course){
    creator:user
    name="Course1" 
    professor="Professor"
    identificator="Identificator"
    type="Type"
  }
  course2(org.lecturious.Course){
    creator:user
    name="Course2" 
    professor="Professor"
    identificator="Identificator"
    type="Type"
  }
  course3(org.lecturious.Course){
    creator:user
    name="Course3" 
    professor="Professor"
    identificator="Identificator"
    type="Type"
  }


}