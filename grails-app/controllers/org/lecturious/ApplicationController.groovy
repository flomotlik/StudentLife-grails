package org.lecturious

class ApplicationController {

    def persistenceManager

    def index = {
        def query = persistenceManager.newQuery(User.class);
        query.setFilter("facebookId == facebookIdParam");
        query.declareParameters("String facebookIdParam");

        def user = query.execute(session.user.facebookId.toString())
        if(!user){
            persistenceManager.makePersistent(session.user)
        }
        log.debug("Universities: ${session.user.universities}")
        session.user.universities.each{
            log.debug(it.class)
        }
        def universities = session.user.universities.collect{
            persistenceManager.getObjectById(University.class, it)
        }
        [universities:universities]
    }
}