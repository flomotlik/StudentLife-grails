include "inscriptionsFixture"

fixture{
  student(org.lecturious.Student){
    facebookId = "715095657"
    name = "Fredrik Debong"
    universities = [uni]
    lastLogin = new Date(0)
    inscriptions = [inscription]
  }
  student2(org.lecturious.Student){
    facebookId = "777618108"
    name = "Michael Greifeneder"
    universities = [uni]
    lastLogin = new Date(0)
    inscriptions = [inscription2]
  }
  student3(org.lecturious.Student){
    facebookId = "1062883815"
    name = "Florian Motlik"
    universities = [uni]
    lastLogin = new Date(0)
    inscriptions = [inscription3]
  }
  student4(org.lecturious.Student){
    facebookId = "100000202563861"
    name = "Manuel Weiss"
    universities = [uni]
    lastLogin = new Date(0)
  }
}