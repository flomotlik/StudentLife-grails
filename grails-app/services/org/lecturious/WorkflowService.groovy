package org.lecturious

import grails.converters.JSON 
import grails.util.GrailsNameUtils;

class WorkflowService {
  
  def requestStatus = [good:200, bad:400]
  
  def save(constraints, objectClosure) {
    def text = ""
    def status = requestStatus.good
    if(constraints){
      def object = objectClosure?.call()
      if(object && object.save()){
        //        log.debug("Saved: $object")
        text = object.id.toString()
      }else{
        //        log.debug("Object wasn't saved")
        status = requestStatus.bad
      }
    }else{
      status = requestStatus.bad
      //      log.debug("Constraints not matched")
    }
    [text:text, status:status]
  }
  
  def saveWithParent = {id, parent, objectClosure ->
    println "SaveWithParent"
    save(id && parent?.exists(id), objectClosure)
  }
  
  def listWithParent = {id, parent, child, properties->
    def text = ""
    def status = requestStatus.good
    if(id && parent && child && parent.exists(id)){
      def findWith = parent.get(id)
      def name = GrailsNameUtils.getShortName (parent)
      def list = child."findAllBy$name"(findWith)
      text = collect(list, properties) as  JSON
    }else{
      status = requestStatus.bad
    }
    [text:text, status:status]
  }
  
  def collect = { list, properties->
    list.collect{ item->
      def elem = [:]
      properties.each { property -> 
        elem."$property" = item."$property"
      }
      elem
    }
  }
  
  def updateWithParent = saveWithParent
}
