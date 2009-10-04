package org.lecturious



import javax.jdo.annotations.*;
import com.google.appengine.api.datastore.Key

@PersistenceCapable(identityType = IdentityType.APPLICATION, detachable="true")
class University implements Serializable {

    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    Key id

    @Persistent
    String name

    public getIdKey(){
        return id.getId()
    }

    static constraints = {
    	id( visible:false)
    }
}
