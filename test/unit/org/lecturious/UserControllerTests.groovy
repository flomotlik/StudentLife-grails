package org.lecturious

import org.lecturious.UserController;
import grails.converters.JSON;
import grails.test.*

class UserControllerTests extends ControllerUnitTestCase {
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testShow(){
    mockSession.user = 1
    def persistenceService = [getObjectById:{entity, id -> 
      assert entity == User.class && id == 1; 
      new User(facebookId:"id", name:"Name")
    }]
    controller.persistenceService = persistenceService
    controller.show()
  }
  
}
