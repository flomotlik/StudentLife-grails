package org.lecturious

class TestController {

    def facebookService;

    def check = {
		
		log.debug("Session:" + session);
		log.debug("Request:" + request);
		log.debug("Reponse:" + response);
		log.debug("SessionKey: " + params["fb_sig_session_key"])
		
	    facebookService.nextPage = "http://apps.facebook.com/momazam"
		//request.request.requestURL doesn't fit
	
      if (facebookService.init(params, request, response)) {
    	  return;
      }
	
      def facebookId = facebookService.getLoggedInUser();
	
      log.debug("ID:" + facebookId);

      def friends = facebookService.getFriends(facebookId);
      log.debug("Friends");
      friends.each{
        //log.debug("ID: " + it);
      }

      def myInfo = facebookService.getStudentInfos([facebookId])[(String)facebookId];

      log.debug("MyInfo:" + myInfo);

      def infos = facebookService.getStudentInfos(friends);

      infos.each {
          //log.debug("Info:" + it)
      }

      def friendInfos = [];
      friends.each{
        String key = it; // must be String
        friendInfos += [id:key, name:infos[key].name, image:infos[key].image]
      }

      log.debug("friends:" + friendInfos);
      render(view:"/test/index",
              model:[my:[id:facebookId, name:myInfo.name, image:myInfo.image], friends:friendInfos])

    }

  def simpleCheck = {

    render(text:"TestController");
  }
  
  def inviteText = {
     // render(view:"invite", model:[]);
    
     //render(text:'<a href="http://apps.facebook.com/momazam/app/test/inviteFrame" target="_top">Invite</a>');
      
     //redirect(action:"inviteFrame");
  }
    
  def invite = {
      facebookService.nextPage = "http://apps.facebook.com/momazam/app/test/check"
      if (facebookService.init(params, request, response)) {
        return;
      }
      def facebookId = facebookService.getLoggedInUser();
      def friends = facebookService.getFriends(facebookId);
      def url = facebookService.inviteFriends(facebookId, friends)
      log.debug("Redirect url:" + url);
      render(text:'<a href="' + url + '" target="_top">Invite</a>');      
  }
      
  
  def debug = {
      log.debug("Debug called");
      render(text:"Welcome back");
  }
  
  
}
