package org.lecturious

import grails.converters.JSON;
import grails.test.ControllerUnitTestCase;

class StudentLifeControllerTest extends ControllerUnitTestCase{
  
  def name = "name"
  
  def assertBadRequest = {
    assert controller.response.contentAsString == ""
    assert controller.renderArgs.status == 400
  }
  
  def assertGoodRequest = {
    println "Status: $controller.renderArgs.status"
    assert controller.renderArgs.status == 200
  }
}
