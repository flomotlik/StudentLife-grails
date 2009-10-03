import org.lecturious.FacebookMock
import org.lecturious.User
import com.google.code.facebookapi.FacebookJsonRestClient
import com.google.code.facebookapi.FacebookWebappHelper

class ServiceFilters{

    def persistenceManager

    def filters = {
        facebook(controller:"*", action:"*"){
            before = {
                if(session.user == null || session.facebook == null){
                    switch (grails.util.GrailsUtil.environment){
                        case "development":
                        session.facebook = new FacebookMock()
                        session.user = new User(name:"Name", facebookId:"12345")
                        persistenceManager.makePersistent(session.user)
                        break
                    
                        case "production":
                        def api_key = grailsApplication.config.facebook.api_key
                        def secret = grailsApplication.config.facebook.secret

                        def seesion_key = params.fb_sig_session_key

                        def facebook = session.facebook
                        if (! userClient) {
                            facebook = new FacebookJsonRestClient(api_key, secret);
                            session.facebook = facebook
                        }

                        FacebookWebappHelper<Object> facebookHelper = new FacebookWebappHelper<Object> (request, response, api_key, secret, userClient);

                        String nextPage = request.getRequestURI();

                        if (facebookHelper.requireLogin(nextPage))  {
                            return;
                        }

                        if (!session.user) {
                            def facebookUserId = facebook.users_getLoggedInUser();
                            def query = persistenceManager.newQuery(User.class);
                            query.setFilter("facebookId == facebookIdParam");
                            query.declareParameters("String facebookIdParam");

                            def user = query.execute(facebookUserId.toString())
                            if(!user){
                                def username = userClient.users_getInfo([facebookUserId], ["name"]).get(0).name
                                user = new User(facebookId:facebookUserId, name:username)
                                persistenceManager.makePersistent(user)
                            }
                            session.user = user
                        }
                        break
                    }
                }
            }
        }
    }
}