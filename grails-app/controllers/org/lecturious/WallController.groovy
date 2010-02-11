package org.lecturious

class WallController {

  def facebookService

  def index = {
      facebookService.init(request, response)

      def student = Student.get(session.user)

      def links= []
      def courses = student.inscription*.course
      def messages = Messages.findAllByCourseInList(courses, [max:10, offset:0, sort:"dateCreated", order:"desc"])

      def inscriptionUsers = Inscription.findAllByCourseInList(courses)*.user
      def userInfo = facebookService.getUserInfo(inscriptionUsers*.facebookId);

      def friendIds = facebookService.getFriends(student.facebookId)

      def friends = inscriptionUsers.findAll{
          friendIds.contains(it.id);
      }

      def colleagues = inscriptionUsers - friends - student; 

    [courses:courses, messages:messages, userInfo:userInfo, links:links, friends:friends, colleagues:colleagues]
  }
}
