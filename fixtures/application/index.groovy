package application;

fixture{
  city(org.lecturious.City){ name = "Vienna" }
  state(org.lecturious.State, name:"Vienna")
  country(org.lecturious.Country){ name = "Österreich" }
   
  uni(org.lecturious.University){
    name="TU Wien"
    courses = []
  }
  student(org.lecturious.Student){
    facebookId = "123456"
    name = "Flo"
    universities = [uni]
    lastLogin = new Date(0)
  }
}