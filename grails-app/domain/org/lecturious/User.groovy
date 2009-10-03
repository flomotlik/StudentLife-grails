package org.lecturious



import javax.jdo.annotations.*;
// import com.google.appengine.api.datastore.Key;

@PersistenceCapable(identityType = IdentityType.APPLICATION, detachable="true")
class User implements Serializable {

    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    Long id

    @Persistent
    String facebookId

    @Persistent
    String name

    static constraints = {
    	id( visible:false)
    }
}
