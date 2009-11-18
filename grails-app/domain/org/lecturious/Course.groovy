package org.lecturious

import javax.jdo.annotations.*;
import com.google.appengine.api.datastore.Key;

@PersistenceCapable (identityType = IdentityType.APPLICATION, detachable = "true")
class Course implements Serializable {

  @PrimaryKey
  @Persistent (valueStrategy = IdGeneratorStrategy.IDENTITY)
  Key id

  @Persistent
  String name

  @Persistent
  String professor

  @Persistent
  String identificator

  @Persistent
  String type

  @Persistent
  int points

  @Persistent
  List<Todo> todos;

  @Persistent
  List<Event> events;

  static constraints = {
    id(visible: false)
  }
}
