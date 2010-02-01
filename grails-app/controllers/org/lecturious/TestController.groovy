package org.lecturious

class TestController {

    def facebookService;

    def check = {

      def facebook = facebookService.getFacebookConnection(request, response,
              "http://apps.facebook.com/momazam");
      if (facebook == null) {

        log.debug("connection is null");
        return;
      }
      def facebookId = facebook.users_getLoggedInUser(  );
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
}
