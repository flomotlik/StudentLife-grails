package org.lecturious

import grails.test.GrailsUnitTestCase;

class WorkflowServiceTests extends GrailsUnitTestCase {
  
  def workflowService
  
  protected void setUp() {
    super.setUp()
    workflowService = new WorkflowService()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testSaveFailsConstraintsFalse(){
    assert workflowService.save(false, null) == [text:"", status:400]
  }
  
  void testSaveFailsObjectNull(){
    assert workflowService.save(true, {null }) == [text:"", status:400]
  }
  
  void testSaveFailsObjectSaveFails(){
    assert workflowService.save(true, {
      [save:{false }]
    }) == [text:"", status:400]
  }
  
  void testSave(){
    assert workflowService.save(true, {
      [save:{true }, id:"Test"]
    }) == [text:"Test", status:200] 
  }
  
  void testSaveWithParent(){
    def callExists = [exists:{id-> assert id == 1; false}]
    def closure = {true}
    def toRender = [text:"Text"]
    workflowService.metaClass.save() {constraints, objectClosure->
      assert constraints == false;
      assert objectClosure == closure; 
      toRender
    }
    assert workflowService.saveWithParent(1,callExists, closure) == toRender
    assert workflowService.saveWithParent(1,null, closure) == toRender
    workflowService.metaClass.save() {constraints, objectClosure->  toRender }
    assert workflowService.saveWithParent(1,null, null) == toRender
  }
  
  void testSaveWithObjectClosureNull(){
    assert workflowService.save(1, null) == [text:"", status:400] 
  }
}
