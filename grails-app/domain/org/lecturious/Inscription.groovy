package org.lecturious

import javax.jdo.annotations.*;
import com.google.appengine.api.datastore.Key;

@PersistenceCapable (identityType = IdentityType.APPLICATION, detachable = "true")
public class Inscription {

  @PrimaryKey
  @Persistent (valueStrategy = IdGeneratorStrategy.IDENTITY)
  Key id

  @Persistent
  Key course
}