package org.lecturious


class CountryControllerTests extends StudentLifeControllerTest{
  
  protected void setUp() {
    super.setUp()
  }
  
  protected void tearDown() {
    super.tearDown()
  }
  
  void testAdd() {
    mockParams.name = name
    controller.add()
    assertGoodRequest()
    assert 1 == Country.list().size()
    assert name == Country.list()[0].name
  }
  
  void testWorkflowCalled(){
    def workflow = mockFor(WorkflowService)
    mockParams.name = "Name"
    workflow.demand.save(){name, closure-> assert name == "Name"; []}
    controller.workflowService = workflow.createMock()
    controller.add()
    workflow.verify()
  }
  
  void testAddFailsNoId(){
    controller.add()
    assertBadRequest()
  }
  
  void testAllowedMethods(){
    assert controller.allowedMethods == [add:'POST', list:"GET"]
  }
  
  void testList(){
    new Country(name:"Z").save()
    new Country(name:"A").save()
    controller.list()
    def json = parse()
    assert json.size() == 2
    assert json[0].name == "A"
    assert json[1].name == "Z"
  }
}
