package org.lecturious



import javax.jdo.annotations.*
import com.google.appengine.api.datastore.Key

@PersistenceCapable(identityType = IdentityType.APPLICATION, detachable="true")
class City implements Serializable {

    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    Key id

    @Persistent
    String name

    @Persistent
    List<University> universities

    public getIdKey(){
        id.getId()
    }

    static constraints = {
    	id( visible:false)
    }
}
