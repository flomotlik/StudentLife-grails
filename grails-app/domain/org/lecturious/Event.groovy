package org.lecturious

import java.io.Serializable;

import javax.jdo.annotations.PersistenceCapable;
import javax.jdo.annotations.Persistent;

import javax.jdo.annotations.IdGeneratorStrategy;
import javax.jdo.annotations.IdentityType;
import javax.jdo.annotations.PrimaryKey;

import com.google.appengine.api.datastore.Key;

@PersistenceCapable(identityType = IdentityType.APPLICATION, detachable="true")
class Event implements Serializable {

    @PrimaryKey
    @Persistent(valueStrategy = IdGeneratorStrategy.IDENTITY)
    Key id

    @Persistent
    String description
	
	//Date stored in UTC
	@Persistent
	long date
	
	//Duration in Minutes
	@Persistent
	int duration

    static constraints = {
    	id( visible:false)
		description(length:50)
    }
}