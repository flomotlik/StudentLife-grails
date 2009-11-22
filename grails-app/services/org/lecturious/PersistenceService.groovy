package org.lecturious

class PersistenceService {
  
  boolean transactional = false
  def scope = "request"
  
  def persistenceManager
  
  
  def loadAllWithKey(entity, param, key){
    def query = persistenceManager.newQuery(entity)
    query.setFilter("$param == aParam")
    query.declareParameters("com.google.appengine.api.datastore.Key aParam")
    query.execute(key)
  }
  
  def makePersistent(toPersist){
    this.persistenceManager.makePersistent(toPersist)   
  }
  
  def getObjectById(entity, key){
    this.persistenceManager.getObjectById(entity, key)   
  }
  
  def loadAllKeys(entity, paramName, param) {
    def query = persistenceManager.newQuery("select id from $entity.name");
    query.setFilter("$paramName == aParam");
    query.declareParameters("String aParam");
    def user = query.execute(param)
    log.debug("Loaded user: $user")
    return user
  }
  
  def loadAll(entity){
    persistenceManager.newQuery(entity).execute()
  }
}
