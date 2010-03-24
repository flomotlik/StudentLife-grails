package org.lecturious

import grails.test.*

class StudentLifeTagLibTests extends TagLibUnitTestCase {
  
  def value = "Some String"
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  private def callSubStringWithAttach = {max, attach ->
    def subStringParams = [max:max, value:value, attach:attach]
    tagLib.subString(subStringParams)
    tagLib.out.toString()
  }
  
  private def callSubString = {
    callSubStringWithAttach(it, "")
  }
  
  void testSubStringMaxSmallerThanString() {
    assert callSubString("5") == value.substring (0, 5)
  }
  
  void testSubStringMaxBiggerThanString() {
    assert callSubString("15") == value
  }
  
  void testSubStringMaxSmallerThanStringAttach() {
    def attach = "..."
    assert callSubStringWithAttach("5", attach) == value.substring (0, 5) + attach
  }
  
  void testSubStringMaxBiggerThanStringAttach() {
    def attach = "..."
    assert callSubStringWithAttach(value.size() + 1, attach) == value
  }
}
