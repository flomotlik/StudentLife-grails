package org.lecturious

class WorkflowService {
  
  boolean transactional = false
  
  def save(constraints, objectClosure) {
    def text = ""
    def status = 200
    if(constraints){
      def object = objectClosure()
      log.debug("Object: $object")
      if(object?.save()){
        log.debug("Saved: $object")
        text = object.id.toString()
      }else{
        log.debug("Object wasn't saved")
        object?.errors?.allErrors?.each {log.debug(it)}
        status = 400
      }
    }else{
      status = 400
      log.debug("Constraints not matched")
    }
    [text:text, status:status]
  }
  
  def saveWithParent = {id, parent, objectClosure ->
    save(id && parent.exists(id), objectClosure)
  }
  
  def updateWithParent = saveWithParent
}
