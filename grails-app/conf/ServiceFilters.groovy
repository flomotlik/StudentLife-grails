import org.lecturious.FacebookMock
import org.lecturious.User


class ServiceFilters{

    def filters = {
        facebook(controller:"inscription", action:"*"){
            before = {
                /*if(session.user == null){
                redirect(controller:"application")
                }*/
            }
        }
    }
}