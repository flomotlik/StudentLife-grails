fixture {
	country(org.lecturious.Country){ name = "Austria" }

	state(org.lecturious.State, name:"Vienna")
	city(org.lecturious.City){ name = "Vienna" }
	
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
}