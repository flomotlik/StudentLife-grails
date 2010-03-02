package org.lecturious

import grails.test.*

class FixtureTests extends GrailsUnitTestCase {
  
  def fixtureLoader
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testLoadFixtures(){
    def fixture = fixtureLoader.load("creatorFixture")
//    log.debug("Creator: $fixture.creator")
    fixture = fixture.load("todo")
    fixture = fixture.load("event")
//    log.debug(fixture.uni)
//    log.debug("$fixture.course $fixture.course2 $fixture.course3 ")
    fixture.load("students")   
  }
}
