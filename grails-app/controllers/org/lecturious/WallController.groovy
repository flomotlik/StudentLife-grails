package org.lecturious

class WallController {
  
  def facebookService;
  
  def index = {
    [offset:params.offset, max:params.max]
  }
  
  def news = {
    if (facebookService.init(params, request, response)) {
    	render("");
    }
    def offset = params.int("offset")?: 0
    log.debug("Offset $offset")
    def student = Student.get(session.user)
    
    def news = []
    def courses = student.inscriptions*.course
    log.debug("Courses: $courses")
    news += courses*.messages + courses*.links + courses*.todos + courses*.events
    def sortedList = news.flatten().sort{it.lastUpdated
    }.reverse()
    log.debug(sortedList)
    def sublist = sortedList.subList(offset, Math.min(offset+10, sortedList.size()))

    def userInfo = facebookService.getStudentInfos(sublist.creator*.facebookId);
    log.debug("Sizes: ${sublist.size()} - ${Math.min(offset+10, sortedList.size())}")
    [news:sublist, total:sortedList.size(), userInfo:userInfo]
  }
}
