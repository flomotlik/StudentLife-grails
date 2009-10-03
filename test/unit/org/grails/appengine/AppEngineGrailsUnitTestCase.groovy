package org.grails.appengine

import com.google.appengine.api.datastore.*
import com.google.appengine.tools.development.ApiProxyLocalImpl
import com.google.apphosting.api.ApiProxy
import javax.jdo.PersistenceManagerFactory
import javax.jdo.PersistenceManager
import org.datanucleus.store.appengine.jdo.DatastoreJDOPersistenceManagerFactory

/**
 * Tests unitarios definidos para correr pruebas de grails sobre un 'entorno' de Google App Engine.
 *
 * Inicializan el entorno para el thread del test y limpian el datastore cada vez q se corre un test.
 */
class AppEngineGrailsUnitTestCase extends grails.test.GrailsUnitTestCase {

    def appengineEnvironment
    def appengineDelegate
    def persistenceManager
    def storageBetweenTests = false
    
    protected void setUp() {
        super.setUp()

        if (!appengineEnvironment) {
            appengineEnvironment = newEnvironment()
        }
        
        if (!appengineDelegate) {
            appengineDelegate = newDelegate()
        }
        
        buildProxy()

        if (!storageBetweenTests) {
            instructAppEngineToNotStoreDataBetweenTests()
        }
    }

    protected void tearDown() {
        try {
            releaseDatastore()
            releaseProxy()
            releasePersistenceManager()
        } finally {
            super.tearDown()
        }
    }
    
    def newEnvironment() {
        new AppEngineTestEnvironment()
    }
    
    def newDelegate() {
        new ApiProxyLocalImpl(new File('.'))
    }

    def synchronized buildProxy() {
        ApiProxy.setEnvironmentForCurrentThread(appengineEnvironment)
        ApiProxy.setDelegate(appengineDelegate)
    }   
     
    def synchronized instructAppEngineToNotStoreDataBetweenTests() {
        def proxy = ApiProxy.getDelegate()
        proxy?.setProperty('datastore.no_storage', Boolean.TRUE.toString())
    }
    
    def synchronized releaseProxy() {
        ApiProxy.setDelegate(null)
        ApiProxy.setEnvironmentForCurrentThread(null)
    }
    
    def synchronized releaseDatastore() {
        def proxy = ApiProxy.getDelegate()
        def datastoreService = proxy?.getService('datastore_v3')
        datastoreService?.clearProfiles()
    }
    
    def getPersistenceManagerFactory() {
        return AppEnginePersistenceManagerFactoryForTest.get()
    }
    
    def synchronized getPersistenceManager() {
        if (!this.@persistenceManager)
            this.@persistenceManager = persistenceManagerFactory.getPersistenceManager()
            
        return this.@persistenceManager
    }
    
    def synchronized releasePersistenceManager() {
        this.@persistenceManager?.close()
        this.@persistenceManager = null
    }
}
