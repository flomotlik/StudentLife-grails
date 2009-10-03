package org.grails.appengine

import javax.jdo.*

/**
 * Persistence manager factory for JDO.
 * @author juanjo
 */
class AppEnginePersistenceManagerFactory {
    /**
     * Unique instance of the class. It's NEVER null.
     */
    private static final PersistenceManagerFactory instance =
        JDOHelper.getPersistenceManagerFactory( 'transactions-optional' )

    /**
     * Constructor defined to avoid class clients trying to create instances of
     * this class.
     */
    private AppEnginePersistenceManagerFactory() {
        throw new IllegalStateException( 'You should not try to instantiate this class.' )
    }

    /**
     * Gets the unique PersistenceManagerFactory in the JVM.
     *
     * @returns a not <code>null</code> nor duplicated instance
     * PersistenceManagerFactory for JDO.
     */
    static PersistenceManagerFactory get() {
        AppEnginePersistenceManagerFactory.instance
    }
}
