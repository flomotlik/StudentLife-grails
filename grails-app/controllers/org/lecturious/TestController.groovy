package org.lecturious

class TestController {

    def facebookService;

    def check = {
		
		log.debug("Session:" + session);
		log.debug("Request:" + request);
		log.debug("Reponse:" + response);
		log.debug("SessionKey: " + params["fb_sig_session_key"])
		
	    facebookService.nextPage = "http://apps.facebook.com/momazam/app/test/check"
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

      def myInfo = facebookService.getStudentInfos([facebookId]).get(0);

      log.debug("MyInfo:" + myInfo);

      def infos = facebookService.getStudentInfos(friends);

      infos.each {
          //log.debug("Info:" + it)
      }

      def friendInfos = [];
      friends.each{
        friendInfos += [id:it, name:infos[it].name, image:infos[it].image]
      }

      log.debug("friends:" + friendInfos);
      render(view:"/test/index",
              model:[my:[id:facebookId, name:"", image:""], friends:friendInfos])

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
