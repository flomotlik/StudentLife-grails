include "courseFixtures"
fixture {
  uni(org.lecturious.University){
    name="TU Wien"
    courses = [course, course2, course3]
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
}