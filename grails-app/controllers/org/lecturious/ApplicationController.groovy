package org.lecturious

class ApplicationController {

    def persistenceManager

    def facebookService

    def index = {
        if(session.user == null){
            try{
                switch (grails.util.GrailsUtil.environment){
                    case "development":
                    session.user = new User(name:"Name", facebookId:"12345")
                    break

                    case "production":
                    def facebook = facebookService.getFacebookConnection(request, response)
                    
                    def facebookUserId = facebook.users_getLoggedInUser();
                    def username = facebook.users_getInfo([facebookUserId], ["name"]).get(0).name
                    
                    def query = persistenceManager.newQuery(User.class);
                    query.setFilter("facebookId == facebookIdParam");
                    query.declareParameters("String facebookIdParam");

                    def user = query.execute(facebookUserId.toString())
                    if(!user){
                        session.user = new User(facebookId:facebookUserId, name:username)
                        log.debug("Persisting user ${session.user}")
                        persistenceManager.makePersistent(session.user)
                    }else{
                        session.user = new User(facebookId:user.facebookId, name:user.name, id:user.id)
                    }
                    
                    log.debug("User: ${session.user.name}")
                    break
                }
            }catch(e){
                log.debug(e)
            }
        }
        log.debug("User: ${session.user}")
        log.debug("Universities: ${session.user.universities}")
        def universities = session.user?.universities?.collect{
            if(it != null){
                log.debug("It is: $it - ${it.class}")
                persistenceManager.getObjectById(University.class, it)
            }
        }
        [universities:universities]
    }
}