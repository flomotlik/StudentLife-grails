package org.grails.appengine

/**
 * Entity manager factory for JPA on the app engine.
 * @author juanjo
 */
public final class AppEnginePersistenceManagerFactoryForTests {
    /**
     * Unique instance of the class. It's NEVER null.
     */
    private static final javax.jdo.PersistenceManagerFactory instance
    
    static {
        def props = new Properties()
        props['javax.jdo.option.ConnectionURL'] = 'appengine'
        props['javax.jdo.option.NontransactionalRead'] = 'true'
        props['javax.jdo.option.NontransactionalWrite'] = 'true'
        props['javax.jdo.option.RetainValues'] = 'true'
        props['datanucleus.appengine.autoCreateDatastoreTxns'] = 'true'
        props['datanucleus.appengine.autoCreateDatastoreTxns'] = 'true'
        props['javax.jdo.PersistenceManagerFactoryClass'] = 'org.datanucleus.store.appengine.jdo.DatastoreJDOPersistenceManagerFactory'
        instance = javax.jdo.JDOHelper.getPersistenceManagerFactory(props)
    }

    /**
     * Constructor defined to avoid class clients trying to create instances of
     * this class.
     */
    private AppEnginePersistenceManagerFactoryForTests() {
        throw new IllegalStateException( 'You should not try to instantiate this class.' )
    }

    /**
     * Gets the unique EntityManagerFactory in the JVM.
     *
     * @returns a not <code>null</code> nor duplicated instance
     * EntityManagerFactory for JPA.
     */
    static javax.jdo.PersistenceManagerFactory get() {
        AppEnginePersistenceManagerFactoryForTests.instance
    }
}
